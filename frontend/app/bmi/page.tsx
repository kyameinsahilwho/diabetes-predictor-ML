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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BMIData {
  bmi: number;
  health_risk: string;
  precautions: string[];
  probable_diseases: string;
}

const BMITable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>BMI Range</TableHead>
        <TableHead>Category</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Below 18.5</TableCell>
        <TableCell>Underweight</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>18.5 - 24.9</TableCell>
        <TableCell>Normal weight</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>25.0 - 29.9</TableCell>
        <TableCell>Overweight</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>30.0 and Above</TableCell>
        <TableCell>Obese</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const BMIStrip = ({ bmi, label }: { bmi: number; label: string }) => (
  <div className="w-full max-w-md">
    <Progress value={bmi} max={40} className="h-8" />
    <div className="mt-2 text-center">
      <span className="text-lg font-bold">{bmi.toFixed(1)}</span>
      <span className="ml-2 text-lg">{label}</span>
    </div>
  </div>
);

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBmiData(null);

    const data = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
    };

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:8000/bmicalculator/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setBmiData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="container mx-auto mt-16 p-4">
      <div className="flex flex-wrap justify-center items-stretch -mx-4 mt-16">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
                BMI Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BMITable />
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          {bmiData ? (
             <Card>
             <CardHeader>
               <CardTitle>BMI Results</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
               <BMIStrip bmi={bmiData.bmi} label={bmiData.health_risk} />
               
               <div>
                 <h3 className="font-semibold mb-2">Precautions</h3>
                 <ul className="list-disc list-inside space-y-1">
                   {bmiData.precautions.map((precaution, index) => (
                     <li key={index}>{precaution}</li>
                   ))}
                 </ul>
               </div>
               
               <Separator />
               
               <div>
                 <h3 className="font-semibold mb-2">Probable Diseases</h3>
                 <p>{bmiData.probable_diseases}</p>
               </div>
             </CardContent>
           </Card>
       
          ) : (
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
                  BMI Calculator
                </CardTitle>
                <CardDescription>
                  Enter your details to calculate your BMI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Enter your weight in KG"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <Input
                    type="float"
                    placeholder="Enter your height in Meters"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Enter your Age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
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
                      </div>
                    ) : (
                      "Calculate"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}