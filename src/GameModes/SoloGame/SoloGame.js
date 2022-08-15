// eslint-disable-next-line
import HackTimer from "hacktimer";
import React, { useEffect, useState, useRef } from "react";
import { LoadingPhase, JoinPhase, ChatAnswerPhase, FaceOffPhase } from "../Phases/Phases.js";
import { joinPhaseFunction, chatAnswerPhaseFunction, faceOffPhaseFunction } from "../Phases/Phases.js";
import {  getChat, getQuestions, initializeVars } from "./helperFunctions.js";

const SoloGame = () => {
  // eslint-disable-next-line
  const [currentPhase, setPhase] = useState('loading');
  // eslint-disable-next-line
  const [timer, setTimer] = useState(0);
  const gameVars = useRef(initializeVars());
  
  function updatePhase(newPhase){
    gameVars.current['phaseRef'] = newPhase;
    setPhase(gameVars.current['phaseRef']);
  }

  function addAnswer(answer, player){
    const otherPlayer = (player === 'chatPlayer') ? 'streamerPlayer' : 'chatPlayer'
    const answerAlreadySubmitted = [...gameVars.current['playerStats']['streamerPlayer']['answers'], ...gameVars.current['playerStats']['chatPlayer']['answers']].includes(answer);
    const playerAnswers = gameVars.current['playerStats'][player]['answers'];
    const answerPosition = gameVars.current['chatAnswers'].find(element => element[0]===answer); //CHECK IF ANSWER IS IN TOP 8
    if (!answerAlreadySubmitted)
      {
        playerAnswers.push(answer);
        if (answerPosition) //IF ANSWER IS IN TOP 8
        {
          const answerPoints = answerPosition[1];
          gameVars.current['playerStats'][player]['roundPoints'] += answerPoints;

          if (gameVars.current['playerStats'][otherPlayer]['strikes']===process.env.REACT_APP_MAX_STRIKES)
          {
            gameVars.current['playerStats'][player]['roundPoints'] += gameVars.current['playerStats'][otherPlayer]['roundPoints']; //STEAL OPPONENT POINTS
            gameVars.current['playerStats'][otherPlayer]['roundPoints'] = 0;
          }
        }
        else
          gameVars.current['playerStats'][player]['strikes'] += (gameVars.current['phaseRef'] === 'faceOff') ? 0 : 1;
      }
  }

  const phaseElement = Object.freeze({
      loading: <LoadingPhase/>,
      join: <JoinPhase updatePhase={updatePhase} gameVars={gameVars.current}/>,
      chatAnswer:<ChatAnswerPhase updatePhase={updatePhase} gameVars={gameVars.current}/>,
      faceOff:<FaceOffPhase updatePhase={updatePhase} addAnswer={addAnswer} gameVars={gameVars.current}/>
  });

  const phaseFunction = Object.freeze({
      join: (tags, message) => {joinPhaseFunction(tags, message, gameVars.current['chatSubmitters'])},
      chatAnswer: (tags, message) => {chatAnswerPhaseFunction(tags, message, gameVars.current)},
      faceOff: (tags, message) => {faceOffPhaseFunction(tags, message, gameVars.current, addAnswer)}
  });

  useEffect(() => {
    let chat, timerID;
    getChat()
      .then((response) => {
        chat=response; //INITIALIZE CHAT LISTENER
      })
      .then(() => {
        getQuestions()
          .then((response) => {
            gameVars.current['questions']=response; //INITIALIZE QUESTIONS
          })
          .then(() => {
            updatePhase('join'); //CHANGE PHASE TO JOIN
          })
          .then (() => {
            chat.on('message', (channel, tags, message, self) => {
              if (self)
                return;
              phaseFunction[gameVars.current['phaseRef']](tags,message); //CALL FUNCTION OF RESPECTIVE PHASE ON EACH MESSAGE
            });
          })
        });

      timerID=setInterval(()=>{setTimer(timer => 1-timer)}, 100); //RE-RENDER TO UPDATE SHOWN DATA

      return function cleanup() //CLEANUP FUNCTION WHEN COMPONENT UNMOUNTS
      {
        clearInterval(timerID);
        chat.disconnect();
      }
      // eslint-disable-next-line
  }, [])

  return (phaseElement[gameVars.current['phaseRef']]);

}

export { SoloGame };