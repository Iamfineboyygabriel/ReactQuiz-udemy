import React from "react";

const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🎖️";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "😃";
  else if (percentage > 0) emoji = "😉";
  else emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span className="emoji">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">
        Highscore: <strong>{highscore}</strong> points
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
