// eslint-disable-next-line
import HackTimer from "hacktimer";
import React, { useEffect, useState, useRef } from "react";
import { LoadingPhase, JoinPhase, AnswerPhase } from "../Phases/Phases.js";
import { joinPhaseFunction, answerPhaseFunction } from "../Phases/Phases.js";
import {  getChat, getQuestions } from "../helperFunctions.js";

const SoloGame = () => {
  const [currentPhase, setPhase] = useState('loading');
  // eslint-disable-next-line
  const [timer, setTimer] = useState(0);

  const chatSubmitters=useRef([]);
  const questions=useRef(null);
  const phaseRef=useRef(currentPhase);
  const chatPlayer=useRef(null);
  const currentQuestion=useRef(null);
  const chatAnswers=useRef({})

  function updatePhase(newPhase){
    phaseRef.current = newPhase;
    setPhase(phaseRef.current);
  }

  function setChatPlayer(joiner){
    chatPlayer.current=joiner;
  }
  
  function setCurrentQuestion(){
    currentQuestion.current=questions.current[Math.floor(Math.random()*questions.current.length)]; //GENERATE RANDOM QUESTION
  }

  function setAnswers(x){
    chatAnswers.current=x;
    console.log(chatAnswers.current);
  }



  const phaseElement = Object.freeze({
      loading: <LoadingPhase/>,
      join: <JoinPhase updatePhase={updatePhase} joiners={chatSubmitters.current} setChatPlayer={setChatPlayer} setCurrentQuestion={setCurrentQuestion}/>,
      answer:<AnswerPhase updatePhase={updatePhase} question={currentQuestion.current} answers={chatAnswers.current} setAnswers={setAnswers} chatPlayer={chatPlayer.current}/>
  });

  const phaseFunction = Object.freeze({
      join: (tags, message) => {joinPhaseFunction(tags, message, chatSubmitters.current)},
      answer: (tags, message) => {answerPhaseFunction(tags,message, chatSubmitters.current, chatAnswers.current)}
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