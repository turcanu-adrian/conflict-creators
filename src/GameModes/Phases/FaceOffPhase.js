import { StreamerInput } from "../../GamePage/StreamerInput";
import { Timer } from "../../GamePage/Timer"

function faceOffPhaseFunction(tags, message, chatPlayer, chatPlayerAnswers, addAnswer){
    if (message.startsWith('!answer') && tags['display-name'] === chatPlayer && chatPlayerAnswers.length === 0)
            addAnswer(message.split(' ')[1].toUpperCase(), 'chatPlayer');
}

const FaceOffPhase = (props) => {

    function timerFinish(){
        const streamerPoints=props.playerStats['streamer']['roundPoints'];
        const chatPlayerPoints=props.playerStats['chatPlayer']['roundPoints'];
        props.setCurrentPlayer((streamerPoints > chatPlayerPoints) ? 'streamer' : 'chatPlayer');
    }

    return (<>
        <Timer timerFinish={timerFinish} timerStart={30}/>
        <div className="centeredText">{props.question}</div>
        <StreamerInput currentPlayer={props.currentPlayer} addAnswer={props.addAnswer}/>
    </>)
}

export {FaceOffPhase, faceOffPhaseFunction}