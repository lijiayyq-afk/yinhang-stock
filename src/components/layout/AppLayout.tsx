import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ paddingLeft: "var(--sidebar-width)", minHeight: "100vh" }}>
            <Sidebar />
            <main className="container" style={{ padding: "2rem 1rem" }}>
                {children}
            </main>
        </div>
    );
}
