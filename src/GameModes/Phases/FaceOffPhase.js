import { StreamerInput } from "../../GamePage/Components/StreamerInput.js";
import { Timer } from "../../GamePage/Components/Timer.js";
import {Buzzers} from "../../GamePage/Components/Buzzers.js";
import {Answers} from "../../GamePage/Components/Answers.js";
import {Question} from "../../GamePage/Components/Question";

function faceOffPhaseFunction(tags, message, gameVars){
    const name = tags['display-name'];
    const answer = message.split(' ')[1].toUpperCase()
    const streamerAnswer = gameVars['playerStats']['streamerPlayer']['lastAnswer'];
    const validMessage = message.startsWith('!answer ') && answer;

    if (validMessage && name === gameVars['chatPlayer'] && !gameVars['playerStats']['chatPlayer']['lastAnswer'])
    {
        gameVars['playerStats']['chatPlayer']['lastAnswer'] = (answer === streamerAnswer ? (answer + ' ') : answer);
        if (streamerAnswer !== answer)
            gameVars['playerAnswers'].push(answer);
    }

}

const FaceOffPhase = (props) => {
    const inputDisabled =  props.gameVars['playerStats']['streamerPlayer']['lastAnswer'] ? true : false
    const inputPlaceholder = props.gameVars['playerStats']['streamerPlayer']['lastAnswer'] ? 'Waiting for chat player...' : 'Streamer, type your answer here!'
    

    function timerFinish(){
        const streamerAnswerPos=props.gameVars['chatAnswers'].findIndex(element => element[0]===props.gameVars['playerStats']['streamerPlayer']['lastAnswer']);
        const chatPlayerAnswerPos=props.gameVars['chatAnswers'].findIndex(element => element[0]===props.gameVars['playerStats']['chatPlayer']['lastAnswer']);
        props.gameVars['currentPlayer']=(streamerAnswerPos > chatPlayerAnswerPos ? 'streamerPlayer' : 'chatPlayer');
        props.updatePhase(props.nextPhase);
    }

    function onEnter(answer){
        const correctAnswer = new Audio('./sounds/correctAnswer.mp3');
        correctAnswer.volume=0.5;
        const playerAnswer = props.gameVars['playerStats']['chatPlayer']['lastAnswer'];

        props.gameVars['playerStats']['streamerPlayer']['lastAnswer'] = (answer === playerAnswer ? (answer+' ') : answer);
        if (answer !== playerAnswer)
            props.gameVars['playerAnswers'].push(answer);
    }

    if (props.gameVars['playerStats']['streamerPlayer']['lastAnswer'] && props.gameVars['playerStats']['chatPlayer']['lastAnswer'])
        setTimeout(timerFinish, 2000);

    const chattingImg = new Image().src=process.env.REACT_APP_CHATTING_EMOTE;    
    return (<>
        <Buzzers playerStats={props.gameVars['playerStats']}/>
        <Timer timerFinish={timerFinish} timerStart={20}/>
        <div className="centeredText">FaceOff round!</div>
        <Question question={props.gameVars['currentQuestion']}/>
        <Answers gameVars={props.gameVars}/>
        <StreamerInput gameVars={props.gameVars} onEnter={onEnter} disabled={inputDisabled} placeholder={inputPlaceholder}/>
        <div className="centeredText">Each player must submit one answer to decide who gets to play the question first.<br/>Chat player can answer with !answer</div>
        <div id='chattingLeft'><img alt='chatting' src={chattingImg}/></div>
        <div id='chattingRight'><img alt='chatting' src={chattingImg}/></div>
    </>)
}

export {FaceOffPhase, faceOffPhaseFunction}