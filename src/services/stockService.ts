import axios from 'axios';

// 全国股份制银行列表
export const BANK_LIST = [
  { name: '招商银行', code: '600036' },
  { name: '浦发银行', code: '600000' },
  { name: '中信银行', code: '601998' },
  { name: '中国光大银行', code: '601818' },
  { name: '华夏银行', code: '600015' },
  { name: '中国民生银行', code: '600016' },
  { name: '平安银行', code: '000001' },
  { name: '兴业银行', code: '601166' },
  { name: '浙商银行', code: '601916' },
  { name: '恒丰银行', code: '600352' },
];

// 银行股票数据类型
export interface BankStockData {
  name: string;
  code: string;
  price: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  change: number;
  changePercent: number;
  volume: number;
  amount: number;
  timestamp: number;
}

// 从新浪财经API获取股票数据
export const fetchBankStockData = async (): Promise<BankStockData[]> => {
  try {
    // 构建API请求URL
    const codes = BANK_LIST.map(bank => 
      bank.code.startsWith('60') ? `sh${bank.code}` : `sz${bank.code}`
    ).join(',');
    
    const url = `https://hq.sinajs.cn/list=${codes}`;
    
    // 发送请求
    const response = await axios.get(url);
    
    // 解析响应数据
    const dataLines = response.data.split('\n');
    const stockData: BankStockData[] = [];
    
    dataLines.forEach((line: string, index: number) => {
      if (line && index < BANK_LIST.length) {
        const bank = BANK_LIST[index];
        const match = line.match(/var hq_str_\w+="([^"]+)"/);
        
        if (match) {
          const data = match[1].split(',');
          
          if (data.length >= 11) {
            const price = parseFloat(data[3]);
            const open = parseFloat(data[1]);
            const high = parseFloat(data[4]);
            const low = parseFloat(data[5]);
            const prevClose = parseFloat(data[2]);
            const change = price - prevClose;
            const changePercent = (change / prevClose) * 100;
            const volume = parseFloat(data[8]);
            const amount = parseFloat(data[9]);
            
            stockData.push({
              name: bank.name,
              code: bank.code,
              price,
              open,
              high,
              low,
              prevClose,
              change,
              changePercent,
              volume,
              amount,
              timestamp: Date.now(),
            });
          }
        }
      }
    });
    
    // 缓存数据
    localStorage.setItem('bankStockData', JSON.stringify(stockData));
    localStorage.setItem('bankStockDataTimestamp', Date.now().toString());
    
    return stockData;
  } catch (error) {
    console.error('Failed to fetch bank stock data:', error);
    
    // 尝试从缓存获取数据
    const cachedData = localStorage.getItem('bankStockData');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    // 返回模拟数据（当API调用失败时）
    return [
      {
        name: '招商银行',
        code: '600036',
        price: 42.56,
        open: 42.00,
        high: 42.80,
        low: 41.90,
        prevClose: 41.80,
        change: 0.76,
        changePercent: 1.82,
        volume: 12560000,
        amount: 534500000,
        timestamp: Date.now(),
      },
      {
        name: '浦发银行',
        code: '600000',
        price: 8.25,
        open: 8.20,
        high: 8.30,
        low: 8.18,
        prevClose: 8.22,
        change: 0.03,
        changePercent: 0.36,
        volume: 8920000,
        amount: 73600000,
        timestamp: Date.now(),
      },
      {
        name: '中信银行',
        code: '601998',
        price: 6.88,
        open: 6.85,
        high: 6.92,
        low: 6.83,
        prevClose: 6.90,
        change: -0.02,
        changePercent: -0.29,
        volume: 6750000,
        amount: 46400000,
        timestamp: Date.now(),
      },
      {
        name: '中国光大银行',
        code: '601818',
        price: 3.85,
        open: 3.83,
        high: 3.87,
        low: 3.82,
        prevClose: 3.84,
        change: 0.01,
        changePercent: 0.26,
        volume: 15620000,
        amount: 60100000,
        timestamp: Date.now(),
      },
      {
        name: '华夏银行',
        code: '600015',
        price: 5.12,
        open: 5.10,
        high: 5.15,
        low: 5.08,
        prevClose: 5.11,
        change: 0.01,
        changePercent: 0.20,
        volume: 4320000,
        amount: 22100000,
        timestamp: Date.now(),
      },
      {
        name: '中国民生银行',
        code: '600016',
        price: 3.98,
        open: 3.96,
        high: 4.00,
        low: 3.95,
        prevClose: 3.97,
        change: 0.01,
        changePercent: 0.25,
        volume: 9870000,
        amount: 39300000,
        timestamp: Date.now(),
      },
      {
        name: '平安银行',
        code: '000001',
        price: 18.65,
        open: 18.50,
        high: 18.75,
        low: 18.45,
        prevClose: 18.40,
        change: 0.25,
        changePercent: 1.36,
        volume: 23450000,
        amount: 437000000,
        timestamp: Date.now(),
      },
      {
        name: '兴业银行',
        code: '601166',
        price: 17.80,
        open: 17.70,
        high: 17.85,
        low: 17.65,
        prevClose: 17.60,
        change: 0.20,
        changePercent: 1.14,
        volume: 18760000,
        amount: 334000000,
        timestamp: Date.now(),
      },
      {
        name: '浙商银行',
        code: '601916',
        price: 2.85,
        open: 2.84,
        high: 2.86,
        low: 2.83,
        prevClose: 2.85,
        change: 0.00,
        changePercent: 0.00,
        volume: 5620000,
        amount: 16000000,
        timestamp: Date.now(),
      },
      {
        name: '恒丰银行',
        code: '600352',
        price: 12.45,
        open: 12.30,
        high: 12.50,
        low: 12.25,
        prevClose: 12.35,
        change: 0.10,
        changePercent: 0.81,
        volume: 3450000,
        amount: 42900000,
        timestamp: Date.now(),
      },
    ];
  }
};

// 获取缓存的股票数据
export const getCachedStockData = (): BankStockData[] => {
  const cachedData = localStorage.getItem('bankStockData');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return [];
};

// 检查数据是否过期（超过5分钟）
export const isDataExpired = (): boolean => {
  const timestamp = localStorage.getItem('bankStockDataTimestamp');
  if (timestamp) {
    const now = Date.now();
    const cachedTime = parseInt(timestamp);
    return (now - cachedTime) > 5 * 60 * 1000; // 5分钟过期
  }
  return true;
};