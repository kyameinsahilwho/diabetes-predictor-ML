import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Loader from "./loader";
import Link from "next/link";
import Progressbar from "./Progressbar";
import RadialChartComponent from "./Gauge";
export default function Fpp() {
  const [selected, setSelected] = React.useState("london");

  const [email, setEmail] = React.useState("");
  const [bmi, setBmi] = React.useState("");
  const [age, setAge] = React.useState("");
  const [hba1c, setHba1c] = React.useState("");
  const [blood_glucose, setBlood_glucose] = React.useState("");
  const [hypertension, setHypertension] = React.useState("");
  const [smoke, setSmoke] = React.useState("");
  const [heart_disease, setHeart_disease] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [load, setLoad] = React.useState(false);
  useEffect(() => {
    console.log(gender);
  }, [gender]);

  const handleSubmit = async (e) => {
    const data = {
      bmi: bmi,
      age: age,
      HbA1c_level: hba1c,
      blood_glucose_level: blood_glucose,
      hypertension: hypertension ? 1 : 0,
      smoking_history: smoke ? 1 : 0,
      heart_disease: heart_disease ? 1 : 0,
      gender: gender,
    };

    e.preventDefault();
    setLoading(true);
    await fetch("http://127.0.0.1:8000/diabetes_predictor/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoad(true);
        console.log(data);
        setResult(data);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return !loading ? (
    <>
      <div className="justify-center items-center p-4 ">
        {!load && (
          <div className="flex justify-center border-3 ml-[30%] border-pink-100 bg-pink-100 shadow-2xl rounded-lg p-2 max-w-xl ">
            <form className="flex flex-col gap-3 items-center justify-center">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
                Diabetes Predictor
              </h1>
              <Input
                isClearable
                type="email"
                label="Email"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
                variant="faded"
                onClear={() => console.log("input cleared")}
                className="max-w-xs"
              />
              <Input
                isClearable
                type="number"
                label="BMI"
                onChange={(e) => setBmi(e.target.value)}
                variant="faded"
                onClear={() => console.log("input cleared")}
                className="max-w-xs"
              />
              <Input
                isClearable
                type="number"
                label="Age"
                onChange={(e) => setAge(e.target.value)}
                variant="faded"
                onClear={() => console.log("input cleared")}
                className="max-w-xs"
              />
              <Input
                isClearable
                type="text"
                label="HbA1c_level"
                onChange={(e) => setHba1c(e.target.value)}
                variant="faded"
                onClear={() => console.log("input cleared")}
                className="max-w-xs"
              />
              <Input
                isClearable
                type="text"
                onChange={(e) => setBlood_glucose(e.target.value)}
                label="blood_glucose_level"
                variant="faded"
                onClear={() => console.log("input cleared")}
                className="max-w-xs"
              />
              <Switch
                color="danger"
                isSelected={hypertension}
                onValueChange={setHypertension}
              >
                Hypertension
              </Switch>
              <Switch
                color="danger"
                isSelected={smoke}
                onValueChange={setSmoke}
              >
                Do you Smoke?
              </Switch>
              <Switch
                color="danger"
                isSelected={heart_disease}
                onValueChange={setHeart_disease}
              >
                Do you have any heart disease?
              </Switch>
              <div className="flex flex-col gap-3">
                <RadioGroup
                  label="Select Gender"
                  orientation="horizontal"
                  value={gender}
                  onValueChange={setGender}
                >
                  <Radio value="0">Female</Radio>
                  <Radio value="1">Male</Radio>
                </RadioGroup>
              </div>
              <Button color="danger" variant="shadow" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
          </div>
        )}
        {result && load && (
          <div>
            <div class="px-4 bg-white mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
              <div class="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
                <div class="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                  <div class="max-w-xl mb-6">
                    <h2 class="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-black sm:text-4xl sm:leading-none max-w-lg mb-6">
                      Precautions
                    </h2>
                    {result.precautions.map((precaution) => (
                      <p
                        class="text-black text-base md:text-lg"
                        style={{ fontSize: "2.25rem", lineHeight: "2.75rem" }}
                      >
                        {precaution}
                      </p>
                    ))}
                  </div>
                  <div className="space-x-4">
                    <button class="text-neutral-800  text-lg font-medium inline-flex items-center">
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <div className="drop-shadow-lg rounded-full mb-4">
                  <RadialChartComponent
                    title="Diabetes Predictor"
                    chances={parseFloat((result.prediction * 100).toFixed(2))}
                    startAngle={0}
                    endAngle={parseFloat((result.prediction * 100).toFixed(2))*360/100}
                    innerRadius={80}
                    outerRadius={110}
                    footerText=""
                  />{" "}
                </div>

                <div className="bg-pink-100 p-4 rounded-lg shadow-lg border-3 border-red-500 mb-4">
                  <h1
                    className="list-disc uk-animation-fade font-bold capitalize"
                    data-uk-scrollspy="cls: uk-animation-slide-bottom-small; target: li; delay: 100; repeat: true"
                  >
                    {result.medication}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="h-[600px]">
      <Loader />
    </div>
  );
}
