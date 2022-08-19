import { StreamerInput } from "../../GamePage/Components/StreamerInput.js";
import { Timer } from "../../GamePage/Components/Timer.js";
import {Buzzers} from "../../GamePage/Components/Buzzers.js";
import {Answers} from "../../GamePage/Components/Answers.js";
import {PlayerProfile} from "../../GamePage/Components/PlayerProfile";
import {Question} from "../../GamePage/Components/Question";

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
    const inputDisabled =  props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer'] ? true : false
    const inputPlaceholder = props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer'] ? 'Waiting for chat player...' : 'Streamer, type your answer here!'
    

    function timerFinish(){
        const streamerAnswerPos=props.gameVars['chatAnswers'].findIndex(element => element[0]===props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer']);
        const chatPlayerAnswerPos=props.gameVars['chatAnswers'].findIndex(element => element[0]===props.gameVars['playerStats']['chatPlayer']['faceOffAnswer']);
        props.gameVars['currentPlayer']=(streamerAnswerPos > chatPlayerAnswerPos ? 'streamerPlayer' : 'chatPlayer');
        props.updatePhase('playerAnswer');
    }

    function onEnter(answer){
        props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer'] = answer;
        props.gameVars['playerAnswers'].push(answer);
    }

    if (props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer'] && props.gameVars['playerStats']['chatPlayer']['faceOffAnswer'])
        setTimeout(timerFinish, 2000);

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <Buzzers playerStats={props.gameVars['playerStats']}/>
        <Timer timerFinish={timerFinish} timerStart={20}/>
        <div className="centeredText">FaceOff round!</div>
        <Question question={props.gameVars['currentQuestion']}/>
        <Answers gameVars={props.gameVars}/>
        <StreamerInput gameVars={props.gameVars} onEnter={onEnter} disabled={inputDisabled} placeholder={inputPlaceholder} addAnswer={props.addAnswer}/>
        <div className="centeredText">Each player must submit one answer to decide who gets to play the question first.<br/>Chat player can answer with !answer</div>
    </>)
}

export {FaceOffPhase, faceOffPhaseFunction}