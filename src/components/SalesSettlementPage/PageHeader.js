import React from "react";
import styles from "./PageHeader.module.css";

import NoteImg from "../../assets/SaleTable/note.svg"; 
import CartImg from "../../assets/SaleTable/cart.svg";


function PageHeader({ image = "", title = "", content = "" }) {

  return (
    <>
      <div className={styles.main}>
        <img src={image === "note" ? NoteImg : CartImg} alt="iconImg" />
        <div className={styles.textContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.content}>{content}</span>
        </div>
      </div>
    </>
  );
}


export default PageHeader;