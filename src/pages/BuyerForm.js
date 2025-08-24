import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/consignment-company-form.module.css";
import LandingHeader from "../components/LandingHeader";

const BuyerForm = () => {
  const [formData, setFormData] = useState({
    personName: "",
    companyName: "",
    phoneNumber: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://likelion.info/user/signin/buyer", formData);
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/landing");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <LandingHeader />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>구매업체 정보 입력</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputSection}>
              <label className={styles.inputLabel}>성명</label>
              <input
                type="text"
                name="personName"
                placeholder="예: 홍길동"
                className={styles.input}
                value={formData.personName}
                onChange={handleChange}
              />
              <label className={styles.inputLabel}>업체명</label>
              <input
                type="text"
                name="companyName"
                placeholder="예: 부산수산"
                className={styles.input}
                value={formData.companyName}
                onChange={handleChange}
              />
              <label className={styles.inputLabel}>연락처</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="010-0000-0000"
                className={styles.input}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className={styles.inputLabel}>소재지</label>
              <input
                type="text"
                name="location"
                placeholder="예: 부산광역시"
                className={styles.input}
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.cancelButton} onClick={() => navigate("/landing")}>
                취소
              </button>
              <button type="submit" className={styles.primaryButton}>
                ✓ 회원가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyerForm;