// import React from "react";

// const Progress = ({
//   index,
//   numQuestions,
//   points,
//   maxPossiblePoints,
//   answer,
// }) => {
//   return (
//     <header className="progress">
//       <progress max={numQuestions} value={index + Number(answer !== null)} />
//       <p>
//         Question <strong>{index + 1}</strong>/{numQuestions}
//       </p>
//       <p>
//         <strong>{points}</strong>/{maxPossiblePoints}
//       </p>
//     </header>
//   );
// };

// export default Progress;



import React from "react";
import { useQuiz } from "../context/QuizContext";

const Progress = () => {
  const {
    state: { index, numQuestions, points, maxPossiblePoints, answer },
  } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;

