import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
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
      return { ...state, index: state.index + 1, answer: null };
    default:
      return new Error("Unknown action type");
  }
};

export default function App() {
  const [{ questions, status, index, answer }, dispach] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispach({ type: "dataReceived", payload: data }))
      .catch((err) => dispach({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispach} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispach}
              answer={answer}
            />
            <NextButton dispatch={dispach} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
