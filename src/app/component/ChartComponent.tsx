import React, { FC, useEffect, useRef, useState } from 'react';
import { CandlestickData, CrosshairMode, IChartApi, createChart } from 'lightweight-charts';

type ChartComponentProps = {
  stockData: CandlestickData[];
  symbol:string;
};

const ChartComponent: FC<ChartComponentProps> = ({ stockData, symbol }) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const chartRef = useRef<IChartApi | null>(null);


  const resizeObserver = new ResizeObserver((entries)=>{
    for(const entry of entries) {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;

      setChartDimensions({
        width,
        height,
      });
    }
  });

  const currentLocale = window.navigator.languages[0];

  const myPriceFormatter = Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: 'USD',
}).format;

useEffect(() => {
  const chartContainer = document.getElementById('chart-container');

console.log(chartDimensions);

  if (chartContainer) {
    resizeObserver.observe(chartContainer);
  }

  return () => {
    if (chartContainer) {
      resizeObserver.unobserve(chartContainer);
    }
  };

}, []);

  useEffect(() => {
    const chartContainer = document.getElementById('chart-container');
    if (chartContainer) {
      const chart = createChart(chartContainer, {
        width: chartDimensions.width,
        height: chartDimensions.height,
      });

      chartRef.current = chart;

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

     
      candlestickSeries.applyOptions({
        priceFormat:{
          type:'custom',
          formatter:myPriceFormatter,
        }
      })

      
chart.applyOptions({
  crosshair: {
      
      mode:CrosshairMode.Normal,
      
      vertLine: {
          width:1,
          color: '#000000',
          style: 0,
          labelBackgroundColor: '#000000',
      },

      
      horzLine: {
          color: '#000000',
          labelBackgroundColor: '#000000',
      },
    }
  })

      console.log(stockData);

      candlestickSeries.setData(stockData);
    } else {
      console.error('chartContainer element is not found');
    }

  }, [chartDimensions, stockData]);

 

  return <div 
  className="w-screen h-full mb-5 cursor-grab"
  id="chart-container"
  />;
};

export default ChartComponent;
