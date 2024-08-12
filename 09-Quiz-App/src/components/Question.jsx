import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

const Question = function () {
  return (
    <div id="question">
      <QuestionTimer timeout={5000} onTimeout={handleSkipAnswer} key={activeQuestionId} />
      <h2>{QUESTIONS.at(activeQuestionId).text}</h2>
      <Answers
        key={activeQuestionId * 10}
        answers={QUESTIONS.at(activeQuestionId).answers}
        selectedAnswer={userAnswers.at(-1)}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
