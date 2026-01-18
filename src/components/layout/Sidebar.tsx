"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const MENU_ITEMS = [
    { label: "Dashboard", href: "/", icon: "🏠" },
    { label: "Calendar", href: "/calendar", icon: "📅" },
    { label: "Planner", href: "/planner", icon: "📝" },
    { label: "Life Journal", href: "/life", icon: "🌱" },
    { label: "Review", href: "/review", icon: "🔍" },
    { label: "Bank Stocks", href: "/bank-stocks", icon: "🏦" },
    { label: "Weather", href: "/weather", icon: "🌤️" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span>Efficiency Manual</span>
            </div>

            <nav className={styles.nav}>
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <div className={styles.userProfile}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>U</div>
                    <span>User</span>
                </div>
            </div>
        </aside>
    );
}
