import React from "react";
import GaugeChart from "react-gauge-chart";

const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: `auto`,
    color: "#000",
    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

const DiabDial = ({ id, value, title }) => {
  let percent = value / 100;
  // value: "-50" -> percent: 0
  // value: "0" ---> percent: .5
  // value: "50" ---> percent: 1
  // -25 ... .5 + (-25/100) = .25
  // 25 ...  .5 + (25/100) = .75
  // -110 .. .5 + (-110/100) = -0.6

  return (
    <div style={styles.dial}>
      <GaugeChart
        id={id}
        nrOfLevels={3}
        arcsLength={[0.25, 0.5, 0.25]}
        colors={["#6aa84f", "#f1c232", "#cc0000"]}
        arcPadding={0.02}
        percent={percent}
        textColor={"#000000"}
        needleColor={"#5392ff"}
        formatTextValue={(value) => `${value.toFixed(1)}%`}
      />
      <div style={styles.title}>{title}</div>
    </div>
  );
};

export default DiabDial;
