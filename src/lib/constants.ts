import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Clock,
  CalendarX,
  Banknote,
  UserCircle,
  BarChart3,
  User,
  MapPin,
  Wallet,
  CalendarCheck,
  Calendar,
  Shield,
  Lock,
  Globe,
  Fingerprint,
  CalendarDays,
  Timer,
  Receipt,
  FolderOpen,
  Bell,
} from "lucide-react";

export const NAV_LINKS = [
  { key: "features", href: "/#features" },
  { key: "pricing", href: "/#pricing" },
  { key: "blog", href: "/blog" },
];

export const FEATURES = [
  { key: "dashboard", icon: LayoutDashboard },
  { key: "organization", icon: Building2 },
  { key: "hr", icon: Users },
  { key: "contract", icon: FileText },
  { key: "timekeeping", icon: Clock },
  { key: "leave", icon: CalendarX },
  { key: "payroll", icon: Banknote },
  { key: "ess", icon: UserCircle },
  { key: "reports", icon: BarChart3 },
];

export const DEEP_DIVE_BLOCKS = [
  { key: "hr", icon: Users },
  { key: "contract", icon: FileText },
  { key: "timekeeping", icon: Clock },
  { key: "payroll", icon: Banknote },
];

export const ESS_FEATURES = [
  { key: "profile", icon: User },
  { key: "checkIn", icon: MapPin },
  { key: "leave", icon: CalendarX },
  { key: "payslip", icon: Wallet },
  { key: "timesheet", icon: CalendarCheck },
  { key: "overtime", icon: Clock },
  { key: "schedule", icon: Calendar },
  { key: "contract", icon: FileText },
];

export const APP_FEATURES = [
  { key: "smartCheckIn", icon: Fingerprint, hasSubtitle: true },
  { key: "scheduleLeave", icon: CalendarDays },
  { key: "overtime", icon: Timer },
  { key: "payroll", icon: Receipt },
  { key: "documents", icon: FolderOpen },
  { key: "notifications", icon: Bell },
];

export const DIFFERENTIATORS = [
  { key: "multiTenant", icon: Shield },
  { key: "permissions", icon: Lock },
  { key: "multilingual", icon: Globe },
];
