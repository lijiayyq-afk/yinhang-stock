"use client";
import React, { useState, useEffect } from 'react';
import BankStockTable from '../../components/BankStockTable';
import BankStockChart from '../../components/BankStockChart';
import { fetchBankStockData, BankStockData, isDataExpired, getCachedStockData } from '../../services/stockService';

export default function BankStocksPage() {
  const [stockData, setStockData] = useState<BankStockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 获取股票数据
  const loadStockData = async () => {
    setLoading(true);
    try {
      const data = await fetchBankStockData();
      setStockData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    // 先从缓存获取数据
    const cachedData = getCachedStockData();
    if (cachedData.length > 0) {
      setStockData(cachedData);
      setLoading(false);
    }
    
    // 检查数据是否过期，如果过期则重新获取
    if (isDataExpired()) {
      loadStockData();
    }
  }, []);

  // 格式化最后更新时间
  const formatLastUpdated = () => {
    if (!lastUpdated) return '从未更新';
    return lastUpdated.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">银行股价监控</h1>
          <p className="text-gray-600">全国股份制银行股价变化趋势</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            最后更新: {formatLastUpdated()}
          </span>
          <button
            onClick={loadStockData}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? '更新中...' : '刷新数据'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600">加载中...</p>
        </div>
      ) : stockData.length > 0 ? (
        <>
          <BankStockTable data={stockData} />
          <BankStockChart data={stockData} />
        </>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-gray-600">暂无数据，请点击刷新按钮获取数据</p>
        </div>
      )}
    </div>
  );
}