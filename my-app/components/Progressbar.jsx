import React from "react";
import { Progress } from "@nextui-org/react";

export default function Progressbar(props) {
  return (
    <Progress
      size="lg"
      radius="md"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-green-500 to-red-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Probabilty of Diabetes"
      value={props.Value}
      showValueLabel={true}
    />
  );
}
