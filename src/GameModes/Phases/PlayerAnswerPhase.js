import { StreamerInput } from "../../GamePage/Components/StreamerInput.js";
import { Timer } from "../../GamePage/Components/Timer.js";
import {Answers} from "../../GamePage/Components/Answers.js";
import { useState, useEffect } from "react";
import {Question} from "../../GamePage/Components/Question";

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

    function onEnter(answer){
        props.addAnswer(answer, 'streamerPlayer');
    }

    useEffect(() => {
        if (revealedAnswers === props.gameVars['chatAnswers'].length){
            props.gameVars['chatAnswers'].forEach(answer => {
                if (props.gameVars['playerAnswers'].includes(answer[0]))
                    props.gameVars['playerStats'][props.gameVars['currentPlayer']]['roundPoints']+=answer[1];
            }); 
            props.updatePhase(props.nextPhase);
    }}, [revealedAnswers])

    if (lastAnswer !== props.gameVars['playerStats'][props.gameVars['currentPlayer']]['lastAnswer'])
        setLastAnswer(props.gameVars['playerStats'][props.gameVars['currentPlayer']]['lastAnswer'])

    function timerFinish(){
        if (props.gameVars['playerStats'][props.gameVars['currentPlayer']]['lastAnswer'] === lastAnswer)
            props.addAnswer('NO ANSWER', props.gameVars['currentPlayer']);
        setLastAnswer(props.gameVars['playerStats'][props.gameVars['currentPlayer']]['lastAnswer'])
    }

    const inputDisabled =  props.gameVars['currentPlayer'] === 'chatPlayer' ? true : false
    const inputPlaceholder = props.gameVars['currentPlayer'] === 'chatPlayer' ? 'Chat player`s turn...' : 'Streamer, type your answer here!'

    const chattingImg = new Image().src=process.env.REACT_APP_CHATTING_EMOTE;
    const chattingPos = (props.gameVars['currentPlayer']==='streamerPlayer' ? 'chattingLeft' : 'chattingRight')

    return (<>
        <Timer key={lastAnswer} timerFinish={timerFinish} timerStart={20}/>
        <Question question={props.gameVars['currentQuestion']}/>
        <Answers gameVars={props.gameVars}/>
        <StreamerInput gameVars={props.gameVars} disabled={inputDisabled} placeholder={inputPlaceholder} onEnter={onEnter}/>
        <div className="centeredText">Chat player can answer with !answer</div>
        <div id={chattingPos}><img alt='chatting' src={chattingImg}/></div>
    </>)

}

export {PlayerAnswerPhase, playerAnswerPhaseFunction}