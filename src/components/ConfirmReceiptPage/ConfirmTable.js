import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./ConfirmTable.module.css";
import ConfirmTableBox from "./ConfirmTableBox";

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

// WAITING / DONE으로 정규화 (숫자/문자 혼용 대비)
const normalizeReceiveStatus = (v) => {
  if (typeof v === "number") return v === 0 ? "WAITING" : "DONE";
  const s = String(v ?? "").toUpperCase();
  if (s.includes("WAIT")) return "WAITING";
  if (s.includes("DONE") || s.includes("COMPLETE")) return "DONE";
  // 기본값
  return "WAITING";
};

/** ================== DTO → UI 매핑 ==================
 * 백엔드 필드명이 다를 수 있어 여러 후보 키를 안전하게 처리
 */
const mapDtoToRow = (a) => {
  // 마감/수령기한 후보 키(하나만 있어도 동작)
  const dueRaw = a?.dueAt || a?.deadline || a?.pickupDueAt || a?.dueDateTime || a?.dueDate;
  const due = typeof dueRaw === "string" ? parseLocalDateTime(dueRaw) : (dueRaw instanceof Date ? dueRaw : null);

  return {
    id: a?.id,
    productName: a?.productName ?? a?.name ?? "-",
    origin: a?.origin ?? a?.region ?? "-",
    weight: a?.weight ?? a?.totalWeight ?? a?.weightText ?? "-", // "25.5kg" 형태
    bidPrice: a?.bidPrice ?? a?.winningPrice ?? 0,               // 낙찰 금액(단가/총액 중 백엔드 기준에 맞춰 조정)
    buyerName: a?.buyer?.name ?? a?.buyerName ?? "-",
    sellerName: a?.seller?.name ?? a?.sellerName ?? "-",
    pickupPlace: a?.pickupPlace ?? a?.place ?? "-",
    dueDate: fmtYmd(due),        // "YYYY-MM-DD"
    dueTime: fmtHHmm(due),       // "HH:mm"
    receiveStatus: normalizeReceiveStatus(a?.receiveStatus ?? a?.status),
  };
};

/** ================== 메인 ================== */
function ConfirmTable({ activeFilter = "today" }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ENDPOINT = "https://likelion.info:443/post/get/receive/admin"; // 예시: 수령확인 목록 API

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.get(ENDPOINT, { withCredentials: true });
      console.log(data);
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

  // 로컬 타임존 기준 오늘 YYYY-MM-DD
  const todayYmd = (() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  })();

  const filtered = useMemo(() => {
    const key = (activeFilter || "").toLowerCase();
    switch (key) {
      case "waiting":
        return items.filter((it) => (it.receiveStatus || "").toUpperCase() === "WAITING");
      case "complete":
        return items.filter((it) => (it.receiveStatus || "").toUpperCase() === "DONE");
      case "today":
      default:
        return items.filter((it) => it.dueDate === todayYmd);
    }
  }, [activeFilter, items, todayYmd]);

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
