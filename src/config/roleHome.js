import { ROLES } from "../auth/AuthContext";

export const HOME_BY_ROLE = {
  [ROLES.ADMIN]:       "/producermain",   // 관리자 기본 홈
  [ROLES.GUARDIAN]:    "/review",        // 어민(SELLER) 기본 홈
  [ROLES.JUNGDOMAEIN]: "/auction",        // 중도매인(BUYER) 기본 홈
  [ROLES.GUEST]:       "/",               // 게스트는 랜딩 유지
};
