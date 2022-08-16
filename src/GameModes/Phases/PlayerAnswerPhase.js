import { StreamerInput } from "../../GamePage/StreamerInput.js";
import { Timer } from "../../GamePage/Timer.js";
import {Answers} from "../../GamePage/Answers.js";
import {PlayerProfile} from "../../GamePage/PlayerProfile";
import {PlayerStats} from "../../GamePage/PlayerStats";

function playerAnswerPhaseFunction(tags, message, gameVars, addAnswer){
    const validMessage=message.startsWith('!answer') && tags['display-name'] === gameVars['chatPlayer']
    if (validMessage && gameVars['currentPlayer']==='chatPlayer')
        addAnswer(message.split(' ')[1].toUpperCase(), 'chatPlayer');
}

const PlayerAnswerPhase = (props) => {
    let revealedAnswers = 0;
    props.gameVars['chatAnswers'].forEach(answer => {
        if (props.gameVars['playerAnswers'].includes(answer[0]))
            revealedAnswers++;
    }); 

    if (revealedAnswers === props.gameVars['chatAnswers'].length)
        setTimeout(timerFinish, 2000);

    function timerFinish(){
        props.gameVars['chatAnswers'].forEach(answer => {
            if (props.gameVars['playerAnswers'].includes(answer[0]))
                props.gameVars['playerStats'][props.gameVars['currentPlayer']]['roundPoints']+=answer[1];
        }); 
        props.updatePhase('roundEnd');
    }

    const chattingImg = new Image().src=process.env.REACT_APP_CHATTING_EMOTE;
    const chattingPos = (props.gameVars['currentPlayer']==='streamerPlayer' ? 'chattingLeft' : 'chattingRight')

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <PlayerStats playerStats={props.gameVars['playerStats']}/>
        <Timer timerFinish={timerFinish} timerStart={99}/>
        <div className="centeredText">{props.gameVars['currentQuestion']}<br/>Chat player must answer with !answer (Example: !answer forsen)</div>
        <StreamerInput gameVars={props.gameVars} addAnswer={props.addAnswer}/>
        <Answers gameVars={props.gameVars}/>
        <div id={chattingPos}><img alt='chatting' src={chattingImg}/></div>
    </>)

}

export {PlayerAnswerPhase, playerAnswerPhaseFunction}