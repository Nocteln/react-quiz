import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      return new Error("Unknown action type");
  }
};

export default function App() {
  const [{ questions, status, index }, dispach] = useReducer(
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
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
