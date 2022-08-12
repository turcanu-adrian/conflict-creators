// eslint-disable-next-line
import HackTimer from "hacktimer";
import React, { useEffect, useState, useRef } from "react";
import { LoadingPhase, JoinPhase, ChatAnswerPhase, FaceOffPhase } from "../Phases/Phases.js";
import { joinPhaseFunction, chatAnswerPhaseFunction, faceOffPhaseFunction } from "../Phases/Phases.js";
import {  getChat, getQuestions } from "../helperFunctions.js";

const SoloGame = () => {
  const [currentPhase, setPhase] = useState('loading');
  // eslint-disable-next-line
  const [timer, setTimer] = useState(0);

  const chatSubmitters=useRef([]);
  const questions=useRef(null);
  const phaseRef=useRef(currentPhase);
  const currentQuestion=useRef(null);
  const chatAnswers=useRef({});
  const playerStats=useRef({
    streamer : {
      answers: [],
      roundPoints: 0,
      totalPoints: 0,
      strikes: 0
    },
    chatPlayer: {
      answers: [],
      roundPoints: 0,
      totalPoints: 0,
      strikes: 0
    }
  });

  const currentPlayer=useRef(null);
  const chatPlayer=useRef();

  function updatePhase(newPhase){
    phaseRef.current = newPhase;
    setPhase(phaseRef.current);
  }

  function setCurrentPlayer(player){
      currentPlayer.current=player;
  }

  function setChatPlayer(joiner){
    chatPlayer.current=joiner;
  }
  
  function setCurrentQuestion(){
    currentQuestion.current=questions.current[Math.floor(Math.random()*questions.current.length)]; //GENERATE RANDOM QUESTION
  }

  function setChatAnswers(x){
    chatAnswers.current=x;
  }

  function addAnswer(answer, player){
    if (![...playerStats.current['streamer']['answers'], ...playerStats.current['chatPlayer']['answers']].includes(answer)) //CHECK IF ANSWER IS ALREADY SUBMITTED
      {
        playerStats.current[player]['answers'].push(answer);
        if (Object.values(chatAnswers.current).findIndex(element => element[0]===answer)>-1){ //CHECK IF ANSWER IS IN TOP 8
          const answerPoints = Object.values(chatAnswers.current).find(element => element[0]===answer)[1];
          const chatPlayerStats = playerStats.current['chatPlayer'];
          const streamerStats = playerStats.current['streamer'];

          playerStats.current[player]['roundPoints'] += answerPoints;
          if ((player==='streamer') ? (chatPlayerStats['strikes']===process.env.REACT_APP_MAX_STRIKES) : (streamerStats['strikes'] === process.env.REACT_APP_MAX_STRIKES)) //STEALING OTHER PLAYER'S POINTS
            {
              playerStats.current[player]['roundPoints']+=(player==='streamer') ? chatPlayerStats['roundPoints'] : streamerStats['roundPoints'];
              playerStats[(player==='streamer')? 'chatPlayer' : 'streamer']['roundPoints']=0;
            }
        }
          else
            playerStats.current[player]['strikes']+=(phaseRef.current === 'faceOff') ? 0 : 1;

      }
  }

  const phaseElement = Object.freeze({
      loading: <LoadingPhase/>,
      join: <JoinPhase updatePhase={updatePhase} joiners={chatSubmitters.current} setChatPlayer={setChatPlayer} setCurrentQuestion={setCurrentQuestion}/>,
      chatAnswer:<ChatAnswerPhase updatePhase={updatePhase} question={currentQuestion.current} answers={chatAnswers.current} setAnswers={setChatAnswers} chatPlayer={chatPlayer.current}/>,
      faceOff:<FaceOffPhase updatePhase={updatePhase} currentPlayer={currentPlayer.current} setCurrentPlayer={setCurrentPlayer} addAnswer={addAnswer} question={currentQuestion.current} answers={chatAnswers.current} playerStats={playerStats.current}/>
  });

  const phaseFunction = Object.freeze({
      join: (tags, message) => {joinPhaseFunction(tags, message, chatSubmitters.current)},
      chatAnswer: (tags, message) => {chatAnswerPhaseFunction(tags, message, chatSubmitters.current, chatAnswers.current)},
      faceOff: (tags, message) => {faceOffPhaseFunction(tags, message, chatPlayer.current, playerStats.current['chatPlayer']['answers'], addAnswer)}
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
            questions.current=response; //INITIALIZE QUESTIONS
          })
          .then(() => {
            updatePhase('join'); //CHANGE PHASE TO JOIN
          })
          .then (() => {
            chat.on('message', (channel, tags, message, self) => {
              if (self)
                return;
              phaseFunction[phaseRef.current](tags,message); //CALL FUNCTION OF RESPECTIVE PHASE ON EACH MESSAGE
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

  return (phaseElement[phaseRef.current]);

}

export { SoloGame };