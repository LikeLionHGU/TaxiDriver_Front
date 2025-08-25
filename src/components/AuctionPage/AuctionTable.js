import React, { useEffect , useState , useMemo} from "react";
import styles from "./AuctionTable.module.css";
import axios from "axios";
import AuctionTableBox from "./AuctionTableBox";
import searchImg from "../../assets/search.svg";
import { useAuth, ROLES } from "../../auth/AuthContext";

// 숫자 → 프론트 상태 키로 통일
  const mapStatus = (n) => ({ "AUCTION_READY": "PROGRESS", "AUCTION_CURRENT": "PENDING", "AUCTION_FINISH": "DONE" }[n] || "PENDING");

// eslint-disable-next-line
  const join = (...xs) => xs.filter(Boolean).join(" | ");
  const joinUnit = (w, m) => [w, m].filter(Boolean).join("/");

// // HH:mm 포맷
//   const fmtHHmm = (d) =>
//   d ? new Date(d).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";

  const parseLocalDateTime = (s) => {
  if (!s) return null;
  try { 
    // 날짜/시간 분리
    const [datePart, timePartRaw] = s.split("T");
    if (!datePart || !timePartRaw) return new Date(s); // 혹시 다른 포맷이면 브라우저 파서에 위임

    // 초 뒤 마이크로초 제거
    const [timePart] = timePartRaw.split("."); // "08:29:11.368214" → "08:29:11"

    const [y, m, d] = datePart.split("-").map(Number);
    const [hh = "0", mm = "0", ss = "0"] = (timePart || "").split(":");
    return new Date(y, (m - 1), d, Number(hh), Number(mm), Number(ss));
  } catch {
    return null;
  }
};

const fmtHHmmFromRegistered = (registeredDateStr) => {
  const dt = parseLocalDateTime(registeredDateStr);
  return dt
    ? dt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
    : "";
};


function AuctionTable({ activeStatus = "ALL",
  searchTerm = "",
  setSearchTerm,
  page = 1,
  pageSize = 10,
   onTotalChange, }) {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role, loading: authLoading } = useAuth();     

  const ENDPOINT_BY_ROLE = {
    [ROLES.ADMIN]:       "https://likelion.info:443/post/get/auction/all",   // 어민 : 내가 등록한 것
    [ROLES.GUARDIAN]:    "https://likelion.info:443/post/get/auction/all/admin",  // 관리자 : 전체
    [ROLES.JUNGDOMAEIN]: "https://likelion.info:443/post/get/auction/all/admin",   // 중도매인: 참여 가능한 전체
    [ROLES.GUEST]:       "https://likelion.info:443/post/get/auction/all/admin",   // 비로그인: 전체
  };

  // 1) API 호출
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = ENDPOINT_BY_ROLE[role] || ENDPOINT_BY_ROLE[ROLES.GUEST];

      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      console.log(data);
      const list = Array.isArray(data) ? data : data?.items || [];

      const mapped = list.map((a) => {
        // 백엔드 값 → 프론트 표시 값으로 정리하기
        let status = mapStatus(a.auctionStatus);
        // status = resolveStatusByTime(a, status); // (선택) 시간 규칙으로 보정

        const endAt =
          status === "PROGRESS" && a.startedAt
            ? new Date(new Date(a.startedAt).getTime() + 15 * 60 * 1000).toISOString()
            : null;

        return {
          id: a.id,
          // (fishStatus) name
          productName: `(${a.fishStatus ?? ""})${a.name ?? ""}`.trim(),
          // "2kg/마리" 같은 단위 
          unit: joinUnit(a.fishWeight, a.salesMethod),
          // "10"
          quantity: a.fishCount,
          // 시작가
          startPrice: a.reservePrice,
          // 판매자
          sellerName: a.seller?.name ?? "-",
          // 상태
          status, // "PROGRESS" | "PENDING" | "DONE"
          // 시간 정보(표시용: startedAt)
          time: fmtHHmmFromRegistered(a.registeredDate),
          // 카운트다운 등에서 사용할 종료 예정 시각
          endAt,
        };
      });

      setItems(mapped);
    } catch (e) {
      setError("정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return; 
    fetchData();
    // eslint-disable-next-line
  }, [authLoading, role]);

  // 2) 필터/검색/페이지네이션
  const norm = (s) => (s ?? "").toString().trim().toLowerCase();

  const { paginated, totalPages } = useMemo(() => {
    // 상태 필터
    const wanted = (activeStatus ?? "ALL").toUpperCase();
    let filtered = items;
    if (wanted !== "ALL") {
      filtered = filtered.filter((it) => (it.status ?? "").toUpperCase() === wanted);
    }
    // 검색 필터
    if (norm(searchTerm)) {
      filtered = filtered.filter((it) => norm(it.productName).includes(norm(searchTerm)));
    }
    // 페이지 계산
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);
    return { paginated, totalPages };
  }, [items, activeStatus, searchTerm, page, pageSize]);

  // 3) 부모에 총 페이지 전달
  useEffect(() => {
    onTotalChange?.(totalPages);
  }, [totalPages, onTotalChange]);

  // 4) 로딩/에러 UI (간단)
  if (isLoading) {
    return (
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.searchContainer}>
            <img src={searchImg} alt="icon" />
            <input className={styles.searchInput} disabled placeholder="로딩 중..." />
          </div>
        </div>
        <div style={{ padding: 24 }}>불러오는 중…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.searchContainer}>
            <img src={searchImg} alt="icon" />
            <input
              type="text"
              placeholder="수산물을 검색하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        <div style={{ padding: 24, color: "#b00" }}>{error}</div>
        <div style={{ padding: 0, marginLeft: 24 }}>
          <button onClick={fetchData}>다시 시도</button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.searchContainer}>
            <img src={searchImg} alt="icon" />
            <input
              type="text"
              placeholder="수산물을 검색하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        <AuctionTableBox items={paginated} />
      </div>
    </>
  );
}


export default AuctionTable;