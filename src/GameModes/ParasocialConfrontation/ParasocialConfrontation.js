// eslint-disable-next-line
import HackTimer from "hacktimer";
import React, { useEffect, useState, useRef } from "react";
import { LoadingPhase, JoinPhase, ChatAnswerPhase, FaceOffPhase, PlayerAnswerPhase, RoundEndPhase, GameEndPhase } from "../Phases/Phases.js";
import { joinPhaseFunction, chatAnswerPhaseFunction, faceOffPhaseFunction, playerAnswerPhaseFunction } from "../Phases/Phases.js";
import {  getChat, getQuestions, initializeVars } from "../helperFunctions.js";
import { StreamerProfile } from "../../GamePage/Components/StreamerProfile.js";
import { PlayerProfile } from "../../GamePage/Components/PlayerProfile.js";

const ParasocialConfrontation = (props) => {
  // eslint-disable-next-line
  const [currentPhase, setPhase] = useState('loading');
  // eslint-disable-next-line
  const [timer, setTimer] = useState(0);
  const gameVars = useRef(initializeVars());
  
  function updatePhase(newPhase){
    gameVars.current['phaseRef'] = newPhase;
    setPhase(gameVars.current['phaseRef']);
  }

  const streamerPoints = gameVars.current['playerStats']['streamerPlayer']['totalPoints'];
  const chatPoints = gameVars.current['playerStats']['chatPlayer']['totalPoints'];
  const winner = (streamerPoints>chatPoints ? sessionStorage['display_name'] : 'Chat');
  const winnerPoints = (streamerPoints>chatPoints ? streamerPoints : chatPoints);

  const phaseElement = Object.freeze({
      loading: <LoadingPhase/>,
      join: <JoinPhase nextPhase={'chatAnswer'} updatePhase={updatePhase} gameVars={gameVars.current}/>,
      chatAnswer:<><PlayerProfile playerStats={gameVars.current['playerStats']} chatPlayer={gameVars.current['chatPlayer']}/><ChatAnswerPhase nextPhase={'faceOff'} updatePhase={updatePhase} gameVars={gameVars.current} answersNumber={8-2*gameVars.current['currentRound']}/></>,
      faceOff:<><PlayerProfile playerStats={gameVars.current['playerStats']} chatPlayer={gameVars.current['chatPlayer']} /><FaceOffPhase nextPhase={'playerAnswer'} updatePhase={updatePhase} addAnswer={addAnswer} gameVars={gameVars.current}/></>,
      playerAnswer: <><PlayerProfile playerStats={gameVars.current['playerStats']} chatPlayer={gameVars.current['chatPlayer']} /><PlayerAnswerPhase nextPhase={'roundEnd'} updatePhase={updatePhase} addAnswer={addAnswer} gameVars={gameVars.current}/></>,
      roundEnd: <><PlayerProfile playerStats={gameVars.current['playerStats']} chatPlayer={gameVars.current['chatPlayer']} /><RoundEndPhase nextPhase={'join'} updatePhase={updatePhase} gameVars={gameVars.current}/></>,
      gameEnd: <GameEndPhase gameVars={gameVars.current} winner={winner} winnerPoints={winnerPoints} changeState={props.changeState}/>
  });

  const phaseFunction = Object.freeze({
      join: (tags, message) => {joinPhaseFunction(tags, message, gameVars.current['chatSubmitters'])},
      chatAnswer: (tags, message) => {chatAnswerPhaseFunction(tags, message, gameVars.current)},
      faceOff: (tags, message) => {faceOffPhaseFunction(tags, message, gameVars.current, addAnswer)},
      playerAnswer: (tags, message) => {playerAnswerPhaseFunction(tags, message, gameVars.current, addAnswer)},
      roundEnd: () => {return;},
      gameEnd: () => {return;}
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
            const questions = [];
            response.forEach(element => questions.push(element.replace('streamername', sessionStorage['display_name'])));
            gameVars.current['questions']=questions; //INITIALIZE QUESTIONS
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

  function addAnswer(answer, player){
    const otherPlayer = (player === 'chatPlayer') ? 'streamerPlayer' : 'chatPlayer';
    const submittedAnswers = gameVars.current['playerAnswers'];
    const answerPosition = gameVars.current['chatAnswers'].find(element => element[0]===answer);
    const wrongAnswer = new Audio('./sounds/wrongAnswer.mp3');
    const correctAnswer = new Audio('./sounds/correctAnswer.mp3');
    wrongAnswer.volume=0.5;
    correctAnswer.volume=0.5;

    gameVars.current['playerStats'][player]['lastAnswer']=answer;

    if (!submittedAnswers.includes(answer))
        {
          submittedAnswers.push(answer);
          gameVars.current['playerStats'][player]['strikes'] += (answerPosition ? 0 : 1);
          if (answerPosition)
            correctAnswer.play();
          else
            wrongAnswer.play();
        }
    else
        {
          gameVars.current['playerStats'][player]['strikes']++;
          wrongAnswer.play();
        }
      
    
      
    if (gameVars.current['playerStats'][otherPlayer]['strikes']===parseInt(process.env.REACT_APP_MAX_STRIKES))
      {
        gameVars.current['currentPlayer'] = answerPosition ? player : otherPlayer;
        gameVars.current['chatAnswers'].forEach(answer => {
          if (gameVars.current['playerAnswers'].includes(answer[0]))
            gameVars.current['playerStats'][gameVars.current['currentPlayer']]['roundPoints']+=answer[1];
        });
        updatePhase('roundEnd');
        return;
      }
      
    gameVars.current['currentPlayer'] = (gameVars.current['playerStats'][player]['strikes']===parseInt(process.env.REACT_APP_MAX_STRIKES) ? otherPlayer : player);
  }


  return (<>
    <StreamerProfile playerStats={gameVars.current['playerStats']}/>
    {phaseElement[gameVars.current['phaseRef']]}
  </>);

}

export { ParasocialConfrontation };