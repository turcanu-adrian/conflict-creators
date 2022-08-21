import { useEffect, useState } from "react";
import { Timer } from "../../GamePage/Components/Timer";
import { Question } from "../../GamePage/Components/Question";
import { Answers } from "../../GamePage/Components/Answers";
import { StreamerInput } from "../../GamePage/Components/StreamerInput";
import { resetVars } from "../helperFunctions";


const StreamerAnswerPhase = (props) => {
    const [lastAnswer, setLastAnswer] = useState(undefined);

    let revealedAnswers = 0;
    props.gameVars['chatAnswers'].forEach(answer => {
        if (props.gameVars['playerAnswers'].includes(answer[0]))
            revealedAnswers++;
    }); 

    function addAnswer(answer){
        const submittedAnswers = props.gameVars['playerAnswers'];
        const answerPosition = props.gameVars['chatAnswers'].find(element => element[0]===answer);
        const wrongAnswer = new Audio('./sounds/wrongAnswer.mp3');
        const correctAnswer = new Audio('./sounds/correctAnswer.mp3');
        wrongAnswer.volume=0.5;
        correctAnswer.volume=0.5;
        const goodAnswer = !submittedAnswers.includes(answer) && answerPosition;

        props.gameVars['playerStats']['streamerPlayer']['strikes'] += (goodAnswer) ? 0 : 1;
        props.gameVars['playerStats']['streamerPlayer']['lastAnswer']=answer;
        
        if (!submittedAnswers.includes(answer))
            submittedAnswers.push(answer);
        
        if (goodAnswer)
            correctAnswer.play();
        else
            wrongAnswer.play();

        if (props.gameVars['playerStats']['streamerPlayer']['strikes'] === parseInt(process.env.REACT_APP_MAX_STRIKES))
                {
                    props.gameVars['chatAnswers'].forEach(answer => {
                        if (props.gameVars['playerAnswers'].includes(answer[0]))
                            props.gameVars['playerStats']['streamerPlayer']['roundPoints']+=answer[1];
                    });
                    resetVars(props.gameVars);
                    props.updatePhase('gameEnd');
                }
    }

    useEffect(() => {
        if (revealedAnswers === props.gameVars['chatAnswers'].length){
            props.gameVars['chatAnswers'].forEach(answer => {
                if (props.gameVars['playerAnswers'].includes(answer[0]))
                    props.gameVars['playerStats']['streamerPlayer']['roundPoints']+=answer[1];
            }); 
            resetVars(props.gameVars);
            props.updatePhase(props.nextPhase);
    }}, [revealedAnswers])

    function onEnter(answer){
        addAnswer(answer);
    }

    if (lastAnswer !== props.gameVars['playerStats']['streamerPlayer']['lastAnswer'])
        setLastAnswer(props.gameVars['playerStats']['streamerPlayer']['lastAnswer'])

    function timerFinish(){
        if (props.gameVars['playerStats']['streamerPlayer']['lastAnswer'] === lastAnswer)
            addAnswer('NO ANSWER');
        setLastAnswer(props.gameVars['playerStats']['streamerPlayer']['lastAnswer']);
    }

    const inputPlaceholder = 'Streamer, type your answer here!';

    return (<>
        <Timer key={lastAnswer} timerFinish={timerFinish} timerStart={20}/>
        <Question question={props.gameVars['currentQuestion']}/>
        <Answers gameVars={props.gameVars}/>
        <StreamerInput gameVars={props.gameVars} disabled={false} placeholder={inputPlaceholder} onEnter={onEnter}/>
    </>)
}

export { StreamerAnswerPhase }