import React from "react";
const Chart = ({ entry }) => {
  var avg = 0;
  let length = entry.length * 8;
  var avg_dur = 0;
  const averageTime = () => {
    entry.map(({ duration }) => {
      avg += parseInt(duration);
      //return avg / length;
      avg_dur = Math.round((avg / length) * 100);
      //console.log(avg_dur);
      return avg_dur;
    });
  };

  averageTime();

  return (
    <div className="chart">
      <div className="averageScore">
        <p>Your average sleep percentage is {avg_dur} %</p>
      </div>
      <div className="comment">
        {avg_dur < 70
          ? "You should get some more sleep"
          : "Your sleep average is good"}
      </div>
    </div>
  );
};
export default Chart;
