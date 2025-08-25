import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./ConfirmTable.module.css";
import ConfirmTableBox from "./ConfirmTableBox";
import { useAuth, ROLES } from "../../auth/AuthContext";

/** ================== 유틸 ================== */
// "2025-08-24T08:29:11.368214" → 로컬 Date
const parseLocalDateTime = (s) => {
  if (!s) return null;
  try {
    const [datePart, timePartRaw] = String(s).split("T");
    if (!datePart || !timePartRaw) return new Date(s); // 다른 포맷은 브라우저 파서에 위임
    const [timePart] = timePartRaw.split("."); // 마이크로초 제거
    const [y, m, d] = datePart.split("-").map(Number);
    const [hh = "0", mm = "0", ss = "0"] = (timePart || "").split(":");
    return new Date(y, (m - 1), d, Number(hh), Number(mm), Number(ss));
  } catch {
    return null;
  }
};

const fmtYmd = (dt) => {
  if (!dt) return "";
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const fmtHHmm = (dt) =>
  dt ? dt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";

/** ================== DTO → UI 매핑 ==================
 * 백엔드 스키마
 * - id, name, totalPrice
 * - origin
 * - fishCount, fishWeight, fishStatus, salesMethod
 * - isReceived(Boolean), receivedTime(LocalDateTime)
 * - buyerName, sellerName, receiveLocation
 */
const mapDtoToRow = (a) => {
  const receivedDt = a?.receivedTime ? parseLocalDateTime(a.receivedTime) : null;

  return {
    id: a?.id,
    // 품목명: "(상태)이름" 형태
    productName: `(${a?.fishStatus ?? ""})${a?.name ?? "-"}`.trim(),
    origin: a?.origin ?? "-",
    // "무게/판매방식" (예: "25.5kg/마리")
    weight: [a?.fishWeight, a?.salesMethod].filter(Boolean).join("/"),
    // 낙찰 금액
    bidPrice: a?.totalPrice ?? 0,
    buyerName: a?.buyerName ?? "-",
    sellerName: a?.sellerName ?? "-",
    pickupPlace: a?.receiveLocation ?? "-",
    // 수령 시간 (완료건만 노출될 가능성)
    dueDate: fmtYmd(receivedDt),
    dueTime: fmtHHmm(receivedDt),
    // 상태: Boolean -> DONE/WAITING
    receiveStatus: a?.isReceived ? "DONE" : "WAITING",
  };
};

function ConfirmTable({ activeFilter = "today" }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { role, loading: authLoading } = useAuth();

  const ENDPOINT_BY_ROLE = {
    [ROLES.ADMIN]:       "https://likelion.info:443/post/get/receive/admin",      // 관리자: 전체
    [ROLES.GUARDIAN]:    "https://likelion.info:443/post/get/receive/admin",     // 어민(판매자): 내가 판매한 건
    [ROLES.JUNGDOMAEIN]: "https://likelion.info:443/post/get/receive/user",      // 중도매인(구매자): 내가 수령할 건
    [ROLES.GUEST]:       "https://likelion.info:443/post/get/receive/admin",      // 게스트: 임시로 전체(필요시 접근 차단)
  };


  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = ENDPOINT_BY_ROLE[role] || ENDPOINT_BY_ROLE[ROLES.GUEST];
      const { data } = await axios.get(url, { withCredentials: true });
      // 배열 또는 {items: []} 모두 허용
      const list = Array.isArray(data) ? data : data?.items || [];
      const mapped = list.map(mapDtoToRow);
      setItems(mapped);
    } catch (e) {
      setError("정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 필터: "today"는 '전체' 의미로 사용
  const filtered = useMemo(() => {
    const key = (activeFilter || "").toLowerCase();
    switch (key) {
      case "waiting":
        return items.filter((it) => (it.receiveStatus || "").toUpperCase() === "WAITING");
      case "complete":
        return items.filter((it) => (it.receiveStatus || "").toUpperCase() === "DONE");
      case "today":
      default:
        // 전체
        return items;
    }
  }, [activeFilter, items]);

  if (isLoading) {
    return (
      <div className={styles.main}>
        <div style={{ padding: 24 }}>불러오는 중…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.main}>
        <div style={{ padding: 24, color: "#b00" }}>{error}</div>
        <div style={{ padding: 0, marginLeft: 24 }}>
          <button onClick={fetchData}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <ConfirmTableBox items={filtered} />
    </div>
  );
}

export default ConfirmTable;
