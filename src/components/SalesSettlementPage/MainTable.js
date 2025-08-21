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
    { id: 1, productName: "(활)대게", origin: "포항", qty: 30,  unit: "마리", price: 250000, date: "2025. 8. 9." },
    { id: 2, productName: "(활)대게", origin: "포항", qty: 100, unit: "마리", price:  85000, date: "2025. 8. 10." },
    { id: 3, productName: "(활)대게", origin: "포항", qty: 200, unit: "마리", price: 120000, date: "2025. 8. 11." },
    { id: 4, productName: "(활)대게", origin: "포항", qty: 80,  unit: "마리", price:  95000, date: "2025. 8. 12." },
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