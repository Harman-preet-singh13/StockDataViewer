"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChartComponent from "../component/ChartComponent";
import Link from "next/link";

const API_KEY = "cl29t1pr01qinfqol3q0cl29t1pr01qinfqol3qg";

const symbols =["GOOGL","AAPL","MSFT","TSLA","AMZN"]

const getStockData = async (
  symbol: string,
  startTimestamp: number,
  endTimestamp: number
) => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${startTimestamp}&to=${endTimestamp}&token=${API_KEY}`
  );
  return response.data;
};

const StockData = () => {
  const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState("AAPL")

  useEffect(() => {
    const fetchData = async () => {
      
      const startDate = "2022-10-04";
      const endDate = "2023-11-04";

      // Parse the input dates into UNIX timestamps
      const startTimestamp = new Date(startDate).getTime() / 1000;
      const endTimestamp = new Date(endDate).getTime() / 1000;

      const data = await getStockData(symbol, startTimestamp, endTimestamp);
      
      const stockDataArray = data.c.map((closePrice: any, index: string | number) => ({
        time: data.t[index],
        open: data.o[index],
        high: data.h[index],
        low: data.l[index],
        close: closePrice,
        v: data.v[index],
      }));
      
      setStockData(stockDataArray);
      
    };

    
    fetchData();

  }, [symbol]);


  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
  <>

  <div className="symbol-btn-container">
    <Link
    href="/"
    >
      Home
    </Link>
  {symbols.map((symbol, index)=>{
        return(
          <Link
          href={symbol}
          key={index}
          className=""
          onClick={()=> setSymbol(symbol)}
          >
            {symbol}
          </Link>
        )
      })}
  </div>
  <div className="lw-attribution">
      <h1 className="text-2xl">
        {symbol}
      </h1>
  </div>
    <ChartComponent stockData={stockData} symbol={symbol} />
  </>   
  );
};

export default StockData;
