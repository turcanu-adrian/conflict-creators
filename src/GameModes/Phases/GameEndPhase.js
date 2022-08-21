import {Answers} from "../../GamePage/Components/Answers.js";

const GameEndPhase = (props) => {

    return (<>
        <div className="centeredText">
            <div>{props.winner} won the game with {props.winnerPoints} points!</div>
            <button onClick={() => props.changeState('mainMenu')}>Back to Main Menu</button>
        </div>
        <Answers gameVars={props.gameVars}/>
    </>
    )
}

export {GameEndPhase}