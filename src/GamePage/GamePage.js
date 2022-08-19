import { useState } from "react";
import { MainMenu } from "./MainMenu";
import { ParasocialConfrontation } from "../GameModes/SoloGame/SoloGame.js";
import {StreamerProfile} from "./Components/StreamerProfile.js";

const GamePage = (props) =>
{
    const [currentState, setGameState] = useState('mainMenu');

    const states = Object.freeze({
        mainMenu: <MainMenu changeState={setGameState}/>,
        parasocialConfrontation: <ParasocialConfrontation changeState={setGameState}/>
    })

    return (<>
    <StreamerProfile/>
    {states[currentState]}
    </>)
}

export {GamePage}