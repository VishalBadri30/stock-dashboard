import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { chartConfig } from "../constants/config";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import { fetchHistoricalData } from "../api/stock-api";
import StockContext from "../context/StockContext";
import { createDate, convertUnixTimestampToDate } from "../helpers/datahelpers";

const Chart = () => {
  const [data, setData] = useState([""]);
  const [filter, setFilter] = useState("1W");
  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const formatData = (data) => {
    return data.map((item, index) => {
      return {
        value: item.c.toFixed(2),
        date: convertUnixTimestampToDate(item.t),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      var endDate = new Date(Date.now() - 864e5);
      var startDate = createDate(endDate, -days, -weeks, -months, -years);
      endDate = endDate.toISOString().split("T")[0];
      startDate = startDate.toISOString().split("T")[0];
      return { startDate, endDate };
    };

    const updateChartData = async () => {
      try {
        const { startDate, endDate } = getDateRange();
        const result = await fetchHistoricalData(
          stockSymbol,
          startDate,
          endDate
        );
        setData(formatData(result.results));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
