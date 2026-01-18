"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const QUOTES = [
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Focus happens when you say yes to one thing and no to everything else.", author: "James Clear" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
];

export default function Dashboard() {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [priorities, setPriorities] = useState([
    { id: 1, text: "Finish Project Proposal", done: false },
    { id: 2, text: "Review Quarterly Goals", done: false },
    { id: 3, text: "", done: false },
  ]);

  useEffect(() => {
    // Random quote on mount
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const toggleTask = (id: number) => {
    setPriorities(
      priorities.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const updateTaskText = (id: number, text: string) => {
    setPriorities(priorities.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.dashboardGrid}>
      <header className={styles.header}>
        <div className={styles.subtitle}>{today}</div>
        <h1 className={styles.title}>Good Morning, Navigator.</h1>
      </header>

      {/* Quote Widget */}
      <section className={styles.quoteCard}>
        <div className={styles.quoteText}>“{quote.text}”</div>
        <div className={styles.quoteAuthor}>— {quote.author}</div>
      </section>

      {/* Left Column: Focus */}
      <div className={styles.mainSection}>
        <div className="card">
          <h2 className={styles.sectionTitle}>🏆 Today's Top Priorities</h2>
          <div>
            {priorities.map((task) => (
              <div key={task.id} className={styles.taskItem}>
                <button
                  className={`${styles.checkbox} ${task.done ? styles.checkboxChecked : ""
                    }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done && "✓"}
                </button>
                <input
                  type="text"
                  value={task.text}
                  placeholder="What is your focus?"
                  className={styles.taskInput}
                  onChange={(e) => updateTaskText(task.id, e.target.value)}
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "var(--text-secondary)" : "inherit",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className={styles.sectionTitle}>📝 Quick Notes</h2>
          <textarea
            style={{ width: '100%', border: 'none', resize: 'none', outline: 'none', minHeight: '100px', fontSize: '1rem', lineHeight: '1.6' }}
            placeholder="Capture your thoughts..."
          />
        </div>
      </div>

      {/* Right Column: Health & Stats */}
      <div className={styles.sideSection}>
        <div className="card">
          <h2 className={styles.sectionTitle}>❤️ Health Check</h2>
          <div className={styles.healthGrid}>
            <div>
              <label className={styles.label}>Weight (kg)</label>
              <input type="number" className={styles.healthInput} placeholder="0.0" />
            </div>
            <div>
              <label className={styles.label}>Sleep (hrs)</label>
              <input type="number" className={styles.healthInput} placeholder="7.5" />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className={styles.label}>Yesterday's Diet</label>
            <select className={styles.healthInput}>
              <option>Clean & Healthy</option>
              <option>Average</option>
              <option>Indulgent</option>
            </select>
          </div>
        </div>

        <div className="card" style={{ background: 'var(--primary-800)', color: 'white', border: 'none' }}>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>💰 Wallet</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Month Expenses</div>
            <div style={{ fontSize: '2rem', fontWeight: '600' }}>$1,240</div>
          </div>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', width: '100%', color: 'white' }}>
            + Log Expense
          </button>
        </div>
      </div>
    </div>
  );
}
