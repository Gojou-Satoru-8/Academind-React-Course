import { useRef } from "react";

const Answers = function ({ answers, selectedAnswer, answerState, onSelect }) {
  const randomizedAnswers = useRef();

  if (!randomizedAnswers.current) {
    randomizedAnswers.current = [...answers];
    randomizedAnswers.current.sort(() => Math.random() - 0.5);
    // NOTE: As Math.random() returns a value [0,1), sometimes it will be < 0.5 and sometimes
    // more. As such, deducting 0.5 means sometimes we get a -ve, sometimes +ve... Returning that
    // value would mean respectively mean sometimes we don't swap, and rest of the times we swap,
    // effectively leading to a randomized order.
  }
  return (
    <ul id="answers">
      {randomizedAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) cssClass = "selected";
        if ((answerState === "correct" || answerState === "wrong") && isSelected) cssClass = answerState;

        return (
          <li key={answer} className="answer">
            <button className={cssClass} onClick={() => onSelect(answer)} type="button">
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default Answers;
