"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const symbols = ["GOOGL", "AAPL", "MSFT", "TSLA", "AMZN"];

export default function page() {
  const [symbol, setSymbol] = useState("");

  return (
    <>
    <main className="main-container max-w-4xl mx-auto">
      <div className="bg-white">
        <h1 className="text-6xl">Welcome to StockDataViewer</h1>
        <div className="symbol-btn-container">
          {symbols.map((symbol, index) => {
            return (
              <Link
                href={symbol}
                key={index}
                className="p-2 text-green-600 hover:text-orange-400"
                onClick={() => setSymbol(symbol)}
              >
                {symbol}
              </Link>
            );
          })}
        </div>
        <p className="text-center text-sm">
              {" "}
              <a
                href="https://www.harmanpreetsingh.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Created by{" "}
                <span className="text-orange-400 hover:underline">
                  Harmanpreet Singh
                </span>
              </a>
            </p>
      </div>
    </main>
    </>
  );
}
