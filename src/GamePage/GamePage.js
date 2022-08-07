import { useState } from "react";
import { StreamerProfile } from "./StreamerProfile";
import { MainMenu } from "./MainMenu";
import { SoloGame } from "../GameModes/SoloGame";

const GamePage = () =>
{
    const [currentState, setGameState] = useState('mainMenu');
    
    const states = Object.freeze({
        mainMenu: <MainMenu changeState={setGameState}/>,
        soloGame: <SoloGame changeState={setGameState}/>
    })

    return (<>
    <StreamerProfile/>
    {states[currentState]}
    </>)
}

export {GamePage}