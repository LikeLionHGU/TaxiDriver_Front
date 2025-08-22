import React,{useState, useMemo} from "react";
import styles from "./MainTable.module.css";

import MainTableBox from "../../components/SalesSettlementPage/MainTableBox";


function MainTable() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const MOCK_ROWS = [
  // 전체
  { id: 1,  category: "전체", productName: "(활)대게", origin: "포항", qty: 30,  unit: "마리", price: 250000, date: "2025. 8. 9." },
  { id: 2,  category: "전체", productName: "(활)대게", origin: "포항", qty: 100, unit: "마리", price:  85000, date: "2025. 8. 10." },
  { id: 3,  category: "전체", productName: "(활)대게", origin: "포항", qty: 200, unit: "마리", price: 120000, date: "2025. 8. 11." },
  { id: 4,  category: "전체", productName: "(활)대게", origin: "포항", qty: 80,  unit: "마리", price:  95000, date: "2025. 8. 12." },

  // 최근 1주
  { id: 5,  category: "최근 1주", productName: "(활)대게", origin: "포항", qty: 20,  unit: "마리", price: 190000, date: "2025. 8. 21." },
  { id: 6,  category: "최근 1주", productName: "(활)대게", origin: "포항", qty: 12,  unit: "마리", price: 110000, date: "2025. 8. 20." },
  { id: 7,  category: "최근 1주", productName: "(활)대게", origin: "포항", qty: 50,  unit: "마리", price: 170000, date: "2025. 8. 18." },

  // 최근 1개월
  { id: 8,  category: "최근 1개월", productName: "(활)대게", origin: "포항", qty: 60,  unit: "마리", price:  99000, date: "2025. 8. 1." },
  { id: 9,  category: "최근 1개월", productName: "(활)대게", origin: "포항", qty: 40,  unit: "마리", price: 130000, date: "2025. 7. 30." },
  { id:10,  category: "최근 1개월", productName: "(활)대게", origin: "포항", qty: 45,  unit: "마리", price: 105000, date: "2025. 8. 5." },

  // 최근 3개월
  { id:11,  category: "최근 3개월", productName: "(활)대게", origin: "포항", qty: 25,  unit: "마리", price:  78000, date: "2025. 7. 5." },
  { id:12,  category: "최근 3개월", productName: "(활)대게", origin: "포항", qty: 70,  unit: "마리", price: 145000, date: "2025. 6. 18." },
  ];

// 1) 카테고리 별로 데이터 분류
  const filteredItems = useMemo(() => {
   if (selectedCategory === "전체") return MOCK_ROWS;
   return MOCK_ROWS.filter((it) => it.category === selectedCategory);
 }, [selectedCategory, MOCK_ROWS]);

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
          <MainTableBox items={filteredItems}/>
        </div>

      </div>
    </>
  );
}


export default MainTable;