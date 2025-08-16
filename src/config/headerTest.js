export const ROLES = {
  ADMIN: "admin",
  GUARDIAN: "guardian",
  JUNGDOMAEIN: "jungdomaein", // 중도매인
};

export const NAV_BY_ROLE = {
  [ROLES.ADMIN]: [
    { key: "status", label: "등록 현황", href: "/status" },
    { key: "register", label: "수산물 등록", href: "/register" },
    { key: "auction", label: "경매 상태", href: "/auction" },
    { key: "settlement", label: "판매 정산", href: "/settlement" },
  ],
  [ROLES.GUARDIAN]: [
    { key: "status", label: "등록 현황", href: "/status" },
    { key: "auction", label: "경매 상태", href: "/auction" },
  ],
  [ROLES.JUNGDOMAEIN]: [
    { key: "auction", label: "경매 상태", href: "/auction" },
    { key: "settlement", label: "판매 정산", href: "/settlement" },
  ],
};
