/* eslint-disable */

import React , { useState , useMemo} from "react";
import styles from "../styles/AuctionDetail.module.css";

import PageHeader from "../components/SalesSettlementPage/PageHeader";
import AuctionItem from "../components/AuctionDetail/AuctionItem"
import AuctionPeople from "../components/AuctionDetail/AuctionPeople"

import stopbutton from "../assets/AuctionTable/stop.svg";
import beforestopbutton from "../assets/AuctionTable/beforestop.svg";


function AuctionDetail() {
  const [auctionStatus, setAuctionStatus] = useState(null);
  const { title, content } = useMemo(() => {
    const k = (auctionStatus?.raw || auctionStatus?.value || "").toUpperCase();

    if (k === "AUCTION_CURRENT" || k === "PROGRESS") {
      return {
        title: "경매 진행",
        content: "",
      };
    }
    if (k === "AUCTION_FINISH" || k === "DONE") {
      return {
        title: "경매 종료",
        content: "",
      };
    }
    // 기본(대기)
    return {
      title: "경매 대기",
      content: "",
    };
  }, [auctionStatus]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>

          <div className={styles.auctionLeft}>
            <PageHeader 
              image="note"
              title={title}
              content={content}/>
            <AuctionItem onStatusChange={({ raw, value }) => {
          setAuctionStatus({ raw, value });
        }}/>
          </div>
          <AuctionPeople onStatusChange={({ raw, value }) => {
          setAuctionStatus({ raw, value });
        }}/>
        </div>
      </div>
    </>
  );
}

export default AuctionDetail;