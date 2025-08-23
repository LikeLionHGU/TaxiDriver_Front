import React from "react";
import styles from "./styles/search-input.module.css";

export default function SearchInput({ 
  value, 
  onChange, 
  placeholder = "수산물을 입력하세요", 
  width = "320px" 
}) {
  return (
    <div className={styles.searchBox} style={{ width }}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}