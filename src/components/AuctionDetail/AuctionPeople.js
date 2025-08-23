import React from "react";
import styles from "./AuctionPeople.module.css";

import PeopleRow from "../AuctionDetail/PeopleRow"

import people from "../../assets/AuctionTable/people.svg";

function AuctionPeople() {

  const MOCK_PEOPLE = [
  { id: 1, name: "나",     status: "경매 참여 중", lastBid: 25000, note: "마지막 호가" },
  { id: 2, name: "광주도매", status: "경매 참여 중", lastBid: 25000, note: "마지막 호가" },
  { id: 3, name: "부산수산", status: "경매 참여 중", lastBid: 25000, note: "마지막 호가" },
  { id: 4, name: "서울수산", status: "경매 참여 중", lastBid: 25000, note: "" },
];

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
        </div>
      </div>
    </>
  );
}


export default AuctionPeople;