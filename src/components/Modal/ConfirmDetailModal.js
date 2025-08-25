/* eslint-disable */
import styles from "./ConfirmDetailModal.module.css";
import React from "react";

const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

const fallback = (v, d = "-") => (v == null || v === "" ? d : v);

const ConfirmDetailModal = ({ open, close, item, onConfirm = () => {} }) => {
  // 모달에 표시할 값들(안전 기본값)
  const fishName = fallback(item?.productName, "정보 없음");
  const weight   = fallback(item?.weight);
  const origin   = fallback(item?.origin);
  const bidPrice = formatKRW(item?.bidPrice);
  const buyer    = fallback(item?.buyerName);
  const place    = fallback(item?.pickupPlace);
  const date     = fallback(item?.dueDate);
  const time     = fallback(item?.dueTime);

  return (
    <>
      <div
        className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
        onClick={close} // 모달 바깥 클릭 시 닫힘
      >
        {open ? (
          <section onClick={(e) => e.stopPropagation()}>
            <main>
              <div className={styles.modalHeader}>
                <span>수령 확인</span>
              </div>

              <div className={styles.topContainer}>
                {/* 기본 정보 */}
                <div className={styles.firstContainer}>
                  <span className={styles.containerTitle}>기본 정보</span>
                  <div className={styles.confirmContent}>
                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>어종</span>
                      <span className={styles.contentText}>{fishName}</span>
                    </div>

                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>포장단위</span>
                      <span className={styles.contentText}>{weight}</span>
                    </div>

                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>어획지역</span>
                      <span className={styles.contentText}>{origin}</span>
                    </div>

                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>수령 장소</span>
                      <span className={styles.contentText}>{place}</span>
                    </div>

                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>수령 일시</span>
                      <span className={styles.contentText}>
                        {date} {time}
                      </span>
                    </div>

                    <div className={`${styles.contentRow} ${styles.total}`}>
                      <span className={styles.contentTotalTitle}>낙찰 금액</span>
                      <span className={styles.contentTotalText}>{bidPrice}</span>
                    </div>
                  </div>
                </div>


              </div>

              <div className={styles.bottomContainer}>
                <button type="button" className={styles.button} onClick={close}>
                  <span>취소</span>
                </button>
                <button
                  type="button"
                  className={styles.button1}
                  onClick={() => onConfirm(item)}
                >
                  <span>확인</span>
                </button>
              </div>
            </main>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default ConfirmDetailModal;
