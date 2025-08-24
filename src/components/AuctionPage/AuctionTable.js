import React, { useEffect , useState , useMemo} from "react";
import styles from "./AuctionTable.module.css";
import axios from "axios";
import AuctionTableBox from "./AuctionTableBox";
import searchImg from "../../assets/search.svg";

// 숫자 → 프론트 상태 키로 통일
  const mapStatus = (n) => ({ 0: "PROGRESS", 1: "PENDING", 2: "DONE" }[n] || "PENDING");

// eslint-disable-next-line
  const join = (...xs) => xs.filter(Boolean).join(" | ");
  const joinUnit = (w, m) => [w, m].filter(Boolean).join("/");

// HH:mm 포맷
  const fmtHHmm = (d) =>
  d ? new Date(d).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";


function AuctionTable({ activeStatus = "ALL",
  searchTerm = "",
  setSearchTerm,
  page = 1,
  pageSize = 10,
   onTotalChange, }) {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) API 호출
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.get(`https://likelion.info:443/post/get/auction/all`, {
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
          time: fmtHHmm(a.startedAt),
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
    fetchData();
  }, []);

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

  // const mk = (id, name, unit, qty, price, status, time, addSec = 870) => ({
  //   id,
  //   productName: name,
  //   unit,
  //   quantity: qty,
  //   startPrice: price,
  //   sellerName: "김철수",
  //   status,           
  //   time,         
  //   endAt: new Date(Date.now() + addSec * 1000).toISOString(), // 카운트다운 쓸 때 사용
  // });

  // const data = {
  //   items: [
  //     // === 진행중 (PROGRESS) ===
  //     mk(201, "(활)광어",      "2kg/마리",     10, 35000, "PROGRESS", "12:03"),
  //     mk(202, "(선)갈치",      "0.5kg/마리",   30, 15000, "PROGRESS", "12:05"),
  //     mk(203, "(활)우럭",      "1.5kg/마리",   12, 28000, "PROGRESS", "12:15"),
  //     mk(204, "(활)농어",      "2kg/마리",      8, 45000, "PROGRESS", "12:20"),
  //     mk(205, "(선)전어",      "박스",         25, 12000, "PROGRESS", "12:30"),
  //     mk(206, "(선)전복",      "1kg/망",        6, 70000, "PROGRESS", "12:45"),

  //     // === 대기중 (PENDING) ===
  //     mk(301, "(선)갈치",      "0.5kg/마리",    4, 25000, "PENDING",  "14:30"),
  //     mk(302, "(활)광어(대)",  "3kg/마리",      6, 55000, "PENDING",  "14:30"),
  //     mk(303, "(활)우럭(소)",  "1kg/마리",     20, 18000, "PENDING",  "15:00"),
  //     mk(304, "(선)도다리",    "1kg/망",       15, 22000, "PENDING",  "15:00"),
  //     mk(305, "(활)도미",      "2kg/마리",      9, 42000, "PENDING",  "15:30"),
  //     mk(306, "(선)오징어",    "10마리/묶음",   5, 30000, "PENDING",  "15:30"),

  //     // === 종료 (DONE) ===
  //     mk(401, "(선)전어",      "박스",         25, 12000, "DONE",     "09:45"),
  //     mk(402, "(활)광어",      "2kg/마리",     10, 35000, "DONE",     "09:45"),
  //     mk(403, "(선)갈치",      "0.5kg/마리",   30, 15000, "DONE",     "10:05"),
  //     mk(404, "(선)갈치(대)",  "1kg/마리",     10, 32000, "DONE",     "10:05"),
  //     mk(405, "(활)우럭",      "1.5kg/마리",    7, 27000, "DONE",     "10:20"),
  //     mk(406, "(선)문어",      "2kg/마리",      3, 95000, "DONE",     "10:20"),

  //     // === 혼합 (상태 섞임 화면 테스트) ===
  //     mk(501, "(선)갈치",      "0.5kg/마리",   18, 19000, "PROGRESS", "12:05"),
  //     mk(502, "(활)도미",      "2kg/마리",      5, 48000, "PENDING",  "14:30"),
  //     mk(503, "(선)전어",      "박스",         12, 11000, "DONE",     "09:45"),
  //     mk(504, "(활)광어(특)",  "3.5kg/마리",    4, 68000, "PROGRESS", "12:03"),
  //     mk(505, "(선)멸치",      "5kg/망",       20,  8000, "PENDING",  "15:00"),
  //     mk(506, "(선)전복(특)",  "1.5kg/망",      4,105000, "DONE",     "10:05"),
  //   ],
  // };

  // const norm = (s) => (s ?? "").toString().trim().toLowerCase();

  // // 1) 상태 필터 (대문자 비교)
  // const wanted = (activeStatus ?? "ALL").toString().toUpperCase();
  // let filtered = data.items.slice();
  // if (wanted !== "ALL") {
  //   filtered = filtered.filter(it => (it.status ?? "").toUpperCase() === wanted);
  // }

  // // 2) 검색어 필터
  // if (norm(searchTerm)) {
  //   filtered = filtered.filter(it => norm(it.productName).includes(norm(searchTerm)));
  // }

  // // 총 페이지 계산 + 슬라이스
  // const total = filtered.length;
  // const totalPages = Math.max(1, Math.ceil(total / pageSize));
  // const currentPage = Math.min(page, totalPages);
  // const start = (currentPage - 1) * pageSize;
  // const paginated = filtered.slice(start, start + pageSize);

  // // 부모에게 총 페이지 수 알림
  // useEffect(() => {
  //   onTotalChange?.(totalPages);
  // }, [totalPages, onTotalChange]);
  
  
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