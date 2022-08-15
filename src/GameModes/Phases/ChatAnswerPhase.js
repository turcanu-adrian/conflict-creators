import {Timer} from "../../GamePage/Timer";
import {PlayerProfile} from "../../GamePage/PlayerProfile";

function chatAnswerPhaseFunction(tags, message, gameVars){
    const name = tags['display-name'];
    if (/* !gameVars['chatSubmitters'].includes(name) && */ message.startsWith('!answer') && message.split(' ')[1])
    {
        const answer = message.split(' ')[1].toUpperCase();
        gameVars['chatAnswers'][answer] = isNaN( gameVars['chatAnswers'][answer]) ? 1 :  gameVars['chatAnswers'][answer]+1;
        gameVars['chatSubmitters'].push(name);
    }
}

const ChatAnswerPhase = (props) => {
    
    function timerFinish(){
        const x = Object.entries(props.gameVars['chatAnswers']).sort(function(a, b) { //GET TOP 8 ANSWERS
            return b[1] - a[1];
        }).splice(0,(10-2*props.gameVars['currentRound']));
        props.gameVars['chatAnswers']=x;
        props.updatePhase('faceOff');
    }
    
    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <Timer timerFinish={timerFinish} timerStart={10}/>
        <div className="centeredText">{props.gameVars['currentQuestion']}</div>
        <div className="centeredText">Type your answer in chat with !answer (example: !answer forsen)</div>
    </>)
}

export {ChatAnswerPhase, chatAnswerPhaseFunction}
