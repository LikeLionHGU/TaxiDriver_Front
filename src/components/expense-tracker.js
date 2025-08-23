import ReceiptForm from "./receipt-form"
import auctionStyles from "./AuctionPage/Auction.module.css";
import PageHeader from "./SalesSettlementPage/PageHeader"

export function ExpenseTracker() {
  return (
    <div className={auctionStyles.main}>
      <div className={auctionStyles.gradientBox}/>
      <div className={auctionStyles.pageContainer}>
        <PageHeader 
            image="registar"
            content="판매할 수산물을 등록하세요." 
            title="수산물 등록" />
        <ReceiptForm />
      </div>
    </div>
  )
}
