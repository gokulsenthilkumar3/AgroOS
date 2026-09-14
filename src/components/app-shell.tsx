"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, Bell, Bot, Building2, ChevronDown, Cloud,
  DollarSign, Grid3X3, LayoutDashboard, Leaf, Newspaper,
  Package, Search, Settings, ShieldCheck, ShoppingBag,
  Sprout, Thermometer, Truck, Users, Warehouse,
} from "lucide-react";
import { CommandPalette } from "@/components/command-palette";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  roles?: string[];
};

const navigation: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/modules", label: "All modules", icon: Grid3X3 },
      { href: "/dashboard/farming", label: "Farming engine", icon: Sprout, roles: ["OWNER","MANAGER","FARM_MANAGER","SPECIALIST","OPERATOR","VIEWER"] },
      { href: "/dashboard/farms", label: "Farm registry", icon: Building2, roles: ["OWNER","MANAGER","FARM_MANAGER","OPERATOR","VIEWER"] },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/intelligence", label: "AI advisor", icon: Bot },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, roles: ["OWNER","MANAGER","FARM_MANAGER","SPECIALIST","ACCOUNTANT","VIEWER"] },
      { href: "/dashboard/telemetry", label: "IoT & sensors", icon: Thermometer },
      { href: "/dashboard/weather", label: "Weather", icon: Cloud },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
      { href: "/dashboard/cold-chain", label: "Logistics", icon: Truck },
      { href: "/dashboard/finance", label: "Finance", icon: DollarSign },
      { href: "/dashboard/market", label: "Market prices", icon: Package },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "/dashboard/news", label: "Agri news", icon: Newspaper },
      { href: "/dashboard/community", label: "Community", icon: Users },
      { href: "/dashboard/cold-chain", label: "Cold chain", icon: Warehouse },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/dashboard/admin", label: "Administration", icon: ShieldCheck, roles: ["PLATFORM_ADMIN","SUPPORT_AGENT","OWNER"] },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AppShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name: string; email: string; role: string };
}) {
  const pathname = usePathname();

  const filteredNav = navigation
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || item.roles.includes(user.role)
      ),
    }))
    .filter((group) => group.items.length > 0);

  const initials = user.name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <Link className="brand" href="/dashboard">
          <span className="brand-mark">
            <Leaf size={17} />
          </span>
          <span>
            AgroOS
            <small>Connected agriculture</small>
          </span>
        </Link>

        <button className="workspace-switcher">
          <span className="workspace-icon">GV</span>
          <span>
            <strong>Green Valley</strong>
            <small>Farm workspace</small>
          </span>
          <ChevronDown size={13} />
        </button>

        <nav aria-label="Primary navigation">
          {filteredNav.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={active ? "active" : ""}
                    key={item.href}
                    href={item.href}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="account">
          <span className="avatar">{initials}</span>
          <div>
            <strong>{user.name}</strong>
            <small>{user.role.replaceAll("_", " ").toLowerCase()}</small>
          </div>
          <form action="/api/auth/logout" method="post">
            <button type="submit" aria-label="Sign out" title="Sign out">
              ↗
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="workspace-main">
        <header className="topbar">
          <label className="command-search" htmlFor="global-search">
            <Search size={14} />
            <input
              id="global-search"
              aria-label="Search AgroOS"
              placeholder="Search farms, crops, orders…"
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className="top-actions">
            <span className="environment-badge">Live workspace</span>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={16} />
              <i />
            </button>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
