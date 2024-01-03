import { useEffect, useReducer } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Main from "../components/Main";
import StartScreen from "../components/StartScreen";
import Question from "../components/Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

//this is where we start all our piece of state
const initialState = {
  questions: [],
  //5 diffrent status that an application can have 'loading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

//then we create an action in our reducer below
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      //here we are using the state based on the current question index
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "Restart":
      return {
        ...state,
        points: 0,
        highscore: 0,
        index: 0,
        answer: null,
        status: "ready",
        //or
        //...initialstate,
        //questions:state.questions,
        //status:"ready"
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  //here we trying to get the number of questions available, then we pass it as a prop to the component where we need it which is the StartScreen Component
  const numQuestions = questions.length;

  //here we calculate the highest number of point a user can get
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  //standard logic to fetch a data tho the async function is missing

  useEffect(function () {
    fetch("http://localhost:9000/questions") //here we stored the data in a fake api
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

//standard logic to fetch a data tho the async function is missing
//  useEffect(function () {
//   fetch("http://localhost:9000/questions")
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.error("Error"));
// }, []);

//to install json server package we use npm i json-server. ie. to create a fake api(dont forget we have the questions in the data folder)...then we went to our oackage .json to add "server":"json-server --watch data/question.json"

//1)after fetching the data

//2) we use state to display it to the user interface..(mind you , we ar making use of useReducer here in place of the normal use state)

//3)the first thing we did was to declare the reducer function which is (function reducer(state, action) {})

//4)then we create the initial state of everything which is (const initialState = {questions: [],};)

//5)then we make use of it in the component like this (  const [state, dispatch] = useReducer(reducer, initialState);)

//6) before displaying to the ui
// const initialState = {
//   questions: [],
//   status: "loading",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataReceived":
//       return {
//         ...state,
//         questions: action.payload,
//         status: "ready",
//       };
//     case "dataFailed":
//       return {
//         ...state,
//         status: "error",
//       };
//     default:
//       throw new Error("Action uknown");
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   //standard logic to fetch a data tho the async function is missing
//   useEffect(function () {
//     fetch("http://localhost:9000/questions")
//       .then((res) => res.json())
//       .then((data) => ({ type: "dataReceived", payload: data }))
//       .catch((err) => ({ type: "dataFailed" }));
//   }, []);
