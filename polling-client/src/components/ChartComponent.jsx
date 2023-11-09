// ChartComponent.js
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie', // Change this to the appropriate chart type
      data: data,
      options: options,
    });
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;