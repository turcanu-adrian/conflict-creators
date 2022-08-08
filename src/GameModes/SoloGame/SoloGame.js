import React, { useEffect, useState, useRef } from "react";
import {LoadingScreen, JoinPhase, AnswerPhase} from '../Phases.js';
import { getChat, getQuestions } from "../helperFunctions.js";
import { joinFunction } from "./SoloGameLogic.js";

const SoloGame = () => {
    const [currentPhase, setPhase] = useState('loading');
    const [joiners, setJoiners] = useState([]);

    const chat = useRef(null);
    const questions = useRef(null);

    const phases = Object.freeze({
        loading: <LoadingScreen/>,
        join: <JoinPhase joiners={joiners}/>,
        answers:<AnswerPhase/>
    });

    const phasesFunctions = Object.freeze({
        join: ((tags, message)=> joinFunction(tags,message,joiners,setJoiners))
    })

    useEffect(() => {
        getChat()
            .then ((response) => {
                chat.current=response; //INITIALIZE CHAT LISTENER
            })
            .then (() =>{
                setPhase('join');
                chat.current.on('message', (channel, tags, message, self) => {
                    if (self)
                        return;
                    phasesFunctions[currentPhase](tags, message); //DO GAME LOGIC OF CURRENT PHASE
                });
            })
    }, [])

    return (phases[currentPhase])
}


export {SoloGame}