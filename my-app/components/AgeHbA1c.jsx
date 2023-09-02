import React, { useState, useEffect } from 'react';
import Chart from './Chartjs';

export default function Agehba1c() {
  const [data, setData] = useState({ age: [], data: [], label:'' });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/agevshba1c/');
      const json = await response.json();
      setData({ age: json.age, data: json.HbA1c_level, label:'Hba1c level' });
    }
    fetchData();
  }, []);

  return <Chart data={data} />;
}