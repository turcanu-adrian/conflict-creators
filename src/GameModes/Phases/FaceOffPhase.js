import { StreamerInput } from "../../GamePage/StreamerInput";
import { Timer } from "../../GamePage/Timer";

function faceOffPhaseFunction(tags, message, gameVars, addAnswer){
    if (message.startsWith('!answer') && tags['display-name'] === gameVars['chatPlayer'] && gameVars['playerStats']['chatPlayer']['answers'].length === 0)
            addAnswer(message.split(' ')[1].toUpperCase(), 'chatPlayer');
}

const FaceOffPhase = (props) => {

    function timerFinish(){
        const streamerPoints=props.gameVars['playerStats']['streamerPlayer']['roundPoints'];
        const chatPlayerPoints=props.gameVars['playerStats']['chatPlayer']['roundPoints']
        props.gameVars['currentPlayer']=(streamerPoints > chatPlayerPoints ? 'streamerPlayer' : 'chatPlayer');
        console.log(props.gameVars['currentPlayer']);
        console.log(props.gameVars['playerStats']);
    }

    return (<>
        <Timer timerFinish={timerFinish} timerStart={10}/>
        <div className="centeredText">{props.gameVars['currentQuestion']}</div>
        <StreamerInput currentPlayer={props.gameVars['currentPlayer']} addAnswer={props.addAnswer}/>
    </>)
}

export {FaceOffPhase, faceOffPhaseFunction}