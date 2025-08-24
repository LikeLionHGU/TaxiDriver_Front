import React from "react";
import styles from "./MainTable.module.css";

import MainTableBox from "../../components/SalesSettlementPage/MainTableBox";


function MainTable({ data, selectedRows, selectAll, handleSelectRow, handleSelectAll }) {
  // The category filtering logic should ideally be handled in the parent component (SalesSettlement.js)
  // or a more robust data fetching/filtering mechanism.
  // For now, we will just pass the data directly.

  return (
    <>
      <div className={styles.main}>
        {/* The category buttons are currently disconnected from the data passed from SalesSettlement.js.
            If category filtering is still desired, it needs to be implemented in SalesSettlement.js
            and the filtered data passed down. For now, removing the category buttons to simplify.
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
        */}

        <div className={styles.tableContent}>
          <MainTableBox
            items={data} // Pass the data received from SalesSettlement.js
            selectedRows={selectedRows}
            selectAll={selectAll}
            handleSelectRow={handleSelectRow}
            handleSelectAll={handleSelectAll}
          />
        </div>
 
      </div>
    </>
  );
}


export default MainTable;