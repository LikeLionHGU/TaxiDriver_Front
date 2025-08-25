import { ROLES } from "../auth/AuthContext";

// export const ROLES = {
//   AMIN: "amin",
//   GUARDIAN: "guardian",
//   JUNGDOMAEIN: "jungdomaein", // 중도매인
// };

export const NAV_BY_ROLE = {
  [ROLES.ADMIN]: [
    { key: "status",           label: "등록 현황",   href: "/producermain" },
    { key: "register-fish",    label: "수산물 등록", href: "/register" },
    { key: "auction-status",   label: "경매 상태",   href: "/auction" },
    { key: "settlement",       label: "판매 정산",   href: "/sales-settlement" },
  ],
  [ROLES.GUARDIAN]: [
    { key: "review-requests",  label: "검토요청 처리", href: "/review" },
    { key: "auction-live",     label: "실시간 경매",   href: "/auction" },
    { key: "confirm-receipt",  label: "수령 확인",     href: "/confirm-receipt" },
  ],
  [ROLES.JUNGDOMAEIN]: [
    { key: "auction-live",     label: "실시간 경매",   href: "/auction" },
    { key: "receiving-status", label: "수령 현황",     href: "/confirm-receipt" },
    { key: "purchase-history", label: "구매 내역",     href: "/purchase-history" },

  ],
  [ROLES.GUEST]: [
    // 필요하면 게스트 메뉴
  ],
};