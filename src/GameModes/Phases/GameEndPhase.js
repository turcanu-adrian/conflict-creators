import {Answers} from "../../GamePage/Components/Answers.js";
import {PlayerProfile} from "../../GamePage/Components/PlayerProfile";
import {PlayerStats} from "../../GamePage/Components/PlayerStats";

const GameEndPhase = (props) => {
    const streamerPoints = props.gameVars['playerStats']['streamerPlayer']['totalPoints'];
    const chatPoints = props.gameVars['playerStats']['chatPlayer']['totalPoints'];
    const winner = (streamerPoints>chatPoints ? sessionStorage['display_name'] : 'Chat');
    const winnerPoints = (streamerPoints>chatPoints ? streamerPoints : chatPoints);

    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <PlayerStats playerStats={props.gameVars['playerStats']}/>
        <div className="centeredText">
            <div>{winner} won the game with {winnerPoints} points!</div>
            <button onClick={() => props.changeState('mainMenu')}>Back to Main Menu</button>
        </div>
        <Answers gameVars={props.gameVars}/>
    </>
    )
}

export {GameEndPhase}