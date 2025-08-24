/* eslint-disable */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import loadingStyles from "../../styles/Loading.module.css";
import styles from "./AuctionItem.module.css";

/** ===== 유틸 & 매퍼 ===== */
const mapStatus = (n) => ({ 0: "PROGRESS", 1: "PENDING", 2: "DONE" }[n] || "PENDING");

const addMinutes = (ts, mins) => {
  if (!ts) return null;
  const t = new Date(ts).getTime();
  return new Date(t + mins * 60 * 1000);
};

const joinUnit = (w, m) => [w, m].filter(Boolean).join("/");

const fmtYmd = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

const parseKg = (fishWeight) => {
  const m = /([\d.]+)\s*kg/i.exec(fishWeight || "");
  return m ? parseFloat(m[1]) : null;
};

// DTO → 상세 카드(AuctionItem)가 기대하는 형태로 변환
function mapDtoToDetailItem(a) {
  // 시작 기준: startedAt 있으면 그것, 없으면 triggerAt + 10분
  const startBase = a.startedAt ? new Date(a.startedAt) : addMinutes(a.triggerAt, 10);

  const status = mapStatus(a.auctionStatus);
  // 진행중이면 시작 기준 + 15분 → 종료 예정(endAt)
  const endAt = status === "PROGRESS" && startBase ? addMinutes(startBase, 15).toISOString() : null;

  const unitWeightText = joinUnit(a.fishWeight, a.salesMethod);
  const unitWeightKg = parseKg(a.fishWeight);

  return {
    name: a.name,
    origin: a.origin,
    seller: a.seller?.name ?? "-",
    catchDate: fmtYmd(a.registeredDate),
    unitWeightText,
    unitWeightKg,
    quantity: a.fishCount,
    images: a.images || [null, null, null, null], // 백에서 이미지 주면 사용
    startPrice: a.reservePrice,
    currentPrice: a.currentPrice ?? a.reservePrice, // 없으면 시작가로 대체
    endAt,
    status, // 배너 등에 사용 가능
  };
}

/** ===== 통화 포맷 ===== */
const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

/** ===== 남은 시간 mm:ss ===== */
function useCountdown(endAt) {
  const [remain, setRemain] = useState(() => {
    if (!endAt) return null;
    return Math.max(0, Math.floor((new Date(endAt) - Date.now()) / 1000));
  });

  useEffect(() => {
    if (!endAt) return;
    const id = setInterval(() => {
      setRemain(Math.max(0, Math.floor((new Date(endAt) - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  if (remain == null) return "";
  const m = Math.floor(remain / 60);
  const s = remain % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** ===== 메인 컴포넌트 ===== */
function AuctionItem({ item: initialItem }) {
  const { id } = useParams(); // /auction/detail/:id 라우트 기준
  const [item, setItem] = useState(
    initialItem || {
      // 첫 렌더용 기본값 (API 도착하면 교체)
      name: "광어",
      origin: "포항",
      seller: "김철수",
      catchDate: "2025.08.18",
      unitWeightText: "4kg/마리",
      unitWeightKg: 4,
      quantity: 4,
      images: [null, null, null, null],
      startPrice: 25000,
      currentPrice: 35000,
      endAt: Date.now() + 206000,
      status: "PENDING",
    }
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 → id로 대상 선택 → 매핑
  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 단건 API가 있으면 아래 URL을 /post/get/auction/{id} 같은 형태로 바꿔 사용
      const { data } = await axios.get("https://likelion.info:443/post/get/auction/all", {
        withCredentials: true, // 쿠키 인증이면 유지, JWT면 Authorization 헤더 사용
      });

      const list = Array.isArray(data) ? data : data?.items || [];
      const dto = id ? list.find((x) => String(x.id) === String(id)) : list?.[0];
      if (!dto) throw new Error("해당 경매를 찾을 수 없습니다.");

      setItem(mapDtoToDetailItem(dto));
    } catch (e) {
      setError("정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    // id가 바뀌면 다시 로드
  }, [id]);

  const totalWeight = useMemo(() => {
    if (!item) return "-";
    return typeof item.unitWeightKg === "number" && typeof item.quantity === "number"
      ? `${item.unitWeightKg * item.quantity}kg`
      : "-";
  }, [item]);

  const remainText = useCountdown(item?.endAt);

  if (isLoading) {
    return (
      <div className={loadingStyles.loading}>
        <div className={loadingStyles.loadingText}>정보를 불러오고 있습니다...</div>
        <div className={loadingStyles.loadingSubtext}>잠시만 기다려주세요</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={loadingStyles.loading}>
        <div className={loadingStyles.errorIcon}>⚠️</div>
        <div className={loadingStyles.errorMessage}>{error}</div>
        <button onClick={fetchDetail} className={loadingStyles.retryBtn}>
          다시 시도
        </button>
      </div>
    );
  }

  // 상태별 안내 문구 (원하면 사용)
  const banner =
    item?.status === "PROGRESS"
      ? { title: "경매 진행중", desc: "구매업체들이 입찰에 참여하고 있습니다." }
      : item?.status === "PENDING"
      ? { title: "경매 대기", desc: "시작 시간까지 잠시만 기다려주세요." }
      : item?.status === "DONE"
      ? { title: "경매 종료", desc: "해당 경매는 종료되었습니다." }
      : null;

  return (
    <div className={styles.main}>
      {/* 상단 정보 */}
      <div className={styles.textContainer}>
        <div className={styles.textLeft}>
          <div className={styles.textItem}>
            <span className={styles.label}>품목 (산지)</span>
            <span className={styles.valueBold}>
              {item.name} ({item.origin})
            </span>
          </div>
          <div className={styles.textItem}>
            <span className={styles.label}>판매자</span>
            <span className={styles.valueBold}>{item.seller}</span>
          </div>
          <div className={styles.textItem}>
            <span className={styles.label}>어획일</span>
            <span className={styles.valueBold}>{item.catchDate}</span>
          </div>
        </div>

        <div className={styles.textRight}>
          <div className={styles.cardRow}>
            <span className={styles.label}>개당 중량</span>
            <span className={styles.cardValue}>{item.unitWeightText}</span>
          </div>
          <div className={styles.cardRow}>
            <span className={styles.label}>수량</span>
            <span className={styles.cardValue}>{item.quantity}</span>
          </div>
          <div className={styles.cardDivider} />
          <div className={styles.cardRowTotal}>
            <span className={styles.totalLabel}>총 중량</span>
            <span className={styles.totalValue}>{totalWeight}</span>
          </div>
        </div>
      </div>

      {/* 이미지 4칸 */}
      <div className={styles.pictureContainer}>
        {(item.images?.length ? item.images.slice(0, 4) : new Array(4).fill(null)).map((src, i) => (
          <div key={i} className={styles.photo}>
            {src ? <img src={src} alt={`상품 이미지 ${i + 1}`} /> : <div className={styles.skeleton} />}
          </div>
        ))}
      </div>

      {/* 가격/시간 정보 */}
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>시작가</div>
          <div className={styles.statValue}>{formatKRW(item.startPrice)}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>현재 최고가</div>
          <div className={`${styles.statValue} ${styles.blue}`}>{formatKRW(item.currentPrice)}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>남은 시간</div>
          <div className={styles.statValue}>{remainText || "0:00"}</div>
        </div>
      </div>

      {/* 상태 안내 배너 */}
      {banner && (
        <div className={styles.banner}>
          <div className={styles.bannerTitle}>{banner.title}</div>
          <div className={styles.bannerDesc}>{banner.desc}</div>
        </div>
      )}
    </div>
  );
}

export default AuctionItem;
