"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import RadialChartComponent from "@/components/ui/radialchart";

interface Precaution {
  id: number;
  text: string;
}

interface Result {
  precautions: Precaution[];
  prediction: number;
  medication: string;
}

export default function Component() {
  const [bmi, setBmi] = useState("");
  const [age, setAge] = useState("");
  const [hba1c, setHba1c] = useState("");
  const [bloodGlucose, setBloodGlucose] = useState("");
  const [hypertension, setHypertension] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);
  const [gender, setGender] = useState("0");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const data = {
      bmi: bmi,
      age: age,
      HbA1c_level: hba1c,
      blood_glucose_level: bloodGlucose,
      hypertension: hypertension ? 1 : 0,
      smoking_history: smoke ? 1 : 0,
      heart_disease: heartDisease ? 1 : 0,
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
      .then((data: Result) => {
        setResult(data);

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center ">
      {result && !loading ? (
        <Card className="w-full mt-16 max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
              Diabetes Prediction Results
            </CardTitle>
            <CardDescription>Based on your input data</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="bg-pink-50 p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-pink-800">
                Precautions
              </h3>
              <ul className="space-y-2">
                {result.precautions.map((precaution) => (
                  <li
                    key={precaution.id}
                    className="text-lg font-semibold text-pink-800 flex items-center"
                  >
                    <span role="img" aria-label="alert" className="mr-2">
                      ⚠️
                    </span>
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="drop-shadow-lg rounded-full">
                <RadialChartComponent
                  title="Diabetes Predictor"
                  chances={parseFloat((result.prediction * 100).toFixed(2))}
                  startAngle={0}
                  endAngle={
                    (parseFloat((result.prediction * 100).toFixed(2)) * 360) /
                    100
                  }
                  innerRadius={80}
                  outerRadius={110}
                />
              </div>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg shadow-md border border-gray-200 text-center">
              <h3 className="text-xl font-bold text-pink-800 mb-4">
                Recommended Medication
              </h3>
              <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-300">
                <p className="text-lg font-semibold text-gray-700">
                  {result.medication}
                </p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Please consult with your healthcare provider before starting any
                new medication.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2 text-sm mt-4">
            <div className="font-medium  underline">
              {result.prediction > 0.5 ? "High" : "Low"} risk of diabetes
            </div>
            <div className="text-muted-foreground">
              Consult with a healthcare professional for a comprehensive
              evaluation.
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-md mt-16">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
              Diabetes Predictor
            </CardTitle>
            <CardDescription>
              Fill in the form to predict diabetes risk.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="space-y-2 w-1/2">
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  onChange={(e) => setBmi(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-1/2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="space-y-2 w-1/2">
                <Label htmlFor="hba1c">HbA1c Level</Label>
                <Input
                  id="hba1c"
                  type="number"
                  onChange={(e) => setHba1c(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-1/2">
                <Label htmlFor="bloodGlucose">Blood Glucose Level</Label>
                <Input
                  id="bloodGlucose"
                  type="number"
                  onChange={(e) => setBloodGlucose(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="hypertension"
                checked={hypertension}
                onCheckedChange={setHypertension}
              />
              <Label htmlFor="hypertension">Hypertension</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="smoke" checked={smoke} onCheckedChange={setSmoke} />
              <Label htmlFor="smoke">Do you Smoke?</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="heartDisease"
                checked={heartDisease}
                onCheckedChange={setHeartDisease}
              />
              <Label htmlFor="heartDisease">
                Do you have any heart disease?
              </Label>
            </div>
            <RadioGroup value={gender} onValueChange={setGender}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            {loading ? (
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex justify-center items-center"
                disabled
              >
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </button>
            ) : (
              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
