import React, { useEffect, useState, useRef } from "react";
import { LoadingPhase, JoinPhase, AnswerPhase } from "../Phases/Phases.js";
import { joinPhaseFunction } from "../Phases/Phases.js";
import {  getChat, getQuestions } from "../helperFunctions.js";

const SoloGame = () => {
  const [currentPhase, setPhase] = useState('loading');
  const [timer, setTimer] = useState(0);

  const joiners=useRef([]);
  const phaseRef=useRef(currentPhase);
  const questions=useRef(null);

  const updatePhase = (newPhase) => {
    phaseRef.current = newPhase;
    setPhase(phaseRef.current);
  }

  const phaseElement = Object.freeze({
      loading: <LoadingPhase/>,
      join: <JoinPhase updatePhase={updatePhase} joiners={joiners.current}/>,
      answer:<AnswerPhase/>
  });

  const phaseFunction = Object.freeze({
      join: (tags, message) => {joinPhaseFunction(tags, message, joiners.current)}
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
  }, [])

  return (phaseElement[phaseRef.current]);

}

export { SoloGame };