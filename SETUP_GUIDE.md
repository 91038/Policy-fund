# 정책자금 랜딩페이지 설정 가이드

## 1. Google Sheets API 설정

### 1.1 Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "사용 설정된 API" 클릭
4. "API 및 서비스 사용 설정" 클릭
5. "Google Sheets API" 검색 후 사용 설정

### 1.2 서비스 계정 생성
1. "API 및 서비스" > "사용자 인증 정보" 클릭
2. "사용자 인증 정보 만들기" > "서비스 계정" 선택
3. 서비스 계정 이름 입력 (예: policy-fund-service)
4. "만들고 계속하기" 클릭
5. 역할은 "기본" > "편집자" 선택
6. "완료" 클릭

### 1.3 서비스 계정 키 생성
1. 생성된 서비스 계정 클릭
2. "키" 탭 선택
3. "키 추가" > "새 키 만들기" 클릭
4. "JSON" 선택 후 "만들기"
5. 다운로드된 JSON 파일 저장

### 1.4 Google Sheets 설정
1. 새 Google Sheets 문서 생성
2. 첫 번째 행에 헤더 추가:
   - A1: 신청시간
   - B1: 성함
   - C1: 연락처
   - D1: 직군
   - E1: 희망금액
   - F1: 사업자등록번호
3. 서비스 계정 이메일과 시트 공유:
   - 시트 우측 상단 "공유" 클릭
   - JSON 파일의 "client_email" 값 입력
   - "편집자" 권한으로 공유

## 2. Gmail SMTP 설정

### 2.1 2단계 인증 활성화
1. [Google 계정](https://myaccount.google.com/) 접속
2. "보안" 탭 선택
3. "2단계 인증" 활성화

### 2.2 앱 비밀번호 생성
1. "보안" > "2단계 인증" > "앱 비밀번호"
2. 앱 선택: "메일"
3. 기기 선택: "기타" 선택 후 "정책자금 랜딩페이지" 입력
4. 생성된 16자리 비밀번호 복사

## 3. 환경 변수 설정

`.env.local` 파일을 열고 다음 정보를 입력:

```env
# Google Sheets API 설정
GOOGLE_SERVICE_ACCOUNT_EMAIL=다운로드한_JSON파일의_client_email값
GOOGLE_PRIVATE_KEY="다운로드한_JSON파일의_private_key값"

# Google Sheets ID
GOOGLE_SHEET_ID=구글시트_URL의_ID부분

# Gmail SMTP 설정
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=생성한_16자리_앱_비밀번호

# 알림을 받을 이메일 주소
NOTIFICATION_EMAIL=알림받을이메일@example.com
```

### 주의사항:
- `GOOGLE_PRIVATE_KEY`는 반드시 큰따옴표로 감싸야 합니다
- 개행문자(\n)는 그대로 유지해야 합니다
- `.env.local` 파일은 절대 Git에 커밋하지 마세요

## 4. 실행 방법

```bash
npm install
npm run dev
```

## 5. 테스트

1. http://localhost:3000 접속
2. 폼 작성 후 제출
3. Google Sheets에 데이터 추가 확인
4. 설정한 이메일로 알림 수신 확인