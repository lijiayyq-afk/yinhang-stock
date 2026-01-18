"use client";
import React, { useState, useEffect } from 'react';
import WeatherCard from '../../components/WeatherCard';
import { fetchWeatherData, WeatherData, isWeatherDataExpired, getCachedWeatherData } from '../../services/weatherService';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 获取天气数据
  const loadWeatherData = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherData();
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    // 先从缓存获取数据
    const cachedData = getCachedWeatherData();
    if (cachedData.length > 0) {
      setWeatherData(cachedData);
      setLoading(false);
    }
    
    // 检查数据是否过期，如果过期则重新获取
    if (isWeatherDataExpired()) {
      loadWeatherData();
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
          <h1 className="text-2xl font-bold">天气监控</h1>
          <p className="text-gray-600">上海、德阳中江、荆州石首的天气情况</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            最后更新: {formatLastUpdated()}
          </span>
          <button
            onClick={loadWeatherData}
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
      ) : weatherData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((data) => (
            <WeatherCard key={data.city} data={data} />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-gray-600">暂无数据，请点击刷新按钮获取数据</p>
        </div>
      )}
    </div>
  );
}