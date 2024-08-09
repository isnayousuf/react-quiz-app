import { Check, Eye, EyeOff, X } from "lucide-react";
import React, { useState } from "react";
import "../App.css";
import { quiz } from "../Data/questions.ts";
export const Quiz = ({ topic }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [revealCorrectAnswer, setRevealCorrectAnswer] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const topicBasedQuestions = questions.filter((item) => item.topic === topic);
  const { question, choices, correctAnswer } =
    topicBasedQuestions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== topicBasedQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const restartQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setSelectedAnswerIndex(null);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  const quizResult =
    result.score >= topicBasedQuestions.length * 5 * 0.5
      ? "🎉 Congratulations! You nailed it!"
      : "😞 Don't worry, you'll do better next time!";

  const revealAnswer = () => {
    setShowAnswer((prev) => !prev);
    setRevealCorrectAnswer((prev) => !prev);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div key={activeQuestion} className="fade-in">
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(topicBasedQuestions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                style={{
                  backgroundColor:
                    selectedAnswerIndex === index
                      ? answer === correctAnswer
                        ? "#A9F1DF"
                        : "#FFBBBB"
                      : "transparent",
                  color: selectedAnswerIndex === index ? "#000" : "inherit",
                }}
              >
                {answer}
                {selectedAnswerIndex === index && (
                  <>
                    {answer === correctAnswer ? (
                      <Check size={16} strokeWidth={1.25} absoluteStrokeWidth />
                    ) : (
                      <X size={16} strokeWidth={1.25} absoluteStrokeWidth />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          <div>
            <button onClick={revealAnswer} className="answer-cta">
              {revealCorrectAnswer ? (
                <Eye size={20} strokeWidth={1.5} absoluteStrokeWidth />
              ) : (
                <EyeOff size={20} strokeWidth={1.5} absoluteStrokeWidth />
              )}
            </button>
          </div>
          {showAnswer && (
            <p>
              The correct answer is:
              <span className="spaced"> {correctAnswer}</span>
            </p>
          )}

          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === topicBasedQuestions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <div className="result-heading">Result</div>

          <div className="total-question">{quizResult}</div>

          <p>
            Total Question: <span>{topicBasedQuestions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
          <div className="flex-right">
            <button onClick={restartQuiz}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
