import React, { useRef, useEffect } from "react";

const ChartWidget = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const widget = new window.TradingView.widget({
      fullscreen: true,
      symbol: "AAPL",
      interval: "240",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_top_toolbar: true,
      save_image: false,
      hide_side_toolbar: false, // hide the side toolbar to remove the volume indicator
      container_id: chartRef.current.id,
      overrides: {
        "paneProperties.background": "#000000", // set the background color to black
        "paneProperties.gridProperties.color": "#383838", // set the grid line color to a darker shade of gray
        "paneProperties.gridProperties.style": 1, // set the grid line style to a dotted line
      },
    });

    return () => {
      widget.remove();
    };
  }, []);

  return <div id="tv_chart_container" ref={chartRef}></div>;
};

export default ChartWidget;
