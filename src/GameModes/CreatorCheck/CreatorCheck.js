import HackTimer from "hacktimer";
import { useState, useEffect, useRef } from "react";
import { getChat, getQuestions } from "../ParasocialConfrontation/helperFunctions";
import { LoadingPhase, ChatAnswerPhase, RoundEndPhase, GameEndPhase } from "../Phases/Phases.js";
import { StreamerAnswerPhase } from "../Phases/StreamerAnswerPhase";
import { chatAnswerPhaseFunction } from "../Phases/Phases.js";
import { initializeVars } from "../ParasocialConfrontation/helperFunctions";

const CreatorCheck = (props) => {
    const [currentPhase, setPhase] = useState('loading');
    const [timer, setTimer] = useState(0);
    const gameVars = useRef(initializeVars());

    function updatePhase(newPhase){
        gameVars.current['currentPhase'] = newPhase;
        setPhase(gameVars.current['currentPhase']);
    }

    const phaseElement = Object.freeze({
        loading: <LoadingPhase/>,
        chatAnswer: <ChatAnswerPhase updatePhase={updatePhase} gameVars={gameVars.current}/>,
        streamerAnswer : <StreamerAnswerPhase updatePhase={updatePhase} gameVars={gameVars.current}/>,
        roundEndPhase: <RoundEndPhase updatePhase={updatePhase} gameVars={gameVars.current}/>,
        gameEnd: <GameEndPhase/>
    });

    useEffect(() => {
        let chat, timerID;
        getChat()
            .then ((response) => {
                chat=response;
            })
            .then(()=> {
                getQuestions()
                    .then((response) => {
                        const questions=[];
                        response.forEach(element => questions.push(element.replace('streamername', sessionStorage['display_name'])));
                        gameVars.current['questions']=questions;
                    })
                    .then (() =>{
                        updatePhase('chatAnswer');
                        chat.on('message', (channel, tags, message, self) => {
                            if (self || gameVars.current['currentPhase'] !== 'chatAnswer')
                              return;
                            else
                                chatAnswerPhaseFunction(tags,message, gameVars.current);
                        })
            })
        })

        timerID=setInterval(() => {setTimer(timer => 1-timer)}, 100);

        return function cleanup()
        {
            clearInterval(timerID);
            chat.disconnect();
        }
    });

    return (phaseElement[gameVars.current['currentPhase']]);

}

export {CreatorCheck}