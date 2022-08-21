import { Timer } from "../../GamePage/Components/Timer.js";
import {Answers} from "../../GamePage/Components/Answers.js";
import {resetVars} from "../helperFunctions";


const RoundEndPhase = (props) => {
    const winner = props.gameVars['currentPlayer'] === 'chatPlayer' ? props.gameVars['chatPlayer'] : sessionStorage['display_name']; 
    const winnerPoints = props.gameVars['currentPlayer'] === 'chatPlayer' ? props.gameVars['playerStats']['chatPlayer']['roundPoints'] : props.gameVars['playerStats']['streamerPlayer']['roundPoints'];

    function timerFinish(){
            resetVars(props.gameVars);
            if (props.gameVars['currentRound']===parseInt(process.env.REACT_APP_MAX_ROUNDS))
                props.updatePhase('gameEnd');
            else
                props.updatePhase(props.nextPhase);
        }

    return (<>
        <Timer timerFinish={timerFinish} timerStart={30}/>
        <div className="centeredText">CONGRATULATIONS! <br/> {winner} won the round and earned {winnerPoints} points! <br/> Next round starting soon...</div>
        <Answers gameVars={props.gameVars}/>
    </>
    )
}

export {RoundEndPhase}