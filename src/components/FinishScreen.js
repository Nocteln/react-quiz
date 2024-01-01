function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percent = (points / maxPoints) * 100;

  let emoji;
  if (percent === 100) emoji = "🎉";
  if (percent >= 70 && percent < 100) emoji = "👌";
  if (percent >= 25 && percent < 70) emoji = "😢";
  if (percent >= 10 && percent < 25) emoji = "😭";

  return (
    <>
      <p className="result">
        {emoji} You scorred <strong>{points}</strong> out of {maxPoints}. Thats{" "}
        {Math.ceil(percent)}%
      </p>
      <p className="highscore">(Highscore : {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        restart
      </button>
    </>
  );
}

export default FinishScreen;
