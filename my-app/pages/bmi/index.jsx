import RootLayout from "@/components/Layout";
import { Input, Button } from "@nextui-org/react";
import { set } from "lodash";
import { useState } from "react";
import BMIStrip from "@/components/Progress";
import BMITable from "@/components/Bmitable";
export default function Bmi() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmiData, setBmiData] = useState("");
  const handleSubmit = async (e) => {
    setBmiData("");
    e.preventDefault();
    const data = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
    };
    await fetch("http://localhost:8000/bmicalculator/", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setBmiData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RootLayout>
      <div className="p-2 text-center">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text mb-4">BMI Table</h1>

        <BMITable />
      </div>
      <div
        className="uk-animation-slide-bottom-small"
        data-uk-scrollspy-class="uk-animation-slide-bottom-small; delay: 1000;"
      >
        <div className="justify-center items-center p-2 ml-[30%]">
          <div className="flex justify-center border-3 border-pink-100 bg-pink-100 shadow-2xl rounded-lg p-2 max-w-xl ">
              <form className="flex flex-col gap-4 items-center justify-center">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text mb-4">BMI Calculator</h1>
                <Input
                  label="Enter your weight in KG"
                  type="number"
                  className="max-w-xs"
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Input
                  label="Enter your height in Meters"
                  type="number"
                  className="max-w-xs"
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Input
                  label="Enter your Age"
                  className="max-w-xs"
                  type="number"
                  onChange={(e) => setAge(e.target.value)}
                />
                <Button color="danger" onClick={handleSubmit} variant="shadow">
                  Calculate
                </Button>
              </form>
          </div>
        </div>
      </div>
      {bmiData && (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div
            className="text-xl lg:text-5xl font-[arial]  font-[700] uk-animation-slide-bottom-small"
            data-uk-scrollspy-class="uk-animation-slide-bottom-small"
          >
            <BMIStrip bmi={bmiData.bmi} label={bmiData.health_risk} />
          </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg border-3 border-red-500">
              <h1 className="text-center text-2xl font-bold mb-4">
                Precautions
              </h1>
              <ul
                className="list-disc pl-6 mt-4 uk-animation-fade text-left"
                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; target: li; delay: 100; repeat: true"
              >
                {bmiData.precautions.map((precaution) => (
                  <li>{precaution}</li>
                ))}
              </ul>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg shadow-lg border-3 border-red-500">
              <h1
                className="list-disc uk-animation-fade font-bold"
                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; target: li; delay: 100; repeat: true"
              >
                {bmiData.probable_diseases}
              </h1>
            </div>
          </div>
      )}
    </RootLayout>
  );
}
