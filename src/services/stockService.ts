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
    
    return [];
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