import React, { useState, useEffect } from 'react';
import Chart from './Chartjs';

export default function AgeGlucose() {
  const [data, setData] = useState({ age: [], data: [], label:'' });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/agevsbloodglucose/');
      const json = await response.json();
      setData({ age: json.age, data: json.blood_glucose_level, label:'Blood Glucose Level' });
    }
    fetchData();
  }, []);

  return <Chart data={data} />;
}