import React from 'react';
import { WeatherData } from '../services/weatherService';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  // 获取天气图标URL
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // 格式化时间
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="weather-card card">
      <div className="weather-card-header">
        <h3 className="text-xl font-semibold">{data.name}</h3>
        <span className="text-sm text-gray-500">更新于: {formatTime(data.timestamp)}</span>
      </div>
      
      <div className="weather-card-body">
        <div className="weather-main">
          <div className="weather-icon">
            <img 
              src={getWeatherIconUrl(data.weatherIcon)} 
              alt={data.weather} 
              className="w-20 h-20"
            />
          </div>
          <div className="weather-info">
            <div className="temperature">{Math.round(data.temperature)}°C</div>
            <div className="weather-description">{data.weather}</div>
            <div className="feels-like">体感温度: {Math.round(data.feelsLike)}°C</div>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">湿度</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">风速</span>
            <span className="detail-value">{data.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}