import React, { useEffect } from "react";
import {Input} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import Loader from "./loader";
import Link from "next/link";
import Progressbar from "./Progressbar";
import DiabDial from "./Gauge";
export default function Fpp() {
  const [selected, setSelected] = React.useState("london");

  const [email , setEmail] = React.useState("");
  const [bmi , setBmi] = React.useState("");
  const [age , setAge] = React.useState("");
  const [hba1c , setHba1c] = React.useState("");
  const [blood_glucose , setBlood_glucose] = React.useState("");
  const [hypertension , setHypertension] = React.useState("");
  const [smoke , setSmoke] = React.useState("");
  const [heart_disease , setHeart_disease] = React.useState("");
  const [gender , setGender] = React.useState("");
  const [loading , setLoading] = React.useState(false);
  const [result , setResult] = React.useState("");
  useEffect(() => {
    console.log(gender);
  } , [gender])

  const handleSubmit = async (e) => {

    const data = {
      "bmi" : bmi,
      "age" : age,
      "HbA1c_level" : hba1c,
      "blood_glucose_level" : blood_glucose,
      "hypertension" : hypertension ? 1 : 0,
      "smoking_history" : smoke ? 1 : 0,
      "heart_disease" : heart_disease ? 1 : 0,
      "gender" : gender
    }

    e.preventDefault();
    setLoading(true);
     await fetch("http://127.0.0.1:8000/diabetes_predictor/" , {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {console.log(data)
        setResult(data.prediction)
        setTimeout(() => { setLoading(false) } , 5000)  
      })
      .catch(err => {console.log(err)
        setLoading(false)})
  }

  return (
    !loading && !result ? 
      <form className="flex flex-col gap-4 items-center justify-center">
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
    /><Input
    isClearable
    type="text"
    onChange={(e) => setBlood_glucose(e.target.value)}
    label="blood_glucose_level"
    variant="faded"
    onClear={() => console.log("input cleared")}
    className="max-w-xs"
  />
  <Switch color="danger" isSelected={hypertension} onValueChange={setHypertension}>Hypertension</Switch>
  <Switch color="danger" isSelected={smoke} onValueChange={setSmoke}>Do you Smoke?</Switch>
  <Switch color="danger" isSelected={heart_disease} onValueChange={setHeart_disease}>Do you have any heart disease?</Switch>
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
  <Button color="primary" variant="shadow" onClick={handleSubmit}>
    Submit
  </Button>
    </form> : 
    result ? <div className=" flex justify-center "><div className="dials border-solid border-4 border-red-400 drop-shadow-lg rounded-full"><DiabDial value={result*100} title="Diabetes" /></div></div> : <Loader />

  );
}
