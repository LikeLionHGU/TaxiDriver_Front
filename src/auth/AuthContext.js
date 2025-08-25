"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";

/** 내부 표준 롤 */
export const ROLES = {
  ADMIN: "ADMIN",
  GUARDIAN: "GUARDIAN",       // ROLE_SELLER
  JUNGDOMAEIN: "JUNGDOMAEIN", // ROLE_BUYER
  GUEST: "GUEST",
};

/** 문자열/객체 배열 -> 문자열 배열 */
function toStringRoles(any) {
  if (!any) return [];
  const arr = Array.isArray(any) ? any : [any];
  return arr
    .map((v) => {
      if (typeof v === "string") return v;
      if (v && typeof v === "object") {
        // Spring Security 자주 나오는 형태들
        return v.authority || v.role || v.name || v.code || v.roleName || v.value || "";
      }
      return "";
    })
    .filter(Boolean);
}

/** 응답에서 roles/authorities 등 추출 */
function extractRawRoles(data) {
  // 서버가 배열만 바로 줄 수도 있어서 먼저 처리
  if (Array.isArray(data)) return toStringRoles(data);

  const candidates =
    data?.roles ??
    data?.authorities ??
    data?.roleList ??
    data?.grants ??
    data?.user?.roles ??
    data?.user?.authorities ??
    data?.role ??                 // 단일 문자열
    data?.user?.role ??           // 단일 문자열
    [];

  return toStringRoles(candidates);
}

/** ROLE_USER는 다른 역할과 같이 오면 제거 + 우선순위 매핑 */
function pickRoleFromList(list) {
  const up = list.map((v) => String(v || "").toUpperCase());
  const hasNonUser = up.some((r) => r !== "ROLE_USER");
  const roles = hasNonUser ? up.filter((r) => r !== "ROLE_USER") : up;

  if (roles.includes("ROLE_ADMIN"))  return ROLES.GUARDIAN;
  if (roles.includes("ROLE_BUYER"))  return ROLES.JUNGDOMAEIN;
  if (roles.includes("ROLE_SELLER")) return ROLES.ADMIN;
  return ROLES.GUEST;
}

const AuthCtx = createContext({
  user: null,
  role: ROLES.GUEST,
  loading: true,
  error: null,
  refresh: async () => {},
  isAdmin: false,
  isGuardian: false,
  isJungdomaein: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(ROLES.GUEST);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMe = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get("/user/check");  // ✅ api 인스턴스 사용
      console.log("[Auth] /user/check data =", data);

      const rawRoles = extractRawRoles(data);
      console.log("[Auth] rawRoles =", rawRoles);

      const nextRole  = pickRoleFromList(rawRoles);

      const nextUser =
        data?.user ??
        (data?.id || data?.name ? { id: data.id, name: data.name } : null);

      setUser(nextUser);
      setRole(nextRole);
    } catch (e) {
      console.log("[Auth] fetchMe error", e?.response || e);
      setUser(null);
      setRole(ROLES.GUEST);
      setError(e?.message || "권한 확인 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMe(); }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      error,
      refresh: fetchMe,
      isAdmin: role === ROLES.ADMIN,
      isGuardian: role === ROLES.GUARDIAN,
      isJungdomaein: role === ROLES.JUNGDOMAEIN,
    }),
    [user, role, loading, error]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
