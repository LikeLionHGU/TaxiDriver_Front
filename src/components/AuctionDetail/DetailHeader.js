import React from "react";
import styles from "./PageHeader.module.css";

import NoteImg from "../../assets/SaleTable/note.svg";
import CartImg from "../../assets/SaleTable/cart.svg";
import RegistarImg from "../../assets/수산물.svg";
import BoxImg from "../../assets/SaleTable/box.svg";

const icons = {
  note: NoteImg,
  cart: CartImg,
  registar: RegistarImg,
  box: BoxImg,
};

function PageHeader({ image = "", title = "", content = "" }) {
  const iconSrc = icons[image] || CartImg;

  return (
    <>
      <div className={styles.main}>
        <img src={iconSrc} alt="iconImg" />
        <div className={styles.textContainer}>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
    </>
  );
}


export default PageHeader;