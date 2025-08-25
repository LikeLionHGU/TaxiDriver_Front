// src/auth/AuthProvider.js
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";

/** 내부 표준 롤 */
export const ROLES = {
  ADMIN: "ADMIN",
  GUARDIAN: "GUARDIAN",       // 어민(ROLE_SELLER)을 여기로 매핑
  JUNGDOMAEIN: "JUNGDOMAEIN", // 중도매인(ROLE_BUYER)
  GUEST: "GUEST",
};

/** 서버에서 온 권한 배열을 내부 롤로 변환 (우선순위: ADMIN > BUYER > SELLER) */
function pickRoleFromList(list) {
  const toUpper = (v) => String(v || "").toUpperCase();
  const has = (k) => list.some((v) => toUpper(v) === k);

  if (has("ROLE_ADMIN"))  return ROLES.ADMIN;
  if (has("ROLE_BUYER"))  return ROLES.JUNGDOMAEIN;
  if (has("ROLE_SELLER")) return ROLES.GUARDIAN;
  return ROLES.GUEST; // ROLE_USER 등은 게스트 취급(필요시 확장)
}

/** 응답에서 roles/authorities/role 등 다양한 키를 안전하게 추출 */
function extractRawRoles(data) {
  const candidates =
    data?.roles ??
    data?.authorities ??
    data?.user?.roles ??
    data?.user?.authorities ??
    data?.role ??
    data?.user?.role ??
    [];

  if (Array.isArray(candidates)) return candidates;
  if (typeof candidates === "string") return [candidates];
  return [];
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

      // 쿠키 인증이면 api 인스턴스에 withCredentials=true 세팅돼 있어야 함
      const { data } = await api.get("/user/check");

      const rawRoles = extractRawRoles(data);
      const nextRole = pickRoleFromList(rawRoles);

      const nextUser =
        data?.user ??
        (data?.id || data?.name ? { id: data.id, name: data.name } : null);

      setUser(nextUser);
      setRole(nextRole);
    } catch (e) {
      setUser(null);
      setRole(ROLES.GUEST);
      setError(e?.message || "권한 확인 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      error,
      refresh: fetchMe,
      isAdmin: role === ROLES.ADMIN,
      isGuardian: role === ROLES.GUARDIAN,         // ROLE_SELLER 매핑
      isJungdomaein: role === ROLES.JUNGDOMAEIN,   // ROLE_BUYER  매핑
    }),
    [user, role, loading, error]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
