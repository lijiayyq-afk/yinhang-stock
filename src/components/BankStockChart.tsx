import React from 'react';
import ReactECharts from 'echarts-for-react';
import { BankStockData } from '../services/stockService';

interface BankStockChartProps {
  data: BankStockData[];
}

export default function BankStockChart({ data }: BankStockChartProps) {
  // 准备图表数据
  const topGainers = [...data]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);
  
  const topLosers = [...data]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);

  // 涨幅排行图表配置
  const gainersOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c}%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: topGainers.map(item => item.name),
      axisTick: {
        alignWithLabel: true
      }
    },
    series: [
      {
        name: '涨跌幅',
        type: 'bar',
        barWidth: '60%',
        data: topGainers.map(item => ({
          value: item.changePercent,
          itemStyle: {
            color: '#ff4d4f'
          }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%'
        }
      }
    ]
  };

  // 跌幅排行图表配置
  const losersOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c}%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: topLosers.map(item => item.name),
      axisTick: {
        alignWithLabel: true
      }
    },
    series: [
      {
        name: '涨跌幅',
        type: 'bar',
        barWidth: '60%',
        data: topLosers.map(item => ({
          value: item.changePercent,
          itemStyle: {
            color: '#52c41a'
          }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%'
        }
      }
    ]
  };

  // 市值对比图表配置
  const marketCapOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '市值占比',
        type: 'pie',
        radius: '70%',
        data: data.map(item => ({
          value: item.price * 10000, // 简化计算，实际应使用真实市值
          name: item.name
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">涨幅排行 TOP5</h2>
        <div style={{ height: 300 }}>
          <ReactECharts option={gainersOption} />
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">跌幅排行 TOP5</h2>
        <div style={{ height: 300 }}>
          <ReactECharts option={losersOption} />
        </div>
      </div>
      <div className="card lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">市值对比分析</h2>
        <div style={{ height: 400 }}>
          <ReactECharts option={marketCapOption} />
        </div>
      </div>
    </div>
  );
}