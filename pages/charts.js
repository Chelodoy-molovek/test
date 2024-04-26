import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "../priceData";
import { volumeData } from "../volumeData";
import { dayData, weekData, monthData, yearData } from "../data";

export default function Chart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const lineSeries = useRef();
  const intervals = ["1D", "1W", "1M", "1Y"];

  const seriesesData = new Map([
    ["1D", dayData],
    ["1W", weekData],
    ["1M", monthData],
    ["1Y", yearData],
  ]);

  const setChartInterval = (interval) => {
    if (lineSeries.current) {
      lineSeries.current.setData(seriesesData.get(interval));
    }
  };

  useEffect(() => {
    const chartOptions = {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        textColor: "#a7aab4",
        background: { type: "solid", color: "#141823" },
      },
      grid: {
        vertLines: {
          color: "#232731",
        },
        horzLines: {
          color: "#232731",
        },
      },
    };

    chart.current = createChart(chartContainerRef.current, chartOptions);

    const candlestickSeries = chart.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      title: "btc/usdt",
    });
    candlestickSeries.setData(priceData);

    const volumeSeries = chart.current.addHistogramSeries({
      // color: "#182233",
      // lineWidth: 2,
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    volumeSeries.priceScale().applyOptions({
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });

    volumeSeries.setData(volumeData);

    // lineSeries.current = chart.current.addBaselineSeries({});

    // lineSeries.current.setData(seriesesData.get("1D"));
  }, []);

  //////////////////////////////////////////////////////////////////////
  // делаем на всю ширину резиновым
  // useEffect(() => {
  //   resizeObserver.current = new ResizeObserver((entries) => {
  //     const { width, height } = entries[0].contentRect;
  //     chart.current.applyOptions({ width, height });
  //     setTimeout(() => {
  //       chart.current.timeScale().fitContent();
  //     }, 0);
  //   });
  //   resizeObserver.current.observe(chartContainerRef.current);
  //   return () => resizeObserver.current.disconnect();
  // }, []);
  //////////////////////////////////////////////////////////////////////
  return (
    <div>
      {/* <div
        style={{
          position: "absolute",
          zIndex: "100",
          background: "white",
        }}
      >
        <div>
          <h1>BTC/USDT</h1>
        </div>
        <div>
          {intervals.map((interval) => (
            <button key={interval} onClick={() => setChartInterval(interval)}>
              {interval}
            </button>
          ))}
        </div>
      </div> */}
      <iframe
        width="100%"
        height="600"
        src="https://birdeye.so/tv-widget/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263?chain=solana&chartType=area&chartInterval=3&chartLeftToolbar=show"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <div
        ref={chartContainerRef}
        style={{ border: "1px solid black", width: "60wv" }}
      ></div>
    </div>
  );
}
