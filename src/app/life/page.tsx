"use client";
import React, { useState } from "react";

export default function LifePage() {
    const [activeTab, setActiveTab] = useState<"health" | "finance" | "relations">("health");

    return (
        <div>
            <h1 style={{ fontSize: "2rem", color: "var(--primary-900)", marginBottom: "2rem" }}>Life Journal</h1>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                {["health", "finance", "relations"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className="btn"
                        style={{
                            textTransform: "capitalize",
                            background: activeTab === tab ? "var(--primary-600)" : "white",
                            color: activeTab === tab ? "white" : "var(--text-secondary)",
                            border: "1px solid",
                            borderColor: activeTab === tab ? "var(--primary-600)" : "var(--border-light)"
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="card">
                {activeTab === "health" && (
                    <div>
                        <h2 style={{ marginBottom: "1.5rem" }}>Health & Vitality</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                            <div>
                                <label className="label">Weight Log</label>
                                <div style={{ height: "200px", background: "var(--gray-50)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    [Chart JS Placeholder: Weight Trend Down]
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div style={{ padding: "1rem", background: "#ecfdf5", borderRadius: "8px" }}>
                                    <strong>💡 Tip:</strong> Reduce processed foods to improve energy levels.
                                </div>
                                <div style={{ padding: "1rem", background: "#eff6ff", borderRadius: "8px" }}>
                                    <strong>💧 Water:</strong> You drank 1.2L today. Goal: 2.5L.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "finance" && (
                    <div>
                        <h2 style={{ marginBottom: "1.5rem" }}>Wealth & Desires</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                            <div>
                                <h3>Income vs Expenses (This Month)</h3>
                                <div style={{ marginTop: "1rem", fontSize: "2.5rem", fontWeight: 700, color: "var(--primary-700)" }}>
                                    + $4,200 <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>Net</span>
                                </div>
                                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                    <div style={{ flex: 1, padding: "1rem", background: "var(--gray-50)", borderRadius: "8px" }}>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>In</div>
                                        <div style={{ fontWeight: 600 }}>$8,400</div>
                                    </div>
                                    <div style={{ flex: 1, padding: "1rem", background: "var(--gray-50)", borderRadius: "8px" }}>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Out</div>
                                        <div style={{ fontWeight: 600 }}>$4,200</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3>Desire List (Wishlist)</h3>
                                <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
                                    <li style={{ marginBottom: "0.5rem" }}>New Ergonomic Chair <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>($400)</span></li>
                                    <li style={{ marginBottom: "0.5rem" }}>Trip to Kyoto <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>($2500)</span></li>
                                </ul>
                                <button className="btn btn-ghost" style={{ paddingLeft: 0, color: "var(--primary-600)" }}>+ Add Wish</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "relations" && (
                    <div>
                        <h2 style={{ marginBottom: "1.5rem" }}>Important Relationships</h2>
                        <div style={{ fontStyle: "italic", color: "var(--primary-800)", marginBottom: "2rem", padding: "1rem", background: "var(--primary-50)", borderRadius: "8px" }}>
                            "Instead of envying others, become the one who shines."
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                            {["Family", "Mentor", "Best Friend"].map(r => (
                                <div key={r} style={{ padding: "1rem", border: "1px solid var(--border-light)", borderRadius: "8px", textAlign: "center" }}>
                                    <div style={{ width: "40px", height: "40px", background: "var(--gray-200)", borderRadius: "50%", margin: "0 auto 0.5rem" }}></div>
                                    <strong>{r}</strong>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Last contact: 3 days ago</div>
                                    <button className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>Log Contact</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
