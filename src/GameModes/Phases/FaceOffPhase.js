import { StreamerInput } from "../../GamePage/StreamerInput.js";
import { Timer } from "../../GamePage/Timer.js";
import {Buzzers} from "../../GamePage/Buzzers.js";
import {Answers} from "../../GamePage/Answers.js";
import {PlayerProfile} from "../../GamePage/PlayerProfile";

function faceOffPhaseFunction(tags, message, gameVars, addAnswer){
    if (message.startsWith('!answer') && tags['display-name'] === gameVars['chatPlayer'] && gameVars['playerStats']['chatPlayer']['answers'].length === 0)
            addAnswer(message.split(' ')[1].toUpperCase(), 'chatPlayer');
}

const FaceOffPhase = (props) => {

    function timerFinish(){
        const streamerPoints=props.gameVars['playerStats']['streamerPlayer']['roundPoints'];
        const chatPlayerPoints=props.gameVars['playerStats']['chatPlayer']['roundPoints']
        props.gameVars['currentPlayer']=(streamerPoints > chatPlayerPoints ? 'streamerPlayer' : 'chatPlayer');
    }

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <Buzzers playerStats={props.gameVars['playerStats']}/>
        <Timer timerFinish={timerFinish} timerStart={99}/>
        <div className="centeredText">{props.gameVars['currentQuestion']}</div>
        <StreamerInput currentPlayer={props.gameVars['currentPlayer']} addAnswer={props.addAnswer}/>
        <Answers chatAnswers={props.gameVars['chatAnswers']} playerStats={props.gameVars['playerStats']}/>
    </>)
}

export {FaceOffPhase, faceOffPhaseFunction}