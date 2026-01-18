"use client";
import React, { useState } from "react";

export default function PlannerPage() {
    const [weekPriorities, setWeekPriorities] = useState([
        { id: 1, text: "Complete Q4 Strategy Deck", done: false },
        { id: 2, text: "Schedule 1:1s with team", done: true },
        { id: 3, text: "Research new market trends", done: false },
    ]);

    const [monthGoals, setMonthGoals] = useState([
        { id: 1, text: "Launch MVP", category: "Work" },
        { id: 2, text: "Read 2 Books", category: "Personal" },
    ]);

    const toggleWeek = (id: number) => {
        setWeekPriorities(weekPriorities.map(i => i.id === id ? { ...i, done: !i.done } : i));
    };

    return (
        <div>
            <h1 style={{ fontSize: "2rem", color: "var(--primary-900)", marginBottom: "2rem" }}>Forward Planner</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

                {/* Weekly Section */}
                <div className="card" style={{ minHeight: "400px" }}>
                    <header style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--gray-100)", paddingBottom: "1rem" }}>
                        <h2 style={{ fontSize: "1.25rem", color: "var(--primary-800)" }}>📅 This Week's Top Priorities</h2>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Focus on the essential few.</p>
                    </header>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {weekPriorities.map((item) => (
                            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem", borderRadius: "8px", background: item.done ? "var(--gray-50)" : "white" }}>
                                <input
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() => toggleWeek(item.id)}
                                    style={{ width: "20px", height: "20px", accentColor: "var(--primary-600)" }}
                                />
                                <span style={{
                                    textDecoration: item.done ? "line-through" : "none",
                                    color: item.done ? "var(--text-secondary)" : "var(--text-main)",
                                    flex: 1
                                }}>{item.text}</span>
                            </div>
                        ))}

                        <button className="btn btn-ghost" style={{ justifyContent: "flex-start", paddingLeft: 0 }}>+ Add Priority</button>
                    </div>
                </div>

                {/* Monthly Section */}
                <div className="card" style={{ minHeight: "400px" }}>
                    <header style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--gray-100)", paddingBottom: "1rem" }}>
                        <h2 style={{ fontSize: "1.25rem", color: "var(--primary-800)" }}>🎯 Monthly Big Rocks</h2>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Key outcomes for October.</p>
                    </header>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ textAlign: "left", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                <th style={{ paddingBottom: "0.5rem" }}>Goal</th>
                                <th style={{ paddingBottom: "0.5rem" }}>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthGoals.map((g) => (
                                <tr key={g.id} style={{ borderTop: "1px solid var(--gray-100)" }}>
                                    <td style={{ padding: "1rem 0" }}>{g.text}</td>
                                    <td style={{ padding: "1rem 0" }}>
                                        <span style={{
                                            background: g.category === "Work" ? "var(--primary-100)" : "#e0f2fe",
                                            color: g.category === "Work" ? "var(--primary-800)" : "#0369a1",
                                            padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem"
                                        }}>
                                            {g.category}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
