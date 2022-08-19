import { useEffect, useState } from "react";
import { Timer } from "../../GamePage/Components/Timer";
import { Question } from "../../GamePage/Components/Question";
import { Answers } from "../../GamePage/Components/Answers";
import { StreamerInput } from "../../GamePage/Components/StreamerInput";


const StreamerAnswerPhase = (props) => {
    const [lastAnswer, setLastAnswer] = useState(undefined);

    let revealedAnswers = 0;
    props.gameVars['chatAnswers'].forEach(answer => {
        if (props.gameVars['playerAnswers'].includes(answer[0]))
            revealedAnswers++;
    }); 

    function addAnswer(answer){

    }

    useEffect(() => {
        if (revealedAnswers === props.gameVars['chatAnswers'].length){
            props.gameVars['chatAnswers'].forEach(answer => {
                if (props.gameVars['playerAnswers'].includes(answer[0]))
                    props.gameVars['playerStats'][props.gameVars['currentPlayer']]['roundPoints']+=answer[1];
            }); 
            props.updatePhase('roundEnd');
    }}, [revealedAnswers])

    function onEnter(){

    }

    function timerFinish(){
        onEnter();
    }

    const inputPlaceholder = 'test';
    const inputDisabled = props.gameVars['playerStats']['streamerPlayer']['strikes'] === process.env.REACT_APP_MAX_STRIKES ? true : false;

    return (<>
        <Timer key={lastAnswer} timerFinish={timerFinish} timerStart={20}/>
        <Question question={props.gameVars['currentQuestion']}/>
        <Answers gameVars={props.gameVars}/>
        <StreamerInput gameVars={props.gameVars} disabled={false} placeholder={inputPlaceholder} onEnter={onEnter}/>
    </>)
}

export { StreamerAnswerPhase }