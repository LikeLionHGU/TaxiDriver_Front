/* eslint-disable */

import React , { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./AuctionPeople.module.css";
import axios from "axios";
import loadingStyles from "../../styles/Loading.module.css";

import PeopleRow from "../AuctionDetail/PeopleRow"

import people from "../../assets/AuctionTable/people.svg";

function AuctionPeople() {
  const { id: paramId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {data} = await axios.get(
        `https://likelion.info:443/auction/specific/users/${paramId}`
        , { withCredentials: true});
      console.log("경매 참여 확인",data);

    } catch (error) {
      // 상세 조회 오류 처리
      setError("정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const MOCK_PEOPLE = [
    { id: 1, name: "나",     status: "경매 참여 중", lastBid: 25000, note: "마지막 호가" },
    { id: 2, name: "광주도매", status: "경매 참여 중", lastBid: 25000, note: "마지막 호가" },
    { id: 3, name: "부산수산", status: "경매 참여 중", lastBid: 25000, note: "마지막 호가" },
    { id: 4, name: "서울수산", status: "경매 참여 중", lastBid: 25000, note: "" },
  ];

  if (isLoading) {
    return (
      <div className={loadingStyles.loading}>
        {/* <div className={loadingStyles.loadingSpinner}></div> */}
        <div className={loadingStyles.loadingText}>
          정보를 불러오고 있습니다...
        </div>
        <div className={loadingStyles.loadingSubtext}>잠시만 기다려주세요</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={loadingStyles.loading}>
        <div className={loadingStyles.errorIcon}>⚠️</div>
        <div className={loadingStyles.errorMessage}>{error}</div>
        <button onClick={() => fetchData()} className={loadingStyles.retryBtn}>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.main}`}>
        <div className={styles.titleContainer}>
          <span className={styles.titleText}>
            참여 중도매인
          </span>
          <div className={styles.titleNumber}>
            <img src={people} alt="people"/>
            <span>1</span>
            <span>명</span>
          </div>
        </div>
{/* 
        <div className={styles.list} role="list">
          {MOCK_PEOPLE.map((p) => (
            <PeopleRow
              key={p.id}
              name={p.name}
              status={p.status}
              lastBid={p.lastBid}
              note={p.note}
            />
          ))}
        </div> */}

        <div className={styles.beforeStart}>
          <div className={styles.beforeStartContainer}>
            <img src={people} alt="people"/>
            <span className={styles.beforeStartText}>경매 시작 전입니다</span>
            <span>14:30에 경매가 시작됩니다</span>
          </div>
        </div>
      </div>
    </>
  );
}


export default AuctionPeople;