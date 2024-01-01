import { useEffect } from "react";

function Timer({ dispatch, secondsRmaining }) {
  const mins = Math.floor(secondsRmaining / 60);
  const seconds = secondsRmaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
