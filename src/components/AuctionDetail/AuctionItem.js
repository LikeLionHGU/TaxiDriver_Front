/* eslint-disable */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import loadingStyles from "../../styles/Loading.module.css";
import styles from "./AuctionItem.module.css";

import BigPanel from "../AuctionDetail/BigPanel";
import { useAuth, ROLES } from "../../auth/AuthContext";

/** ===== 유틸 & 매퍼 ===== */
const mapStatus = (n) => ({ "AUCTION_READY": "PROGRESS", "AUCTION_CURRENT": "PENDING", "AUCTION_FINISH": "DONE" }[n] || "PENDING");

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

// ===== 유틸 & 매퍼 중 일부만 수정 =====
function mapDtoToDetailItem(a) {
  // 시작 기준: startedAt || (triggerAt + 10분)
  const startBase = a.startedAt
    ? new Date(a.startedAt)
    : a.triggerAt
    ? addMinutes(a.triggerAt, 10)
    : null;

  const status = mapStatus(a.auctionStatus);
  const endAt =
    status === "PROGRESS" && startBase
      ? addMinutes(startBase, 15).toISOString()
      : null;

  const unitWeightText = joinUnit(a.fishWeight, a.salesMethod);
  // "5" 같은 값도 숫자로 받아줌
  const unitWeightKg =
    parseKg(a.fishWeight) ?? (isFinite(Number(a.fishWeight)) ? Number(a.fishWeight) : null);

  return {
    auctionStatusRaw: a.auctionStatus,
    name: a.name,
    origin: a.origin,
    seller: a.seller?.name ?? "-",
    catchDate: fmtYmd(a.registeredDate),
    unitWeightText,
    unitWeightKg,
    quantity: a.fishCount,
    images: a.urls || a.images || [null, null, null, null], 
    startPrice: a.reservePrice,
    currentPrice: a.topPrice ?? a.currentPrice ?? a.reservePrice, 
    endAt,
    status,
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
function AuctionItem({ item: initialItem, onStatusChange }) {
  const { role, loading } = useAuth();
  if (loading) return null;
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

  const { isReady, isCurrent, isFinish } = useMemo(() => {
    const raw = String(item?.auctionStatusRaw || "").toUpperCase();
    return {
      isReady: raw === "AUCTION_READY",
      isCurrent: raw === "AUCTION_CURRENT",
      isFinish: raw === "AUCTION_FINISH",
    };
  }, [item?.auctionStatusRaw]);

  // API 호출 → id로 대상 선택 → 매핑
  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.get(`https://likelion.info:443/post/get/${id}`, {
        withCredentials: true,
      });
      console.log(data);

      // ✅ 단건/배열/ items 세 가지 형태 모두 안전 처리
      let dto = null;
      if (data && typeof data === "object" && !Array.isArray(data) && data.id != null) {
        // 단건 객체
        dto = data;
      } else if (Array.isArray(data)) {
        dto = id ? data.find((x) => String(x.id) === String(id)) : data[0];
      } else if (Array.isArray(data?.items)) {
        const list = data.items;
        dto = id ? list.find((x) => String(x.id) === String(id)) : list[0];
      }

      if (!dto) {
        throw new Error("해당 경매를 찾을 수 없습니다.");
      }

      const mapped = mapDtoToDetailItem(dto);
      setItem(mapped);
      onStatusChange?.({
        raw: mapped.auctionStatusRaw,
        value: mapped.status,
      });
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


    
       {isFinish && (
        <div className={styles.banner}>
          <div className={styles.bannerTitle}>경매 종료</div>
          <div className={styles.bannerDesc}>경매가 종료되었습니다.</div>
        </div>
      )} 

      { role === ROLES.JUNGDOMAEIN && isCurrent && <BigPanel item={item} totalWeight={totalWeight} remainText={remainText} /> }

    </div>
  );
}

export default AuctionItem;
