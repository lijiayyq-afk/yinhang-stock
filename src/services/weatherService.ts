import axios from 'axios';

// 城市列表
export const CITY_LIST = [
  { name: '上海', city: 'Shanghai', country: 'CN' },
  { name: '德阳中江', city: 'Zhongjiang', country: 'CN' },
  { name: '荆州石首', city: 'Shishou', country: 'CN' },
];

// 天气数据类型
export interface WeatherData {
  city: string;
  name: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weather: string;
  weatherIcon: string;
  timestamp: number;
}

// 从OpenWeatherMap API获取天气数据
export const fetchWeatherData = async (): Promise<WeatherData[]> => {
  try {
    // 使用OpenWeatherMap API密钥
    // 注意：在生产环境中，应该使用环境变量存储API密钥
    const API_KEY = 'YOUR_API_KEY'; // 这里需要替换为实际的API密钥
    
    // 并行请求所有城市的天气数据
    const weatherPromises = CITY_LIST.map(async (cityInfo) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInfo.city},${cityInfo.country}&appid=${API_KEY}&units=metric&lang=zh_cn`;
      
      try {
        const response = await axios.get(url);
        const data = response.data;
        
        return {
          city: cityInfo.city,
          name: cityInfo.name,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          weather: data.weather[0].description,
          weatherIcon: data.weather[0].icon,
          timestamp: Date.now(),
        };
      } catch (error) {
        console.error(`Failed to fetch weather data for ${cityInfo.name}:`, error);
        return null;
      }
    });
    
    const results = await Promise.all(weatherPromises);
    const validResults = results.filter((result): result is WeatherData => result !== null);
    
    // 缓存数据
    localStorage.setItem('weatherData', JSON.stringify(validResults));
    localStorage.setItem('weatherDataTimestamp', Date.now().toString());
    
    return validResults;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    
    // 尝试从缓存获取数据
    const cachedData = localStorage.getItem('weatherData');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    // 返回模拟数据（当API密钥不可用时）
    return [
      {
        city: 'Shanghai',
        name: '上海',
        temperature: 22,
        feelsLike: 24,
        humidity: 65,
        windSpeed: 3.5,
        weather: '多云',
        weatherIcon: '02d',
        timestamp: Date.now(),
      },
      {
        city: 'Zhongjiang',
        name: '德阳中江',
        temperature: 20,
        feelsLike: 21,
        humidity: 70,
        windSpeed: 2.8,
        weather: '晴',
        weatherIcon: '01d',
        timestamp: Date.now(),
      },
      {
        city: 'Shishou',
        name: '荆州石首',
        temperature: 24,
        feelsLike: 26,
        humidity: 75,
        windSpeed: 4.2,
        weather: '小雨',
        weatherIcon: '10d',
        timestamp: Date.now(),
      },
    ];
  }
};

// 获取缓存的天气数据
export const getCachedWeatherData = (): WeatherData[] => {
  const cachedData = localStorage.getItem('weatherData');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return [];
};

// 检查天气数据是否过期（超过30分钟）
export const isWeatherDataExpired = (): boolean => {
  const timestamp = localStorage.getItem('weatherDataTimestamp');
  if (timestamp) {
    const now = Date.now();
    const cachedTime = parseInt(timestamp);
    return (now - cachedTime) > 30 * 60 * 1000; // 30分钟过期
  }
  return true;
};