import { Timer } from "../../GamePage/Timer.js";
import {Answers} from "../../GamePage/Answers.js";
import {PlayerProfile} from "../../GamePage/PlayerProfile";
import {resetVars} from "../SoloGame/helperFunctions";
import { PlayerStats } from "../../GamePage/PlayerStats.js";


const RoundEndPhase = (props) => {
    const winner = props.gameVars['currentPlayer'] === 'chatPlayer' ? props.gameVars['chatPlayer'] : sessionStorage['display_name']; 
    const winnerPoints = props.gameVars['currentPlayer'] === 'chatPlayer' ? props.gameVars['playerStats']['chatPlayer']['roundPoints'] : props.gameVars['playerStats']['streamerPlayer']['roundPoints'];

    function timerFinish(){
            if (props.gameVars['currentRound']===parseInt(process.env.REACT_APP_MAX_ROUNDS))
                props.updatePhase('gameEnd');
            else
                {resetVars(props.gameVars);
                props.updatePhase('join');}
        }

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <PlayerStats playerStats={props.gameVars['playerStats']}/>
        <Timer timerFinish={timerFinish} timerStart={30}/>
        <div className="centeredText">CONGRATULATIONS! <br/> {winner} won the round and earned {winnerPoints} points! <br/> Next round starting soon...</div>
        <Answers gameVars={props.gameVars}/>
    </>
    )
}

export {RoundEndPhase}