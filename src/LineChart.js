import React from "react";
// import { Line } from "../node_modules/react-chartjs-2";
import { Line } from "react-chartjs-2";

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  }
  render() {
    const datesToChart = [];
    const labels = [];
    const dataPoints = [];

    for (let i = 6; i >= 0; i--) {
      let mToday = new Date();
      mToday.setDate(mToday.getDate() - i);
      datesToChart.push(mToday);
      labels.push(this.daysOfWeek[mToday.getDay()]);

      const scores = this.props.rounds
        .filter(round => {
          mToday.getYear() === round.date.getYear() &&
            mToday.getMonth() === round.date.getMonth() &&
            mToday.getDate() === round.date.getDate();
        })
        .map(round => {
          round.correct;
        });

      if (scores.length === 0) {
        dataPoints.push(0);
      } else {
        const avgScore =
          scores.reduce((prev, curr) => prev + curr) / scores.length;
        dataPoints.push(avgScore);
      }
    }

    console.log(datesToChart);
    console.log(labels);
    console.log("dataPoints", dataPoints);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Score per Round",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} />
      </div>
    );
  }
}
