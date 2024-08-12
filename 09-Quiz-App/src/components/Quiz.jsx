import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";

const Quiz = function () {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionId = answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionId === QUESTIONS.length;
  // undefined if questions array exhausted

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prev) => [...prev, selectedAnswer]);

      // 1 second after selecting an answer:
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS.at(activeQuestionId).answers.at(0)) setAnswerState("correct");
        else setAnswerState("wrong");

        // 2 seconds after showing right or wrong:
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionId]
  );

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  return <div id="quiz" />;
};

export default Quiz;
