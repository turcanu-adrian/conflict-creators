import { StreamerInput } from "../../GamePage/StreamerInput.js";
import { Timer } from "../../GamePage/Timer.js";
import {Buzzers} from "../../GamePage/Buzzers.js";
import {Answers} from "../../GamePage/Answers.js";
import {PlayerProfile} from "../../GamePage/PlayerProfile";

function faceOffPhaseFunction(tags, message, gameVars){
    const name = tags['display-name'];
    const answer = message.split(' ')[1].toUpperCase()
    const streamerAnswer = gameVars['playerStats']['streamerPlayer']['faceOffAnswer'];
    const validMessage = message.startsWith('!answer ') && answer;

    if (validMessage && name === gameVars['chatPlayer'] && !gameVars['playerStats']['chatPlayer']['faceOffAnswer'] && streamerAnswer !== answer)
       {
        gameVars['playerStats']['chatPlayer']['faceOffAnswer'] = answer;
        gameVars['playerAnswers'].push(answer);
       }
}

const FaceOffPhase = (props) => {

    function timerFinish(){
        const streamerAnswerPos=props.gameVars['chatAnswers'].findIndex(element => element[0]===props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer']);
        const chatPlayerAnswerPos=props.gameVars['chatAnswers'].findIndex(element => element[0]===props.gameVars['playerStats']['chatPlayer']['faceOffAnswer']);
        props.gameVars['currentPlayer']=(streamerAnswerPos > chatPlayerAnswerPos ? 'streamerPlayer' : 'chatPlayer');
        props.updatePhase('playerAnswer');
    }

    if (props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer'] && props.gameVars['playerStats']['chatPlayer']['faceOffAnswer'])
        setTimeout(timerFinish, 2000);

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <Buzzers playerStats={props.gameVars['playerStats']}/>
        <Timer timerFinish={timerFinish} timerStart={20}/>
        <div className="centeredText">{props.gameVars['currentQuestion']}<br/>Chat player must answer with !answer (Example: !answer forsen)</div>
        <StreamerInput gameVars={props.gameVars} addAnswer={props.addAnswer}/>
        <Answers gameVars={props.gameVars}/>
        <div className="centeredText">FaceOff round! Each player must submit one answer to decide who gets to play the question first.</div>
    </>)
}

export {FaceOffPhase, faceOffPhaseFunction}