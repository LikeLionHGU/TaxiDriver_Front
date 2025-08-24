/* eslint-disable */
// LandingPage.jsx
import React from "react";
import axios from "axios";
import LandingHeader from '../components/LandingHeader';
import styles from '../components/styles/landing-header.module.css';

// axios.defaults.withCredentials = true;

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

// async function sendSecureRequest() {
//   if (!window.CSRF) {
//     await initCsrf();
//   }

//   console.log("CSRF:", window.CSRF);

//   const res = await axios.post(
//     "https://likelion.info/temp",
//     {}, // ← body (없으면 빈 객체)
//     {
//       withCredentials: true,
//       headers: {
//         // 서버에서 요구하는 정확한 헤더명을 사용하세요.
//         // (백엔드가 X-XSRF-TOKEN인지 X-CSRF-TOKEN인지 확인)
//         "X-XSRF-TOKEN": window.CSRF,
//         // "X-CSRF-TOKEN": window.CSRF,
//       },
//     }
//   );

//   console.log(res.data);
// }

// const API = "https://likelion.info";


// export async function initCsrf() {
//   const tryOnce = async () => {
//     const res = await axios.get(`${API}/test`, { withCredentials: true });
//     const h = res.headers || {};
//     return h["x-csrf-token"] || h["x-xsrf-token"] || h["X-CSRF-TOKEN"] || null;
//   };

//   // 1차 시도(세션 생성 + 토큰 시도)
//   let token = await tryOnce();

//   // 토큰이 아직 없으면 2차 시도(이미 세션 쿠키가 생겼으니 이번엔 헤더가 올 가능성 큼)

//   window.CSRF = token;
// }



const LandingPage = () => {

  return (
    <div className={styles.landingPage}>
      {/* 헤더 */}
      <LandingHeader />
      {/* <button onClick={() => initCsrf()}>
        test
      </button>
      <button onClick={() => sendSecureRequest()}>
        test2
      </button>
      <button >
        test3
      </button> */}
    </div>
  );
};

export default LandingPage;