import React from "react";
import { Progress } from "@nextui-org/react";

export default function BMIStrip({ bmi, label }) {
  const progressColor =
    bmi < 18.5
      ? "bg-blue-500"
      : bmi < 25
      ? "bg-green-500"
      : bmi < 30
      ? "bg-yellow-500"
      : "bg-red-500";

  const pointerStyle = {
    position: "absolute",
    left: `${(bmi - 15) / (40 - 15) * 100}%`,
    width: "2px",
    height: "100%",
    backgroundColor: "black",
  };

  return (
    <div style={{ position: "relative", width: "250px", height: "20px" }} className=" mb-10 mt-10">
      <Progress
        width="100%"
        size="lg"
        classNames={{
          indicator: `${progressColor}`,
          label: "tracking-wider font-bold text-default-800",
          value: "hidden",
        }}
        label={bmi < 18.5 ? `Underweight- ${bmi}` : bmi < 25 ? `Normal- ${bmi}` : bmi < 30 ? `Overweight- ${bmi}` : `Obese- ${bmi}`}
        value={bmi}
        minValue={15}
        maxValue={40}
      />
    </div>
  );
}
