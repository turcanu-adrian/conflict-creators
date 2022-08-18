import { StreamerInput } from "../../GamePage/StreamerInput.js";
import { Timer } from "../../GamePage/Timer.js";
import {Answers} from "../../GamePage/Answers.js";
import {PlayerProfile} from "../../GamePage/PlayerProfile";
import {PlayerStats} from "../../GamePage/PlayerStats";
import { useState, useEffect } from "react";
import {Question} from "../../GamePage/Question";

function playerAnswerPhaseFunction(tags, message, gameVars, addAnswer){
    const validMessage=message.startsWith('!answer') && tags['display-name'] === gameVars['chatPlayer']
    if (validMessage && gameVars['currentPlayer']==='chatPlayer')
        addAnswer(message.split(' ')[1].toUpperCase(), 'chatPlayer');
}

const PlayerAnswerPhase = (props) => {
    const [lastAnswer, setLastAnswer]=useState(undefined);
    let revealedAnswers = 0;
    props.gameVars['chatAnswers'].forEach(answer => {
        if (props.gameVars['playerAnswers'].includes(answer[0]))
            revealedAnswers++;
    }); 

    useEffect(() => {
        if (revealedAnswers === props.gameVars['chatAnswers'].length){
            props.gameVars['chatAnswers'].forEach(answer => {
                if (props.gameVars['playerAnswers'].includes(answer[0]))
                    props.gameVars['playerStats'][props.gameVars['currentPlayer']]['roundPoints']+=answer[1];
            }); 
            props.updatePhase('roundEnd');
    }}, [revealedAnswers])

    if (lastAnswer !== props.gameVars['playerAnswers'][props.gameVars['playerAnswers'].length-1])
        setLastAnswer(props.gameVars['playerAnswers'][props.gameVars['playerAnswers'].length-1])

    function timerFinish(){
        if (props.gameVars['playerAnswers'][props.gameVars['playerAnswers'].length-1] === lastAnswer)
            props.addAnswer('failAnswer'+props.gameVars['playerStats'][props.gameVars['currentPlayer']]['strikes'], props.gameVars['currentPlayer']);
        setLastAnswer(props.gameVars['playerAnswers'][props.gameVars['playerAnswers'].length-1])
    }

    const chattingImg = new Image().src=process.env.REACT_APP_CHATTING_EMOTE;
    const chattingPos = (props.gameVars['currentPlayer']==='streamerPlayer' ? 'chattingLeft' : 'chattingRight')

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <PlayerStats playerStats={props.gameVars['playerStats']}/>
        <Timer key={lastAnswer} timerFinish={timerFinish} timerStart={20}/>
        <Question question={props.gameVars['currentQuestion']}/>
        <Answers gameVars={props.gameVars}/>
        <StreamerInput gameVars={props.gameVars} addAnswer={props.addAnswer}/>
        <div id={chattingPos}><img alt='chatting' src={chattingImg}/></div>
    </>)

}

export {PlayerAnswerPhase, playerAnswerPhaseFunction}