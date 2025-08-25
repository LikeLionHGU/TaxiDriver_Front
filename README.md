# 어울림(Oullim) — 수산물 온라인 경매 플랫폼 (Frontend) ⚡  

**“투명하고 신속한 온라인 경매, 어울림에서 시작하세요.”**  
어민, 중도매인, 위판장을 하나의 플랫폼으로 연결하고, **CNN 기반 AI 품질검사**로 신뢰를 더하는 스마트 경매 서비스입니다.  

---

## 📖 서비스 소개  

**어울림 프론트엔드**는 전통적인 오프라인 수산물 경매의 한계를 해결하기 위해 개발된  
**온라인 경매 플랫폼의 사용자 인터페이스(UI)** 입니다.  

- 사용자는 **어민 / 중도매인 / 관리자**로 나뉘며, 각각의 역할에 맞춘 UI를 제공합니다.  
- 모든 페이지는 **반응형 디자인**으로 제작되어 **PC, 태블릿, 모바일 환경**에서 원활히 사용할 수 있습니다.  
- 백엔드 API와 실시간 연동되어 **경매, 인증, 데이터 조회**가 원활히 이루어집니다.  

---

## ✨ 주요 기능  

### 1. 사용자별 UI  

#### **어민 (Fisherman)**  
- 어획물 등록 (품종, 중량, 수량 입력)  
- 포장 및 배송 정보 입력  
- 최저수락가(Reserve Price) 등록 및 수정  
- 경매 진행 현황 모니터링  

#### **중도매인 (Wholesaler)**  
- 실시간 경매 참여 및 단일가 입찰 기능  
- 자동 새로고침 / 실시간 WebSocket 업데이트 반영  
- 낙찰 결과 및 거래내역 확인  

#### **관리자 (Admin)**  
- CNN 기반 **AI 품질검사 결과 확인** 및 승인/거부 처리  
- 등록된 경매품 승인/거절 관리  
- 거래 및 통계 데이터 대시보드  
- 사용자 계정 및 권한 관리  

---

### 2. 공통 기능  
- **거래내역 Excel 다운로드**: 엑셀 파일로 내보내기 버튼 제공  
- **인증 및 권한 제어 (RBAC)**  
  - JWT 기반 로그인  
  - 사용자 역할(Role: 어민/중도매인/관리자)별 접근 제한  
- **파일 업로드 컴포넌트**  
  - AWS S3와 연동  
  - 어획물 이미지 업로드 및 미리보기 지원  

---

## 🛠 기술 스택  

### Frontend  
- **Framework:** React.js  
- **Language:** JavaScript (ES6+)  
- **Styling:** CSS Modules (컴포넌트 단위 스타일링, 충돌 방지)  
- **State Management:** React Hooks / Context API  
- **Routing:** React Router  
- **HTTP 통신:** Axios (백엔드 API 연동)  
- **실시간 통신:** WebSocket 기반 실시간 입찰 정보 반영  

### Build & Deploy  
- **Package Manager:** npm / yarn  
- **Build Tool:** Webpack, Babel  
- **Deployment:** Netlify / Vercel (CI/CD 연동 가능)  

### Integrations  
- **인증:** JWT 기반 사용자 인증 및 세션 관리  
- **파일 저장:** AWS S3 연동을 통한 이미지 업로드  
- **데이터 관리:** Excel Export (xlsx 라이브러리 활용)  

---

## 🚀 시작하기  

### 1. 저장소 클론  
```bash
git clone https://github.com/your-repo/Oullim-Frontend.git
cd Oullim-Frontend
