import React from "react";

const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

const BMITable = () => {
  const heights = Array.from({ length: 9 }, (_, index) => (140 + index * 5) / 100);
  const weights = Array.from({ length: 21 }, (_, index) => 41 + index);

  return (
    <div className= " bg-slate-200 shadow-xl rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider" scope="col">Height (m)</th>
            {weights.map((weight) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider" key={weight}>
                {weight} kg
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heights.map((height) => (
            <tr key={height}>
              <td className="px-6 py-4 whitespace-nowrap">{height.toFixed(2)}</td>
              {weights.map((weight) => {
                const bmi = calculateBMI(height * 100, weight);
                let bmiClass = "";

                if (bmi < 18.5) {
                  bmiClass = "bg-blue-500";
                } else if (bmi < 25) {
                  bmiClass = "bg-green-500";
                } else if (bmi < 30) {
                  bmiClass = "bg-yellow-500";
                } else {
                  bmiClass = "bg-red-500";
                }

                return (
                  <td className={`border px-4 py-2 ${bmiClass}`} key={`${height}-${weight}`}>
                    {bmi}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default BMITable;
