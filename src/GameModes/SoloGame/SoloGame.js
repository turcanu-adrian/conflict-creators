import React, { useEffect, useState, useRef } from "react";
import {LoadingScreen, JoinPhase, AnswerPhase} from '../Phases.js';
import { getChat/* , getQuestions */ } from "../helperFunctions.js";
import { joinFunction } from "./SoloGameLogic.js";

const SoloGame = () => {
    const [currentPhase, setPhase] = useState('loading');
    const [joiners, setJoiners] = useState([]);

    const phases = Object.freeze({
        loading: {
            element: <LoadingScreen/>,
            func: () => {return}
        },
        join: {
            element: <JoinPhase joiners={joiners}/>,
            func: (tags,message) => {
                console.log('joiners inside frozen enum are ' + joiners);
                joinFunction(tags,message,joiners,setJoiners) 
            }
        },
        answers: {
            element: <AnswerPhase/>
        }
    });

    const chat = useRef(null);

    useEffect(() => {
        console.log('IN CONSTRUCTOR');
        getChat()
            .then ((response) => {
                chat.current=response; //INITIALIZE CHAT LISTENER
            })
            .then (() =>{
                chat.current.on('message', (channel, tags, message, self) => {
                    console.log(message);
                    if (self)
                        return;
                    phases['join'].func(tags,message);
                });
                setPhase('join');
            })
    }, []);

    return (phases[currentPhase].element)
}


export {SoloGame}