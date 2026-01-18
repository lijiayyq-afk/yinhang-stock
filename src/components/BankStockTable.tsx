import React, { useState } from 'react';
import { BankStockData } from '../services/stockService';

interface BankStockTableProps {
  data: BankStockData[];
}

export default function BankStockTable({ data }: BankStockTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BankStockData;
    direction: 'ascending' | 'descending';
  }>({ key: 'changePercent', direction: 'descending' });

  // 排序数据
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // 处理排序
  const requestSort = (key: keyof BankStockData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 格式化数字
  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals);
  };

  // 格式化成交量
  const formatVolume = (volume: number) => {
    if (volume >= 100000000) {
      return (volume / 100000000).toFixed(2) + '亿';
    } else if (volume >= 10000) {
      return (volume / 10000).toFixed(2) + '万';
    }
    return volume.toString();
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">银行股价列表</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th 
                className="px-4 py-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('name')}
              >
                银行名称
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('code')}
              >
                股票代码
              </th>
              <th 
                className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('price')}
              >
                当前价
              </th>
              <th 
                className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('change')}
              >
                涨跌额
              </th>
              <th 
                className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('changePercent')}
              >
                涨跌幅
              </th>
              <th 
                className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('volume')}
              >
                成交量
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((stock) => (
              <tr 
                key={stock.code} 
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{stock.name}</td>
                <td className="px-4 py-3 text-gray-600">{stock.code}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {formatNumber(stock.price)}
                </td>
                <td className={`px-4 py-3 text-right font-medium ${
                  stock.change > 0 ? 'text-red-600' : stock.change < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {stock.change > 0 ? '+' : ''}{formatNumber(stock.change)}
                </td>
                <td className={`px-4 py-3 text-right font-medium ${
                  stock.changePercent > 0 ? 'text-red-600' : stock.changePercent < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {stock.changePercent > 0 ? '+' : ''}{formatNumber(stock.changePercent)}%
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {formatVolume(stock.volume)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}