import quizLogo from "../assets/quiz-logo.png";

const Header = function () {
  return (
    <header>
      <img src={quizLogo} alt="Quiz Logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
};

export default Header;
