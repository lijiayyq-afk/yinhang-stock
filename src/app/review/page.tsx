"use client";
import React, { useState } from "react";

export default function ReviewPage() {
    const [rating, setRating] = useState(0);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <header style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", color: "var(--primary-900)" }}>Monthly Review</h1>
                <p style={{ color: "var(--text-secondary)" }}>
                    Reflect on your progress, celebrate wins, and learn from challenges.
                </p>
            </header>

            <div style={{ display: "grid", gap: "2rem" }}>
                {/* Sentiment */}
                <div className="card">
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>How did this month feel?</h2>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                style={{
                                    fontSize: "2rem",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    opacity: rating >= star ? 1 : 0.3,
                                    transition: "opacity 0.2s",
                                }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3 Questions */}
                <div className="card">
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                        🏆 What were your biggest wins?
                    </label>
                    <textarea
                        style={{
                            width: "100%",
                            height: "120px",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid var(--border-light)",
                            resize: "vertical",
                            fontFamily: "inherit",
                        }}
                        placeholder="List 3 things you accomplished..."
                    />
                </div>

                <div className="card">
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                        💡 What did you learn? (Areas for Growth)
                    </label>
                    <textarea
                        style={{
                            width: "100%",
                            height: "120px",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid var(--border-light)",
                            resize: "vertical",
                            fontFamily: "inherit",
                        }}
                        placeholder="What would you do differently?"
                    />
                </div>

                <div className="card">
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                        🚀 Goals for Next Month
                    </label>
                    <textarea
                        style={{
                            width: "100%",
                            height: "120px",
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid var(--border-light)",
                            resize: "vertical",
                            fontFamily: "inherit",
                        }}
                        placeholder="Focus on..."
                    />
                </div>

                <button className="btn btn-primary" style={{ padding: "1rem" }}>
                    Save Monthly Review
                </button>
            </div>
        </div>
    );
}
