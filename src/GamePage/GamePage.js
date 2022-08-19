import { useState } from "react";
import { MainMenu } from "./MainMenu";
import { ParasocialConfrontation } from "../GameModes/ParasocialConfrontation/ParasocialConfrontation.js";
import {CreatorCheck} from "../GameModes/CreatorCheck/CreatorCheck.js";

const GamePage = (props) =>
{
    const [currentState, setGameState] = useState('mainMenu');

    const states = Object.freeze({
        mainMenu: <MainMenu changeState={setGameState}/>,
        parasocialConfrontation: <ParasocialConfrontation changeState={setGameState}/>,
        creatorCheck: <CreatorCheck changeState={setGameState}/>
    })

    return (<>
    {states[currentState]}
    </>)
}

export {GamePage}