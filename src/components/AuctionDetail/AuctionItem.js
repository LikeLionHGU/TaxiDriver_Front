import React, { useEffect, useMemo, useState } from "react";
import styles from "./AuctionItem.module.css";

// ₩ 포맷
const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);

// 남은 시간 mm:ss
function useCountdown(endAt) {
  const [remain, setRemain] = useState(() => {
    if (!endAt) return null;
    return Math.max(0, Math.floor((new Date(endAt) - Date.now()) / 1000));
  });

  useEffect(() => {
    if (!endAt) return;
    const id = setInterval(() => {
      setRemain((prev) => {
        const next = Math.max(0, Math.floor((new Date(endAt) - Date.now()) / 1000));
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  if (remain == null) return "";
  const m = Math.floor(remain / 60);
  const s = remain % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AuctionItem({
  item = {
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
  },
}) {
  const totalWeight = useMemo(
    () =>
      typeof item.unitWeightKg === "number" && typeof item.quantity === "number"
        ? `${item.unitWeightKg * item.quantity}kg`
        : "-",
    [item.unitWeightKg, item.quantity]
  );

  const remainText = useCountdown(item.endAt);
  //content 말고 경매 진행 여부 확인 해서 띄울지 말지 !
  // const hasContent = content != null && String(content).trim() !== "";

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
        {(item.images?.length ? item.images.slice(0, 4) : new Array(4).fill(null)).map(
          (src, i) => (
            <div key={i} className={styles.photo}>
              {src ? <img src={src} alt={`상품 이미지 ${i + 1}`} /> : <div className={styles.skeleton} />}
            </div>
          )
        )}
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
      {/* {hasContent && ( <div className={styles.banner}>
        <div className={styles.bannerTitle}>경매 진행중</div>
        <div className={styles.bannerDesc}>구매업체들이 입찰에 참여하고 있습니다.</div>
      </div> )} */}
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>경매 진행중</div>
        <div className={styles.bannerDesc}>구매업체들이 입찰에 참여하고 있습니다.</div>
      </div>
    </div>
  );
}

export default AuctionItem;
