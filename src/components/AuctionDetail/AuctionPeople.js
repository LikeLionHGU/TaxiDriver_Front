/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./AuctionPeople.module.css";
import loadingStyles from "../../styles/Loading.module.css";

import PeopleRow from "../AuctionDetail/PeopleRow";
import peopleIcon from "../../assets/AuctionTable/people.svg";

// 응답에서 배열 꺼내오기 (방어적)
const extractList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

// 항목 매핑 (필드명이 달라도 대응)
const mapParticipant = (u) => ({
  id: u.id ?? u.userId ?? u.participantId ?? Math.random().toString(36).slice(2),
  name: u.name ?? u.userName ?? u.nickname ?? "-",
  // lastBid는 백엔드 명칭에 따라 후보들을 체크
  lastBid: u.lastBid ?? u.bidPrice ?? u.price ?? u.topPrice ?? null,
  status: "경매 참여 중",
  note: u.note ?? "",
});

function AuctionPeople() {
  const { id: paramId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [peopleList, setPeopleList] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.get(
        `https://likelion.info:443/auction/specific/users/${paramId}`,
        { withCredentials: true }
      );
      // console.log("경매 참여 확인", data);

      const list = extractList(data).map(mapParticipant);
      setPeopleList(list);
    } catch (e) {
      setError("정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!paramId) {
      setIsLoading(false);
      setError("잘못된 경로입니다. (경매 ID 없음)");
      return;
    }
    fetchData();
  }, [paramId]);

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
        <button onClick={fetchData} className={loadingStyles.retryBtn}>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <span className={styles.titleText}>참여 중도매인</span>
        <div className={styles.titleNumber}>
          <img src={peopleIcon} alt="people" />
          <span>{peopleList.length}</span>
          <span>명</span>
        </div>
      </div>

      {peopleList.length > 0 ? (
        <div className={styles.list} role="list">
          {peopleList.map((p) => (
            <PeopleRow
              key={p.id}
              name={p.name}
              status={p.status}
              lastBid={p.lastBid}
              note={p.note} 
            />
          ))}
        </div>
      ) : ( 
        <div className={styles.beforeStart}>
          <div className={styles.beforeStartContainer}> 
            <img src={peopleIcon} alt="people" />
            <span className={styles.beforeStartText}>참여 중도매인이 없습니다</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionPeople;
