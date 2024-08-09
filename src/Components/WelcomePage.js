import React, { useState } from "react";
import "../App.css";
import { quiz } from "../Data/questions.ts";
import { Quiz } from "./Quiz";
import { TOPIC } from "./constants.tsx";
export const WelcomePage = () => {
  const { level, perQuestionScore, questions } = quiz;
  const [startQuiz, setStartQuiz] = useState(false);
  const [topic, setTopic] = useState(TOPIC.HTML);

  const startExam = () => {
    setStartQuiz(true);
  };

  const handleTopicSelection = (value) => {
    switch (value) {
      case TOPIC.HTML:
        setTopic(TOPIC.HTML);
        break;
      case TOPIC.CSS:
        setTopic(TOPIC.CSS);
        break;
      case TOPIC.JAVASCRIPT:
        setTopic(TOPIC.JAVASCRIPT);
        break;
      case TOPIC.REACT:
        setTopic(TOPIC.REACT);
        break;
      case TOPIC.ANGULAR:
        setTopic(TOPIC.ANGULAR);
        break;
      default:
        setTopic(TOPIC.HTML);
    }
  };

  const topicBasedQuestions = questions.filter((item) => item.topic === topic);
  const totalCount = topicBasedQuestions?.length;

  return (
    <div>
      {!startQuiz ? (
        <div className="welcome-container">
          <div>
            <h1>Welcome to the Quiz Platform</h1>
            <div>
              <label className="label">Choose a topic:</label>
              <select
                name="topic"
                id="topic"
                className="topic-select"
                onChange={(e) => {
                  handleTopicSelection(e.target.value);
                }}
              >
                <option value="Html">HTML</option>
                <option value="Css">CSS</option>
                <option value="Javascript">Javscript</option>
                <option value="React">ReactJs</option>
                <option value="Angular">Angular</option>
              </select>
              <div className="flex-gap">
                <p className="label">Topic:</p>
                <p className="value">{topic}</p>
              </div>
              <div className="flex-gap">
                <p className="label">Level:</p>
                <p className="value">{level}</p>
              </div>
              <div className="flex-gap">
                <p className="label">Number of Questions: </p>
                <p className="value">{totalCount}</p>
              </div>

              <div className="flex-gap">
                <p className="label">Marks per Question: </p>
                <p className="value">{perQuestionScore}</p>
              </div>
            </div>
            <div className="flex-right">
              <button onClick={startExam}>Start Quiz</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Quiz topic={topic} />
        </div>
      )}
    </div>
  );
};
