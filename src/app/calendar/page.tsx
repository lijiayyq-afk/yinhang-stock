"use client";
import React from "react";

export default function CalendarPage() {
    const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock days

    return (
        <div>
            <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 style={{ fontSize: "2rem", color: "var(--primary-900)" }}>October 2024</h1>
                    <p style={{ color: "var(--text-secondary)" }}>Focus: Q4 Planning</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn btn-ghost">&lt; Prev</button>
                    <button className="btn btn-ghost">Next &gt;</button>
                </div>
            </header>

            {/* Weekday Headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "0.5rem" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} style={{ fontWeight: 600, color: "var(--text-secondary)", textAlign: "center" }}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", background: "var(--border-light)", border: "1px solid var(--border-light)", borderRadius: "12px", overflow: "hidden" }}>
                {days.map((day, i) => {
                    const isWeekend = (i % 7 === 0) || (i % 7 === 6);
                    const date = day > 31 ? day - 31 : day; // Simple mock logic
                    const opacity = day > 31 ? 0.3 : 1;

                    return (
                        <div
                            key={i}
                            style={{
                                background: "var(--bg-card)",
                                minHeight: "120px",
                                padding: "0.5rem",
                                opacity,
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span style={{ fontWeight: 500, color: isWeekend ? "var(--text-secondary)" : "var(--text-main)" }}>{date}</span>
                                {date === 17 && <span style={{ fontSize: "0.8rem", color: "var(--primary-600)" }}>🌕</span>}
                            </div>

                            {/* Mock Events */}
                            {date === 14 && (
                                <div style={{ background: "var(--primary-100)", color: "var(--primary-800)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8rem", marginBottom: "4px" }}>
                                    Team Meeting
                                </div>
                            )}
                            {date === 24 && (
                                <div style={{ background: "#fee2e2", color: "#991b1b", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8rem", marginBottom: "4px" }}>
                                    Deadline
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Weekly Notes</h3>
                <textarea style={{ width: '100%', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '1rem', height: '100px' }} placeholder="High level notes for this month..." />
            </div>
        </div>
    );
}
