export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  sections: LegalSection[];
};

const PRIVACY_VI: LegalDoc = {
  title: "Chính sách bảo mật",
  updatedLabel: "Cập nhật lần cuối",
  updatedDate: "15/05/2026",
  intro:
    "AZON (\"chúng tôi\") cam kết bảo vệ quyền riêng tư của Người dùng khi sử dụng nền tảng quản lý nhân sự AZON, bao gồm ứng dụng web và ứng dụng di động (\"Dịch vụ\"). Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của Người dùng.",
  sections: [
    {
      heading: "1. Thông tin chúng tôi thu thập",
      paragraphs: [
        "Để cung cấp đầy đủ chức năng của Dịch vụ, AZON có thể thu thập các loại thông tin sau:",
      ],
      bullets: [
        "Thông tin tài khoản: họ tên, email, số điện thoại, mã nhân viên, ảnh đại diện, chức vụ, phòng ban.",
        "Thông tin hồ sơ nhân sự do doanh nghiệp khởi tạo: CMND/CCCD, hợp đồng lao động, người phụ thuộc, thông tin liên hệ khẩn cấp.",
        "Dữ liệu chấm công: thời điểm Check-in/Check-out, vị trí GPS, địa chỉ IP, WiFi SSID, dữ liệu sinh trắc học (khuôn mặt, vân tay) — chỉ khi doanh nghiệp bật tính năng tương ứng và Người dùng cho phép.",
        "Dữ liệu lương & hợp đồng: bảng lương, phụ cấp, khấu trừ, hợp đồng lao động và phụ lục.",
        "Thông tin thiết bị: mẫu thiết bị, hệ điều hành, phiên bản ứng dụng, mã định danh thiết bị, ngôn ngữ.",
        "Nhật ký sử dụng: thao tác trong app, thời gian truy cập, sự cố kỹ thuật để cải thiện chất lượng Dịch vụ.",
      ],
    },
    {
      heading: "2. Mục đích sử dụng",
      bullets: [
        "Vận hành các tính năng cốt lõi: chấm công, nghỉ phép, tính lương, quản lý hợp đồng, cổng nhân viên (ESS).",
        "Xác thực danh tính, đảm bảo an toàn tài khoản và phòng chống gian lận chấm công.",
        "Gửi thông báo về phê duyệt, lịch làm việc, phiếu lương, tin tức công ty.",
        "Phân tích, thống kê tổng hợp (đã ẩn danh) nhằm cải thiện sản phẩm.",
        "Tuân thủ nghĩa vụ pháp lý (thuế TNCN, BHXH, lưu trữ hợp đồng theo Bộ luật Lao động).",
      ],
    },
    {
      heading: "3. Quyền sinh trắc học & quyền truy cập trên thiết bị",
      paragraphs: [
        "Ứng dụng di động AZON có thể yêu cầu một số quyền sau, mỗi quyền đều có mục đích rõ ràng và Người dùng có thể từ chối/hủy bất cứ lúc nào trong cài đặt thiết bị:",
      ],
      bullets: [
        "Vị trí (GPS): xác minh chấm công đúng địa điểm làm việc do doanh nghiệp cấu hình.",
        "Camera: chụp ảnh xác thực khuôn mặt khi chấm công, cập nhật ảnh đại diện, đính kèm tài liệu.",
        "Sinh trắc học (Face ID / Touch ID / vân tay): xác thực đăng nhập và chấm công, dữ liệu sinh trắc được xử lý cục bộ trên thiết bị hoặc mã hóa khi truyền.",
        "Lưu trữ / Tệp: tải lên hồ sơ, hợp đồng, hình ảnh.",
        "Thông báo đẩy: gửi tin về phê duyệt, lịch ca, tin tức.",
        "Mạng / Wi-Fi: xác thực chấm công bằng SSID/IP công ty.",
      ],
    },
    {
      heading: "4. Chia sẻ dữ liệu",
      paragraphs: [
        "AZON KHÔNG bán dữ liệu cá nhân của Người dùng. Dữ liệu chỉ được chia sẻ trong các trường hợp sau:",
      ],
      bullets: [
        "Trong nội bộ doanh nghiệp (tenant) của Người dùng, theo phân quyền do quản trị viên cấu hình.",
        "Nhà cung cấp hạ tầng/dịch vụ kỹ thuật (lưu trữ đám mây, gửi email, SMS, push notification) — đã ký thỏa thuận xử lý dữ liệu.",
        "Cơ quan nhà nước có thẩm quyền khi có yêu cầu hợp lệ theo pháp luật Việt Nam.",
        "Đối tác ngân hàng/HĐĐT khi Người dùng/doanh nghiệp chủ động bật tính năng tích hợp.",
      ],
    },
    {
      heading: "5. Lưu trữ & Bảo mật",
      bullets: [
        "Dữ liệu được lưu trữ trên hạ tầng đám mây tại Việt Nam và/hoặc các trung tâm dữ liệu đạt chuẩn ISO 27001.",
        "Truyền tải bằng TLS/HTTPS, mật khẩu được băm (hash) một chiều, dữ liệu nhạy cảm được mã hóa.",
        "Cách ly tuyệt đối giữa các tenant (multi-tenant).",
        "Thời gian lưu trữ tuân theo quy định pháp luật về lao động, kế toán, thuế (tối thiểu 10 năm với chứng từ liên quan).",
      ],
    },
    {
      heading: "6. Quyền của Người dùng",
      bullets: [
        "Truy cập, chỉnh sửa thông tin cá nhân qua cổng nhân viên (ESS) hoặc liên hệ HR doanh nghiệp.",
        "Yêu cầu xuất, đính chính hoặc xóa dữ liệu — trong phạm vi không trái với nghĩa vụ pháp lý của doanh nghiệp sử dụng.",
        "Rút quyền truy cập thiết bị (vị trí, camera, sinh trắc học) bất cứ lúc nào trong cài đặt.",
        "Khiếu nại tới chúng tôi qua email support@azonsolution.com.",
      ],
    },
    {
      heading: "7. Trẻ em",
      paragraphs: [
        "Dịch vụ dành cho người lao động từ đủ 15 tuổi trở lên theo quy định của Bộ luật Lao động Việt Nam. Chúng tôi không chủ động thu thập dữ liệu của trẻ em dưới 13 tuổi.",
      ],
    },
    {
      heading: "8. Thay đổi chính sách",
      paragraphs: [
        "Chính sách có thể được cập nhật theo thời gian. Phiên bản mới sẽ được công bố tại trang này và (đối với thay đổi quan trọng) gửi thông báo trong ứng dụng.",
      ],
    },
    {
      heading: "9. Liên hệ",
      paragraphs: [
        "Mọi câu hỏi liên quan đến quyền riêng tư xin gửi về:",
      ],
      bullets: [
        "Email: support@azonsolution.com",
        "Hotline: +84 329 300 677",
        "Địa chỉ: TP. Hồ Chí Minh, Việt Nam",
      ],
    },
  ],
};

const PRIVACY_EN: LegalDoc = {
  title: "Privacy Policy",
  updatedLabel: "Last updated",
  updatedDate: "May 15, 2026",
  intro:
    "AZON (\"we\", \"us\") is committed to protecting the privacy of Users of the AZON HR platform, including our web and mobile applications (the \"Service\"). This Policy describes how we collect, use, store, and protect Users' personal information.",
  sections: [
    {
      heading: "1. Information we collect",
      paragraphs: [
        "To deliver the full functionality of the Service, AZON may collect the following types of information:",
      ],
      bullets: [
        "Account information: full name, email, phone number, employee ID, avatar, job title, department.",
        "HR profile data created by the employer: ID/Passport, employment contracts, dependents, emergency contacts.",
        "Attendance data: Check-in/out timestamps, GPS location, IP address, Wi-Fi SSID, biometric data (face, fingerprint) — only when the employer enables these features and the User grants permission.",
        "Payroll & contract data: payslips, allowances, deductions, employment contracts and addenda.",
        "Device information: device model, OS, app version, device identifier, language.",
        "Usage logs: in-app actions, access times, crash reports — used to improve the Service.",
      ],
    },
    {
      heading: "2. How we use information",
      bullets: [
        "Operate core features: attendance, leave, payroll, contract management, employee self-service (ESS).",
        "Authenticate identity, protect accounts, and prevent attendance fraud.",
        "Send notifications about approvals, schedules, payslips, and company news.",
        "Aggregated/anonymized analytics to improve the product.",
        "Comply with legal obligations (PIT, social insurance, contract retention under Vietnamese Labor Law).",
      ],
    },
    {
      heading: "3. Biometric & device permissions",
      paragraphs: [
        "The AZON mobile app may request the following permissions. Each has a clear purpose and may be revoked at any time in the device settings:",
      ],
      bullets: [
        "Location (GPS): verify attendance at the worksite configured by the employer.",
        "Camera: face-verification check-in, profile photo, document attachments.",
        "Biometrics (Face ID / Touch ID / fingerprint): authentication for sign-in and attendance; biometric templates are processed locally on device or encrypted in transit.",
        "Storage / Files: upload HR records, contracts, images.",
        "Push notifications: approvals, shifts, news.",
        "Network / Wi-Fi: attendance verification via corporate SSID/IP.",
      ],
    },
    {
      heading: "4. Data sharing",
      paragraphs: [
        "AZON does NOT sell User personal data. Data is shared only in the following cases:",
      ],
      bullets: [
        "Within the User's organization (tenant), subject to permissions configured by the admin.",
        "Infrastructure / technical service providers (cloud hosting, email, SMS, push) — bound by data-processing agreements.",
        "Competent state agencies upon lawful request under Vietnamese law.",
        "Banking / e-invoice partners only when the User/employer actively enables the integration.",
      ],
    },
    {
      heading: "5. Storage & Security",
      bullets: [
        "Data is stored on cloud infrastructure in Vietnam and/or ISO 27001-certified data centers.",
        "Transmission secured via TLS/HTTPS; passwords are one-way hashed; sensitive data is encrypted.",
        "Strict tenant isolation (multi-tenant architecture).",
        "Retention follows labor, accounting, and tax laws (minimum 10 years for related vouchers).",
      ],
    },
    {
      heading: "6. User rights",
      bullets: [
        "Access and edit personal information via ESS or the employer's HR.",
        "Request export, correction, or deletion — within the limits of the employer's legal obligations.",
        "Revoke device permissions (location, camera, biometrics) at any time in device settings.",
        "Submit complaints to support@azonsolution.com.",
      ],
    },
    {
      heading: "7. Children",
      paragraphs: [
        "The Service is intended for workers aged 15 and older under Vietnamese Labor Law. We do not knowingly collect data from children under 13.",
      ],
    },
    {
      heading: "8. Changes",
      paragraphs: [
        "We may update this Policy from time to time. The new version will be posted here, and (for material changes) we will notify Users in-app.",
      ],
    },
    {
      heading: "9. Contact",
      paragraphs: ["For privacy questions please contact:"],
      bullets: [
        "Email: support@azonsolution.com",
        "Hotline: +84 329 300 677",
        "Address: Ho Chi Minh City, Vietnam",
      ],
    },
  ],
};

const TERMS_VI: LegalDoc = {
  title: "Điều khoản & Điều kiện sử dụng",
  updatedLabel: "Cập nhật lần cuối",
  updatedDate: "15/05/2026",
  intro:
    "Vui lòng đọc kỹ Điều khoản & Điều kiện sử dụng này trước khi đăng ký tài khoản và sử dụng nền tảng AZON. Việc bạn tạo tài khoản, đăng nhập hoặc tiếp tục sử dụng Dịch vụ đồng nghĩa với việc bạn chấp nhận đầy đủ các điều khoản dưới đây.",
  sections: [
    {
      heading: "1. Định nghĩa",
      bullets: [
        "\"AZON\", \"chúng tôi\" — nền tảng quản lý nhân sự AZON và đơn vị vận hành.",
        "\"Dịch vụ\" — toàn bộ tính năng web và ứng dụng di động AZON.",
        "\"Người dùng\" — cá nhân sử dụng Dịch vụ, bao gồm quản trị viên doanh nghiệp và nhân viên.",
        "\"Doanh nghiệp\" / \"Tenant\" — tổ chức đăng ký sử dụng Dịch vụ.",
      ],
    },
    {
      heading: "2. Tài khoản",
      bullets: [
        "Người dùng tự chịu trách nhiệm về tính chính xác của thông tin đăng ký.",
        "Bảo mật mật khẩu, không chia sẻ tài khoản; mọi hoạt động dưới tài khoản được xem như do chính chủ tài khoản thực hiện.",
        "Doanh nghiệp chịu trách nhiệm về việc cấp/thu hồi quyền truy cập của nhân viên.",
      ],
    },
    {
      heading: "3. Hành vi bị cấm",
      paragraphs: ["Người dùng cam kết KHÔNG:"],
      bullets: [
        "Sử dụng Dịch vụ vào mục đích vi phạm pháp luật Việt Nam.",
        "Cố ý gian lận chấm công, giả mạo vị trí, sinh trắc học hoặc danh tính.",
        "Truy cập trái phép vào tài khoản, dữ liệu của người khác hoặc của tenant khác.",
        "Sao chép, đảo ngược kỹ thuật, can thiệp mã nguồn của Dịch vụ.",
        "Phát tán mã độc, tấn công gây gián đoạn hệ thống.",
        "Tải lên nội dung vi phạm bản quyền, khiêu dâm, bạo lực, xúc phạm.",
      ],
    },
    {
      heading: "4. Quyền sở hữu trí tuệ",
      paragraphs: [
        "Toàn bộ giao diện, mã nguồn, thương hiệu, logo, tài liệu của AZON thuộc sở hữu của chúng tôi và được bảo hộ theo pháp luật. Người dùng chỉ được sử dụng trong phạm vi quyền sử dụng Dịch vụ.",
        "Dữ liệu do doanh nghiệp/nhân viên tải lên (\"Nội dung của Người dùng\") thuộc sở hữu của doanh nghiệp đó. AZON chỉ xử lý theo phạm vi cần thiết để cung cấp Dịch vụ.",
      ],
    },
    {
      heading: "5. Gói dịch vụ & thanh toán",
      bullets: [
        "Gói Miễn Phí áp dụng cho doanh nghiệp dưới 5 nhân viên, không giới hạn thời gian.",
        "Các gói trả phí được thông báo giá cụ thể trước khi ký hợp đồng/đăng ký.",
        "Phí đã thanh toán không được hoàn lại, trừ khi có thỏa thuận khác bằng văn bản.",
        "Chậm thanh toán có thể dẫn đến tạm ngừng tính năng nâng cao.",
      ],
    },
    {
      heading: "6. Tính khả dụng & SLA",
      bullets: [
        "Chúng tôi nỗ lực duy trì Dịch vụ hoạt động liên tục, mục tiêu uptime 99,9% (gói Doanh nghiệp).",
        "Chúng tôi có thể tạm ngừng để bảo trì với thông báo trước hợp lý.",
        "Dịch vụ được cung cấp \"nguyên trạng\" (as is) trong giới hạn cho phép của pháp luật.",
      ],
    },
    {
      heading: "7. Giới hạn trách nhiệm",
      paragraphs: [
        "Trong phạm vi tối đa pháp luật cho phép, AZON không chịu trách nhiệm về các thiệt hại gián tiếp, mất lợi nhuận, mất cơ hội kinh doanh, hư hỏng dữ liệu do nguyên nhân ngoài ý muốn (bất khả kháng, lỗi của nhà cung cấp bên thứ ba, hành vi của Người dùng).",
        "Tổng trách nhiệm bồi thường (nếu có) không vượt quá tổng phí Người dùng/Doanh nghiệp đã trả cho AZON trong 12 tháng liền kề.",
      ],
    },
    {
      heading: "8. Tạm ngừng & chấm dứt",
      bullets: [
        "Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài khoản vi phạm Điều khoản này.",
        "Người dùng có thể chấm dứt sử dụng bất cứ lúc nào; dữ liệu sẽ được giữ theo nghĩa vụ pháp lý của Doanh nghiệp.",
      ],
    },
    {
      heading: "9. Luật áp dụng & giải quyết tranh chấp",
      paragraphs: [
        "Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp ưu tiên giải quyết bằng thương lượng; nếu không đạt thỏa thuận, sẽ được giải quyết tại Tòa án có thẩm quyền tại TP. Hồ Chí Minh.",
      ],
    },
    {
      heading: "10. Thay đổi điều khoản",
      paragraphs: [
        "AZON có thể cập nhật Điều khoản. Phiên bản mới có hiệu lực kể từ ngày công bố tại trang này. Việc tiếp tục sử dụng Dịch vụ đồng nghĩa với việc chấp nhận bản cập nhật.",
      ],
    },
    {
      heading: "11. Liên hệ",
      bullets: [
        "Email: support@azonsolution.com",
        "Hotline: +84 329 300 677",
        "Địa chỉ: TP. Hồ Chí Minh, Việt Nam",
      ],
    },
  ],
};

const TERMS_EN: LegalDoc = {
  title: "Terms & Conditions",
  updatedLabel: "Last updated",
  updatedDate: "May 15, 2026",
  intro:
    "Please read these Terms & Conditions carefully before registering and using the AZON platform. By creating an account, signing in, or continuing to use the Service, you accept all the terms below.",
  sections: [
    {
      heading: "1. Definitions",
      bullets: [
        "\"AZON\", \"we\", \"us\" — the AZON HR platform and its operating entity.",
        "\"Service\" — all features of AZON web and mobile applications.",
        "\"User\" — any individual using the Service, including company admins and employees.",
        "\"Company\" / \"Tenant\" — the organization subscribing to the Service.",
      ],
    },
    {
      heading: "2. Account",
      bullets: [
        "Users are responsible for the accuracy of registration information.",
        "Keep passwords confidential; do not share accounts. All actions taken under an account are deemed performed by its owner.",
        "The Company is responsible for granting/revoking employee access.",
      ],
    },
    {
      heading: "3. Prohibited conduct",
      paragraphs: ["Users agree NOT to:"],
      bullets: [
        "Use the Service for purposes that violate Vietnamese law.",
        "Falsify attendance, spoof location, biometric data, or identity.",
        "Access without authorization other users' or tenants' data.",
        "Copy, reverse-engineer, or tamper with the Service's source code.",
        "Distribute malware or attack the platform's availability.",
        "Upload content infringing copyright, or content that is obscene, violent, or abusive.",
      ],
    },
    {
      heading: "4. Intellectual property",
      paragraphs: [
        "All UI, source code, trademarks, logos, and documentation of AZON are owned by us and protected by law. Users may use them only within the scope of their right to use the Service.",
        "Data uploaded by the Company/employees (\"User Content\") belongs to that Company. AZON processes it only as needed to deliver the Service.",
      ],
    },
    {
      heading: "5. Plans & payment",
      bullets: [
        "The Free plan is available for companies with under 5 employees, with no time limit.",
        "Paid plans are quoted before contract signing or subscription.",
        "Paid fees are non-refundable unless otherwise agreed in writing.",
        "Late payment may result in suspension of premium features.",
      ],
    },
    {
      heading: "6. Availability & SLA",
      bullets: [
        "We strive to keep the Service continuously available, targeting 99.9% uptime (Enterprise plan).",
        "We may temporarily suspend the Service for maintenance with reasonable notice.",
        "The Service is provided \"as is\" to the extent permitted by law.",
      ],
    },
    {
      heading: "7. Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by law, AZON is not liable for indirect damages, lost profits, lost business opportunity, or data corruption caused by force majeure, third-party providers, or User actions.",
        "Total aggregate liability (if any) will not exceed the total fees paid to AZON by the User/Company in the preceding 12 months.",
      ],
    },
    {
      heading: "8. Suspension & termination",
      bullets: [
        "We may suspend or terminate accounts that violate these Terms.",
        "Users may stop using the Service at any time; data will be retained per the Company's legal obligations.",
      ],
    },
    {
      heading: "9. Governing law & disputes",
      paragraphs: [
        "These Terms are governed by Vietnamese law. Disputes will first be resolved by negotiation; failing that, by the competent court in Ho Chi Minh City.",
      ],
    },
    {
      heading: "10. Changes",
      paragraphs: [
        "AZON may update these Terms. The new version is effective from its publication date on this page. Continued use of the Service constitutes acceptance.",
      ],
    },
    {
      heading: "11. Contact",
      bullets: [
        "Email: support@azonsolution.com",
        "Hotline: +84 329 300 677",
        "Address: Ho Chi Minh City, Vietnam",
      ],
    },
  ],
};

export function getPrivacy(locale: string): LegalDoc {
  return locale === "en" ? PRIVACY_EN : PRIVACY_VI;
}

export function getTerms(locale: string): LegalDoc {
  return locale === "en" ? TERMS_EN : TERMS_VI;
}
