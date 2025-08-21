import React,{useState} from "react";
import styles from "./MainTable.module.css";

import MainTableBox from "../../components/SalesSettlementPage/MainTableBox";


function MainTable() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  // const filteredList =
  //   selectedCategory === "전체"
  //     ? show
  //     : show.filter((item) => item.category === selectedCategory);

  const MOCK_ROWS = [
  { id: 1,  productName: "(활)대게", origin: "포항", qty: 30,  unit: "마리", price: 250000, buyer: "한림수산", status: "정산 대기", date: "2025. 8. 9." },
  { id: 2,  productName: "(활)대게", origin: "포항", qty: 100, unit: "마리", price:  85000, buyer: "청어수산", status: "정산 대기", date: "2025. 8. 10." },
  { id: 3,  productName: "(활)대게", origin: "포항", qty: 200, unit: "마리", price: 120000, buyer: "동해수산", status: "정산 대기", date: "2025. 8. 11." },
  { id: 4,  productName: "(활)대게", origin: "포항", qty: 80,  unit: "마리", price:  95000, buyer: "삼우수산", status: "정산 대기", date: "2025. 8. 12." },

  // 최근 1주 예시
  { id: 5,  productName: "(활)대게", origin: "포항", qty: 20,  unit: "마리", price: 190000, buyer: "현대수산", status: "정산 완료", date: "2025. 8. 21." },
  { id: 6,  productName: "(활)대게", origin: "포항", qty: 12,  unit: "마리", price: 110000, buyer: "제일수산", status: "정산 대기", date: "2025. 8. 20." },
  { id: 7,  productName: "(활)대게", origin: "포항", qty: 50,  unit: "마리", price: 170000, buyer: "대경수산", status: "정산 대기", date: "2025. 8. 18." },

  // 최근 1개월(1주 밖)
  { id: 8,  productName: "(활)대게", origin: "포항", qty: 60,  unit: "마리", price:  99000, buyer: "우성수산", status: "정산 완료", date: "2025. 8. 1." },
  { id: 9,  productName: "(활)대게", origin: "포항", qty: 40,  unit: "마리", price: 130000, buyer: "부산수산", status: "정산 대기", date: "2025. 7. 30." },

  // 최근 3개월(1개월 밖)
  { id: 10, productName: "(활)대게", origin: "포항", qty: 25,  unit: "마리", price:  78000, buyer: "동남수산", status: "정산 대기", date: "2025. 7. 5." },
  { id: 11, productName: "(활)대게", origin: "포항", qty: 70,  unit: "마리", price: 145000, buyer: "해동수산", status: "정산 완료", date: "2025. 6. 18." },
  { id: 12, productName: "(활)대게", origin: "포항", qty: 55,  unit: "마리", price: 102000, buyer: "제주수산", status: "정산 대기", date: "2025. 6. 2." },
];

  return (
    <>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          {["전체", "최근 1주", "최근 1개월", "최근 3개월"].map( (category, idx) => (
              <button
                key={idx}
                className={
                  `${selectedCategory === category
                    ? styles.activeCategory
                    : styles.inactiveCategory} ${styles.categoryButton}`
                }
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
              </button>
            )
          )}
        </div>

{/*-------------------------------------------------------------------  */}


        <div className={styles.tableContent}>
          <MainTableBox items={MOCK_ROWS}/>
        </div>

      </div>
    </>
  );
}


export default MainTable;