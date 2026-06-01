"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ScreenSlider from "@/components/ui/ScreenSlider";
import { DEEP_DIVE_BLOCKS } from "@/lib/constants";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type FeatureScreensMap = Record<
  string,
  {
    screens: Parameters<typeof ScreenSlider>[0]["screens"];
    badges: Parameters<typeof ScreenSlider>[0]["badges"];
  }
>;

/* ── Vietnamese screen data (default locale) ── */
const FEATURE_SCREENS_VI: FeatureScreensMap = {
  hr: {
    screens: [
      {
        title: "Danh sách nhân viên",
        breadcrumb: "Nhân sự › Quản lý nhân sự › Danh sách nhân viên",
        headers: ["MÃ NV", "HỌ VÀ TÊN", "GIỚI TÍNH", "EMAIL LIÊN HỆ", "SĐT", "NGÀY SINH"],
        rows: [
          { cells: ["NVTEST-2010", "NVTEST 2010", "Nam", "nvtest2010@yopmail.com", "–", "01/04/2026"] },
          { cells: ["admin-check", "admin-check", "–", "admincheck@yopmail.com", "–", "–"] },
          { cells: ["check-79", "check", "–", "check@yopmail.com", "–", "–"] },
          { cells: ["HRTEST-01", "Nhân Sự 01", "–", "hrtest01@yopmail.com", "–", "08/04/2026"] },
          { cells: ["minhpro", "Mingg", "–", "ming@gmail.com", "0975949121", "05/11/2000"] },
          { cells: ["KIEN2", "Kiên 2", "–", "kien@gmail.com", "0778714060", "30/08/2001"] },
        ],
      },
      {
        title: "Giai đoạn làm việc",
        breadcrumb: "Nhân sự › Quản lý nhân sự › Giai đoạn làm việc",
        headers: ["NHÂN VIÊN", "NGÀY VÀO", "CHI NHÁNH", "PHÒNG BAN", "CHỨC DANH", "TRẠNG THÁI"],
        rows: [
          { cells: ["NVTEST 2010", "16/04/2026", "FT quận 7", "FT Test", "Developer", "Đang làm"], status: "green" },
          { cells: ["admin-check", "16/04/2026", "FT quận 7", "FT Test", "Developer", "Đang làm"], status: "green" },
          { cells: ["check", "14/04/2026", "FT quận 7", "Kế toán", "GĐ Điều Hành", "Đang làm"], status: "green" },
          { cells: ["Nhân Sự 01", "14/04/2026", "FT quận 7", "FT Test", "HR", "Đang làm"], status: "green" },
          { cells: ["Ban LĐ 01", "14/04/2026", "FT quận 7", "FT Test", "GĐ Điều Hành", "Đang làm"], status: "green" },
          { cells: ["Mingg", "10/04/2026", "FutureTech", "Ăn chơi", "Developer", "Đang làm"], status: "green" },
        ],
      },
      {
        title: "Khen thưởng & Kỷ luật",
        breadcrumb: "Nhân sự › Quản lý nhân sự › Khen thưởng / Kỷ luật",
        headers: ["LOẠI", "NHÂN VIÊN", "NGÀY HIỆU LỰC", "HÌNH THỨC", "SỐ TIỀN", "NGƯỜI TẠO"],
        rows: [
          { cells: ["Kỷ luật", "Nhân Viên Test – NV01", "14/03/2026", "–", "200.000 đ", "admin"], status: "red" },
          { cells: ["Kỷ luật", "Nhân Viên 02 – nv02", "13/02/2026", "–", "–", "admin"], status: "red" },
          { cells: ["Khen thưởng", "Nhân Viên Test – NV01", "13/02/2026", "–", "–", "admin"], status: "green" },
        ],
      },
      {
        title: "Đề xuất tăng lương",
        breadcrumb: "Nhân sự › Quản lý nhân sự › Đề xuất tăng lương",
        headers: ["NHÂN VIÊN", "PHÒNG BAN", "LƯƠNG HIỆN TẠI", "LƯƠNG ĐỀ XUẤT", "LÝ DO", "TRẠNG THÁI"],
        rows: [
          { cells: ["Nhân Viên Test", "FT Test", "12.000.000đ", "15.000.000đ", "Hiệu suất tốt", "Chờ duyệt"], status: "orange" },
          { cells: ["Mingg", "Ăn chơi", "10.000.000đ", "12.500.000đ", "Hoàn thành KPI", "Đã duyệt"], status: "green" },
          { cells: ["Kiên 2", "Nhân Sự 1", "8.000.000đ", "9.500.000đ", "Thâm niên", "Chờ duyệt"], status: "orange" },
          { cells: ["kien123", "Nhân Sự 1", "9.000.000đ", "11.000.000đ", "Đánh giá A+", "Từ chối"], status: "red" },
        ],
      },
      {
        title: "Người phụ thuộc",
        breadcrumb: "Nhân sự › Quản lý nhân sự › Người phụ thuộc",
        headers: ["NHÂN VIÊN", "HỌ TÊN NPT", "QUAN HỆ", "NGÀY SINH", "SỐ CMND/CCCD", "TRẠNG THÁI"],
        rows: [
          { cells: ["Nhân Viên Test", "Nguyễn Văn A", "Con", "15/06/2018", "–", "Đang hiệu lực"], status: "green" },
          { cells: ["Nhân Viên Test", "Trần Thị B", "Vợ/Chồng", "22/03/1995", "079123456789", "Đang hiệu lực"], status: "green" },
          { cells: ["Mingg", "Lê Văn C", "Bố/Mẹ", "10/01/1960", "024987654321", "Đang hiệu lực"], status: "green" },
          { cells: ["Kiên 2", "Phạm Thị D", "Con", "01/09/2020", "–", "Chờ xác nhận"], status: "orange" },
        ],
      },
    ],
    badges: [
      { label: "Tổng nhân viên", value: "1,247", color: "from-primary-400 to-primary-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Đang làm việc", value: "1,189", color: "from-emerald-400 to-emerald-500", position: "top-[40%] -left-5", floatDuration: 4.5 },
      { label: "Đề xuất tăng lương", value: "23 chờ duyệt", color: "from-amber-400 to-orange-500", position: "-bottom-4 -right-2", floatDuration: 5 },
    ],
  },

  contract: {
    screens: [
      {
        title: "Danh sách hợp đồng",
        breadcrumb: "Nhân sự › Hợp đồng lao động › Danh sách hợp đồng",
        headers: ["SỐ HỢP ĐỒNG", "NHÂN VIÊN", "LOẠI HĐ", "NGÀY BẮT ĐẦU", "NGÀY KẾT THÚC", "TRẠNG THÁI"],
        rows: [
          { cells: ["HD-2026-001", "Nhân Viên Test", "Chính thức", "01/01/2026", "31/12/2026", "Có hiệu lực"], status: "green" },
          { cells: ["HD-2026-002", "Mingg", "Thử việc", "10/04/2026", "10/06/2026", "Có hiệu lực"], status: "green" },
          { cells: ["HD-2026-003", "Kiên 2", "Chính thức", "01/03/2026", "28/02/2027", "Có hiệu lực"], status: "green" },
          { cells: ["HD-2025-015", "Ban LĐ 01", "Vô thời hạn", "01/06/2025", "–", "Có hiệu lực"], status: "green" },
          { cells: ["HD-2025-008", "Nhân Viên 02", "Thời vụ", "01/11/2025", "31/01/2026", "Hết hạn"], status: "red" },
        ],
      },
      {
        title: "Mẫu hợp đồng",
        breadcrumb: "Nhân sự › Hợp đồng lao động › Mẫu hợp đồng",
        headers: ["TÊN MẪU", "LOẠI HĐ", "BIẾN SỐ", "NGÀY TẠO", "CẬP NHẬT", "TRẠNG THÁI"],
        rows: [
          { cells: ["HĐ Chính thức v2", "Xác định thời hạn", "12 biến", "01/01/2026", "15/03/2026", "Active"], status: "green" },
          { cells: ["HĐ Thử việc", "Thử việc", "8 biến", "01/01/2026", "01/01/2026", "Active"], status: "green" },
          { cells: ["HĐ Thời vụ", "Thời vụ", "10 biến", "15/02/2026", "15/02/2026", "Active"], status: "green" },
          { cells: ["HĐ Dự án", "Theo dự án", "14 biến", "01/03/2026", "20/03/2026", "Draft"], status: "orange" },
        ],
      },
    ],
    badges: [
      { label: "Hợp đồng hiệu lực", value: "892", color: "from-primary-400 to-primary-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Sắp hết hạn", value: "15 HĐ", color: "from-amber-400 to-orange-500", position: "-bottom-4 -left-3", floatDuration: 5 },
    ],
  },

  timekeeping: {
    screens: [
      {
        title: "Bảng chấm công",
        breadcrumb: "Nhân sự › Chấm công & Ca làm việc › Bảng chấm công",
        headers: ["TÊN NV", "MÃ NV", "CHI NHÁNH", "PHÒNG BAN", "ĐÃ ĐI LÀM", "TỔNG GIỜ"],
        rows: [
          { cells: ["admin", "admin", "FutureTech", "Lãnh Đạo", "0/20 ngày", "0h/0h"], status: "red" },
          { cells: ["Kiên 2", "KIEN2", "FutureTech", "Nhân Sự 1", "15/15 ngày", "120h 54m"], status: "green" },
          { cells: ["kien123", "kienpro", "FutureTech", "Nhân Sự 1", "18/20 ngày", "142h 30m"], status: "green" },
          { cells: ["Mingg", "minhpro", "FutureTech", "Ăn chơi", "20/20 ngày", "170h 15m"], status: "green" },
          { cells: ["Kien Tran", "NV Dev", "FutureTech", "Nhân Sự 1", "16/16 ngày", "135h 20m"], status: "green" },
        ],
      },
      {
        title: "Quản lý ca làm việc",
        breadcrumb: "Nhân sự › Chấm công & Ca làm việc › Ca làm việc",
        headers: ["TÊN CA", "GIỜ BẮT ĐẦU", "GIỜ KẾT THÚC", "GIỜ NGHỈ", "TỔNG GIỜ", "TRẠNG THÁI"],
        rows: [
          { cells: ["Ca sáng", "08:00", "12:00", "–", "4h", "Active"], status: "green" },
          { cells: ["Ca chiều", "13:00", "17:00", "–", "4h", "Active"], status: "green" },
          { cells: ["Ca hành chính", "08:00", "17:00", "12:00-13:00", "8h", "Active"], status: "green" },
          { cells: ["Ca đêm", "22:00", "06:00", "02:00-02:30", "7.5h", "Active"], status: "green" },
          { cells: ["Ca linh hoạt", "Tùy chọn", "Tùy chọn", "–", "8h", "Draft"], status: "orange" },
        ],
      },
      {
        title: "Đăng ký tăng ca",
        breadcrumb: "Nhân sự › Chấm công & Ca làm việc › Đăng ký tăng ca",
        headers: ["NHÂN VIÊN", "NGÀY", "CA GỐC", "GIỜ TĂNG CA", "SỐ GIỜ", "TRẠNG THÁI"],
        rows: [
          { cells: ["Kiên 2", "15/04/2026", "Ca hành chính", "17:00 - 20:00", "3h", "Đã duyệt"], status: "green" },
          { cells: ["Mingg", "14/04/2026", "Ca sáng", "12:00 - 14:00", "2h", "Đã duyệt"], status: "green" },
          { cells: ["Kien Tran", "16/04/2026", "Ca hành chính", "17:00 - 19:00", "2h", "Chờ duyệt"], status: "orange" },
          { cells: ["admin-check", "16/04/2026", "Ca chiều", "17:00 - 21:00", "4h", "Từ chối"], status: "red" },
        ],
      },
    ],
    badges: [
      { label: "Đi làm hôm nay", value: "1,189 / 1,247", color: "from-emerald-400 to-emerald-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Tăng ca tháng này", value: "356 lượt", color: "from-primary-400 to-primary-500", position: "top-[45%] -left-5", floatDuration: 4.5 },
      { label: "Đi trễ", value: "12 NV", color: "from-rose-400 to-red-500", position: "-bottom-4 -right-2", floatDuration: 5 },
    ],
  },

  payroll: {
    screens: [
      {
        title: "Bảng lương tháng 04/2026",
        breadcrumb: "Nhân sự › Lương & Thu nhập › Bảng lương",
        headers: ["NHÂN VIÊN", "LƯƠNG CB", "PHỤ CẤP", "BHXH", "THUẾ TNCN", "THỰC NHẬN"],
        rows: [
          { cells: ["Nhân Viên Test", "15.000.000", "2.500.000", "1.575.000", "750.000", "15.175.000"], status: "green" },
          { cells: ["Mingg", "12.000.000", "1.500.000", "1.260.000", "350.000", "11.890.000"], status: "green" },
          { cells: ["Kiên 2", "9.500.000", "1.000.000", "997.500", "0", "9.502.500"], status: "green" },
          { cells: ["Ban LĐ 01", "25.000.000", "5.000.000", "2.625.000", "2.100.000", "25.275.000"], status: "green" },
          { cells: ["kien123", "11.000.000", "1.500.000", "1.155.000", "200.000", "11.145.000"], status: "green" },
        ],
      },
      {
        title: "Lịch sử tăng lương",
        breadcrumb: "Nhân sự › Lương & Thu nhập › Lịch sử tăng lương",
        headers: ["NHÂN VIÊN", "LƯƠNG CŨ", "LƯƠNG MỚI", "TĂNG", "NGÀY ÁP DỤNG", "LOẠI"],
        rows: [
          { cells: ["Nhân Viên Test", "12.000.000", "15.000.000", "+25%", "01/04/2026", "Đề xuất"], status: "green" },
          { cells: ["Mingg", "10.000.000", "12.000.000", "+20%", "01/03/2026", "Định kỳ"], status: "green" },
          { cells: ["Kiên 2", "8.000.000", "9.500.000", "+18.7%", "01/01/2026", "Đề xuất"], status: "green" },
          { cells: ["Ban LĐ 01", "22.000.000", "25.000.000", "+13.6%", "01/01/2026", "Định kỳ"], status: "green" },
        ],
      },
    ],
    badges: [
      { label: "Tổng quỹ lương", value: "2.4 tỷ/tháng", color: "from-primary-400 to-primary-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "NV đã nhận lương", value: "1,189 / 1,247", color: "from-emerald-400 to-emerald-500", position: "-bottom-4 -left-3", floatDuration: 5 },
    ],
  },
};

/* ── English screen data ── */
const FEATURE_SCREENS_EN: FeatureScreensMap = {
  hr: {
    screens: [
      {
        title: "Employee directory",
        breadcrumb: "HR › Workforce › Employee directory",
        headers: ["ID", "FULL NAME", "GENDER", "EMAIL", "PHONE", "DATE OF BIRTH"],
        rows: [
          { cells: ["NVTEST-2010", "NVTEST 2010", "Male", "nvtest2010@yopmail.com", "–", "01/04/2026"] },
          { cells: ["admin-check", "admin-check", "–", "admincheck@yopmail.com", "–", "–"] },
          { cells: ["check-79", "check", "–", "check@yopmail.com", "–", "–"] },
          { cells: ["HRTEST-01", "HR 01", "–", "hrtest01@yopmail.com", "–", "08/04/2026"] },
          { cells: ["minhpro", "Mingg", "–", "ming@gmail.com", "0975949121", "05/11/2000"] },
          { cells: ["KIEN2", "Kien 2", "–", "kien@gmail.com", "0778714060", "30/08/2001"] },
        ],
      },
      {
        title: "Employment periods",
        breadcrumb: "HR › Workforce › Employment periods",
        headers: ["EMPLOYEE", "JOIN DATE", "BRANCH", "DEPARTMENT", "TITLE", "STATUS"],
        rows: [
          { cells: ["NVTEST 2010", "16/04/2026", "FT District 7", "FT Test", "Developer", "Active"], status: "green" },
          { cells: ["admin-check", "16/04/2026", "FT District 7", "FT Test", "Developer", "Active"], status: "green" },
          { cells: ["check", "14/04/2026", "FT District 7", "Accounting", "Operating Director", "Active"], status: "green" },
          { cells: ["HR 01", "14/04/2026", "FT District 7", "FT Test", "HR", "Active"], status: "green" },
          { cells: ["Leader 01", "14/04/2026", "FT District 7", "FT Test", "Operating Director", "Active"], status: "green" },
          { cells: ["Mingg", "10/04/2026", "FutureTech", "Lifestyle", "Developer", "Active"], status: "green" },
        ],
      },
      {
        title: "Rewards & Discipline",
        breadcrumb: "HR › Workforce › Rewards / Discipline",
        headers: ["TYPE", "EMPLOYEE", "EFFECTIVE DATE", "FORM", "AMOUNT", "CREATED BY"],
        rows: [
          { cells: ["Discipline", "Test Employee – NV01", "14/03/2026", "–", "200,000 đ", "admin"], status: "red" },
          { cells: ["Discipline", "Employee 02 – nv02", "13/02/2026", "–", "–", "admin"], status: "red" },
          { cells: ["Reward", "Test Employee – NV01", "13/02/2026", "–", "–", "admin"], status: "green" },
        ],
      },
      {
        title: "Salary raise proposals",
        breadcrumb: "HR › Workforce › Salary raise proposals",
        headers: ["EMPLOYEE", "DEPARTMENT", "CURRENT SALARY", "PROPOSED", "REASON", "STATUS"],
        rows: [
          { cells: ["Test Employee", "FT Test", "12,000,000đ", "15,000,000đ", "Strong performance", "Pending"], status: "orange" },
          { cells: ["Mingg", "Lifestyle", "10,000,000đ", "12,500,000đ", "KPI completed", "Approved"], status: "green" },
          { cells: ["Kien 2", "HR 1", "8,000,000đ", "9,500,000đ", "Tenure", "Pending"], status: "orange" },
          { cells: ["kien123", "HR 1", "9,000,000đ", "11,000,000đ", "A+ rating", "Rejected"], status: "red" },
        ],
      },
      {
        title: "Dependents",
        breadcrumb: "HR › Workforce › Dependents",
        headers: ["EMPLOYEE", "DEPENDENT NAME", "RELATIONSHIP", "DATE OF BIRTH", "ID NUMBER", "STATUS"],
        rows: [
          { cells: ["Test Employee", "Nguyen Van A", "Child", "15/06/2018", "–", "Active"], status: "green" },
          { cells: ["Test Employee", "Tran Thi B", "Spouse", "22/03/1995", "079123456789", "Active"], status: "green" },
          { cells: ["Mingg", "Le Van C", "Parent", "10/01/1960", "024987654321", "Active"], status: "green" },
          { cells: ["Kien 2", "Pham Thi D", "Child", "01/09/2020", "–", "Pending confirmation"], status: "orange" },
        ],
      },
    ],
    badges: [
      { label: "Total employees", value: "1,247", color: "from-primary-400 to-primary-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Currently working", value: "1,189", color: "from-emerald-400 to-emerald-500", position: "top-[40%] -left-5", floatDuration: 4.5 },
      { label: "Raise proposals", value: "23 pending", color: "from-amber-400 to-orange-500", position: "-bottom-4 -right-2", floatDuration: 5 },
    ],
  },

  contract: {
    screens: [
      {
        title: "Contract list",
        breadcrumb: "HR › Labor contracts › Contract list",
        headers: ["CONTRACT NO.", "EMPLOYEE", "TYPE", "START DATE", "END DATE", "STATUS"],
        rows: [
          { cells: ["HD-2026-001", "Test Employee", "Permanent", "01/01/2026", "31/12/2026", "Active"], status: "green" },
          { cells: ["HD-2026-002", "Mingg", "Probation", "10/04/2026", "10/06/2026", "Active"], status: "green" },
          { cells: ["HD-2026-003", "Kien 2", "Permanent", "01/03/2026", "28/02/2027", "Active"], status: "green" },
          { cells: ["HD-2025-015", "Leader 01", "Indefinite", "01/06/2025", "–", "Active"], status: "green" },
          { cells: ["HD-2025-008", "Employee 02", "Seasonal", "01/11/2025", "31/01/2026", "Expired"], status: "red" },
        ],
      },
      {
        title: "Contract templates",
        breadcrumb: "HR › Labor contracts › Templates",
        headers: ["TEMPLATE", "TYPE", "VARIABLES", "CREATED", "UPDATED", "STATUS"],
        rows: [
          { cells: ["Permanent v2", "Fixed-term", "12 vars", "01/01/2026", "15/03/2026", "Active"], status: "green" },
          { cells: ["Probation", "Probation", "8 vars", "01/01/2026", "01/01/2026", "Active"], status: "green" },
          { cells: ["Seasonal", "Seasonal", "10 vars", "15/02/2026", "15/02/2026", "Active"], status: "green" },
          { cells: ["Project-based", "Per project", "14 vars", "01/03/2026", "20/03/2026", "Draft"], status: "orange" },
        ],
      },
    ],
    badges: [
      { label: "Active contracts", value: "892", color: "from-primary-400 to-primary-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Expiring soon", value: "15 contracts", color: "from-amber-400 to-orange-500", position: "-bottom-4 -left-3", floatDuration: 5 },
    ],
  },

  timekeeping: {
    screens: [
      {
        title: "Attendance sheet",
        breadcrumb: "HR › Attendance & Shifts › Attendance sheet",
        headers: ["NAME", "ID", "BRANCH", "DEPARTMENT", "WORKED", "TOTAL HOURS"],
        rows: [
          { cells: ["admin", "admin", "FutureTech", "Leadership", "0/20 days", "0h/0h"], status: "red" },
          { cells: ["Kien 2", "KIEN2", "FutureTech", "HR 1", "15/15 days", "120h 54m"], status: "green" },
          { cells: ["kien123", "kienpro", "FutureTech", "HR 1", "18/20 days", "142h 30m"], status: "green" },
          { cells: ["Mingg", "minhpro", "FutureTech", "Lifestyle", "20/20 days", "170h 15m"], status: "green" },
          { cells: ["Kien Tran", "NV Dev", "FutureTech", "HR 1", "16/16 days", "135h 20m"], status: "green" },
        ],
      },
      {
        title: "Shift management",
        breadcrumb: "HR › Attendance & Shifts › Shifts",
        headers: ["SHIFT", "START", "END", "BREAK", "TOTAL", "STATUS"],
        rows: [
          { cells: ["Morning", "08:00", "12:00", "–", "4h", "Active"], status: "green" },
          { cells: ["Afternoon", "13:00", "17:00", "–", "4h", "Active"], status: "green" },
          { cells: ["Office hours", "08:00", "17:00", "12:00-13:00", "8h", "Active"], status: "green" },
          { cells: ["Night", "22:00", "06:00", "02:00-02:30", "7.5h", "Active"], status: "green" },
          { cells: ["Flexible", "Custom", "Custom", "–", "8h", "Draft"], status: "orange" },
        ],
      },
      {
        title: "Overtime requests",
        breadcrumb: "HR › Attendance & Shifts › Overtime requests",
        headers: ["EMPLOYEE", "DATE", "BASE SHIFT", "OT HOURS", "DURATION", "STATUS"],
        rows: [
          { cells: ["Kien 2", "15/04/2026", "Office hours", "17:00 - 20:00", "3h", "Approved"], status: "green" },
          { cells: ["Mingg", "14/04/2026", "Morning", "12:00 - 14:00", "2h", "Approved"], status: "green" },
          { cells: ["Kien Tran", "16/04/2026", "Office hours", "17:00 - 19:00", "2h", "Pending"], status: "orange" },
          { cells: ["admin-check", "16/04/2026", "Afternoon", "17:00 - 21:00", "4h", "Rejected"], status: "red" },
        ],
      },
    ],
    badges: [
      { label: "On duty today", value: "1,189 / 1,247", color: "from-emerald-400 to-emerald-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Overtime this month", value: "356 entries", color: "from-primary-400 to-primary-500", position: "top-[45%] -left-5", floatDuration: 4.5 },
      { label: "Late arrivals", value: "12 employees", color: "from-rose-400 to-red-500", position: "-bottom-4 -right-2", floatDuration: 5 },
    ],
  },

  payroll: {
    screens: [
      {
        title: "Payroll · April 2026",
        breadcrumb: "HR › Payroll & Income › Payroll",
        headers: ["EMPLOYEE", "BASE", "ALLOWANCE", "INSURANCE", "INCOME TAX", "NET PAY"],
        rows: [
          { cells: ["Test Employee", "15,000,000", "2,500,000", "1,575,000", "750,000", "15,175,000"], status: "green" },
          { cells: ["Mingg", "12,000,000", "1,500,000", "1,260,000", "350,000", "11,890,000"], status: "green" },
          { cells: ["Kien 2", "9,500,000", "1,000,000", "997,500", "0", "9,502,500"], status: "green" },
          { cells: ["Leader 01", "25,000,000", "5,000,000", "2,625,000", "2,100,000", "25,275,000"], status: "green" },
          { cells: ["kien123", "11,000,000", "1,500,000", "1,155,000", "200,000", "11,145,000"], status: "green" },
        ],
      },
      {
        title: "Raise history",
        breadcrumb: "HR › Payroll & Income › Raise history",
        headers: ["EMPLOYEE", "PREVIOUS", "NEW", "DELTA", "EFFECTIVE", "TYPE"],
        rows: [
          { cells: ["Test Employee", "12,000,000", "15,000,000", "+25%", "01/04/2026", "Proposal"], status: "green" },
          { cells: ["Mingg", "10,000,000", "12,000,000", "+20%", "01/03/2026", "Scheduled"], status: "green" },
          { cells: ["Kien 2", "8,000,000", "9,500,000", "+18.7%", "01/01/2026", "Proposal"], status: "green" },
          { cells: ["Leader 01", "22,000,000", "25,000,000", "+13.6%", "01/01/2026", "Scheduled"], status: "green" },
        ],
      },
    ],
    badges: [
      { label: "Total payroll", value: "2.4B / month", color: "from-primary-400 to-primary-500", position: "-top-5 -right-3", floatDuration: 4 },
      { label: "Employees paid", value: "1,189 / 1,247", color: "from-emerald-400 to-emerald-500", position: "-bottom-4 -left-3", floatDuration: 5 },
    ],
  },
};

export default function FeatureDeepDive() {
  const t = useTranslations("deepDive");
  const locale = useLocale();
  const FEATURE_SCREENS =
    locale === "en" ? FEATURE_SCREENS_EN : FEATURE_SCREENS_VI;
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="space-y-16 md:space-y-24">
          {DEEP_DIVE_BLOCKS.map((block, index) => {
            const imageLeft = index % 2 === 0;
            const sliderData = FEATURE_SCREENS[block.key];
            const title = t(`${block.key}.title`);
            const bullets = t.raw(`${block.key}.bullets`) as string[];

            return (
              <motion.div
                key={block.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className={`flex flex-col ${
                  imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-16 items-center`}
              >
                {/* Screenshot slider */}
                <div className="w-full lg:w-1/2">
                  {sliderData ? (
                    <ScreenSlider
                      screens={sliderData.screens}
                      badges={sliderData.badges}
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-2xl  flex items-center justify-center border border-gray-200">
                      <div className="text-center">
                        <block.icon className="w-12 h-12 text-primary-500/30 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">{title}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {title}
                  </h3>
                  <ul className="space-y-3">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
