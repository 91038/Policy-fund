'use client';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="mb-6">
          금손대부(이하 '회사')는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 
          적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. 개인정보의 처리목적</h2>
        <p className="mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
        <ul className="list-disc ml-6 mb-6">
          <li>정책자금 상담 및 컨설팅 서비스 제공</li>
          <li>상담 신청자와의 연락 및 상담 일정 조율</li>
          <li>서비스 개선 및 신규 서비스 개발</li>
          <li>법령상 의무 이행</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. 개인정보의 처리 및 보유기간</h2>
        <p className="mb-6">
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </p>
        <ul className="list-disc ml-6 mb-6">
          <li>상담 신청 정보: 상담 완료 후 3년</li>
          <li>계약 체결 및 이행: 계약 종료 후 5년</li>
          <li>전자상거래법 등 관련 법령에 의한 보존: 해당 법령에서 정한 기간</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. 개인정보의 제3자 제공</h2>
        <p className="mb-6">
          회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 
          정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. 정보주체의 권리·의무 및 행사방법</h2>
        <p className="mb-4">정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
        <ul className="list-disc ml-6 mb-6">
          <li>개인정보 열람요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제요구</li>
          <li>처리정지 요구</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. 처리하는 개인정보 항목</h2>
        <p className="mb-4">회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <ul className="list-disc ml-6 mb-6">
          <li>필수항목: 성명, 연락처, 상담내용</li>
          <li>선택항목: 회사명, 사업자등록번호, 희망 대출금액</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. 개인정보의 파기</h2>
        <p className="mb-6">
          회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
          지체없이 해당 개인정보를 파기합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. 개인정보 보호책임자</h2>
        <p className="mb-4">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
        <ul className="list-disc ml-6 mb-6">
          <li>개인정보 보호책임자: 이선희</li>
          <li>연락처: 032-670-9224</li>
          <li>주소: 인천광역시 연수구 능허대로 133, 4층 479호</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. 개인정보처리방침 변경</h2>
        <p className="mb-6">
          이 개인정보처리방침은 2025년 7월 16일부터 적용됩니다.
        </p>
      </div>
    </div>
  );
}