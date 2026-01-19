"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const QUOTES = [
  { text: "简单是终极的 sophistication。", author: "达芬奇" },
  { text: "专注发生在你对一件事说“是”，对其他所有事说“不”的时候。", author: "詹姆斯·克利尔" },
  { text: "开始的方法是停止说话并开始行动。", author: "华特·迪士尼" },
  { text: "今日事，今日毕。", author: "谚语" },
  { text: "时间就是金钱。", author: "本杰明·富兰克林" },
];

export default function Dashboard() {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [priorities, setPriorities] = useState([
    { id: 1, text: "完成项目提案", done: false },
    { id: 2, text: "审查季度目标", done: false },
    { id: 3, text: "", done: false },
  ]);

  useEffect(() => {
    // 随机引用
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

  const today = new Date().toLocaleDateString("zh-CN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.dashboardGrid}>
      <header className={styles.header}>
        <div className={styles.subtitle}>{today}</div>
        <h1 className={styles.title}>早上好，导航者。</h1>
      </header>

      {/* 引用卡片 */}
      <section className={styles.quoteCard}>
        <div className={styles.quoteText}>“{quote.text}”</div>
        <div className={styles.quoteAuthor}>— {quote.author}</div>
      </section>

      {/* 左侧：重点任务 */}
      <div className={styles.mainSection}>
        <div className="card">
          <h2 className={styles.sectionTitle}>🏆 今日重点任务</h2>
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
                  placeholder="你的重点任务是什么？"
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
          <h2 className={styles.sectionTitle}>📝 快速笔记</h2>
          <textarea
            style={{ width: '100%', border: 'none', resize: 'none', outline: 'none', minHeight: '100px', fontSize: '1rem', lineHeight: '1.6' }}
            placeholder="捕捉你的想法..."
          />
        </div>
      </div>

      {/* 右侧：健康与统计 */}
      <div className={styles.sideSection}>
        <div className="card">
          <h2 className={styles.sectionTitle}>❤️ 健康检查</h2>
          <div className={styles.healthGrid}>
            <div>
              <label className={styles.label}>体重 (kg)</label>
              <input type="number" className={styles.healthInput} placeholder="0.0" />
            </div>
            <div>
              <label className={styles.label}>睡眠 (小时)</label>
              <input type="number" className={styles.healthInput} placeholder="7.5" />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className={styles.label}>昨日饮食</label>
            <select className={styles.healthInput}>
              <option>健康干净</option>
              <option>一般</option>
              <option>放纵</option>
            </select>
          </div>
        </div>

        <div className="card" style={{ background: 'var(--primary-800)', color: 'white', border: 'none' }}>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>💰 钱包</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>月度支出</div>
            <div style={{ fontSize: '2rem', fontWeight: '600' }}>¥1,240</div>
          </div>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', width: '100%', color: 'white' }}>
            + 记录支出
          </button>
        </div>
      </div>
    </div>
  );
}
