import React, { useState, useEffect } from 'react';
import Chart from './Chartjs';

export default function Agebmi() {
  const [data, setData] = useState({ age: [], data: [], label:'' });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/agevsbmi/');
      const json = await response.json();
      setData({ age: json.age, data: json.bmi, label:'BMI' });
    }
    fetchData();
  }, []);

  return <Chart data={data} />;
}