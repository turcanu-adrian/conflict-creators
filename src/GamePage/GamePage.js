import { useState } from "react";
import { MainMenu } from "./MainMenu";
import { SoloGame } from "../GameModes/SoloGame/SoloGame.js";
import {StreamerProfile} from "./StreamerProfile.js";

const GamePage = (props) =>
{
    const [currentState, setGameState] = useState('mainMenu');

    const states = Object.freeze({
        mainMenu: <MainMenu changeState={setGameState}/>,
        soloGame: <SoloGame/>
    })

    return (<>
    <StreamerProfile/>
    {states[currentState]}
    </>)
}

export {GamePage}