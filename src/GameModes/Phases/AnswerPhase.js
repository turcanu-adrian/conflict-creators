import {Timer} from "../../GamePage/Timer";


function answerPhaseFunction(tags, message, chatSubmitters, chatAnswers){
    const name = tags['display-name'];
    const answer = message.split(' ')[1];
    if (!chatSubmitters.includes(name) && message.startsWith('!answer') && message.split(' ')[1] !== undefined)
    {
        chatAnswers[answer] = isNaN(chatAnswers[answer]) ? 1 : chatAnswers[answer]+1;
        chatSubmitters.push(name);
    }
}

const AnswerPhase = (props) => {
    
    function timerFinish(){
        const x = Object.assign({}, Object.entries(props.answers).sort(function(a, b) { //GET TOP 8 ANSWERS
            return b[1] - a[1];
        }).splice(0,8));

        props.setAnswers(x);
        props.updatePhase('faceOff');
    }
    
    return (<>
        <Timer timerFinish={timerFinish} timerStart={10}/>
        <div className="centeredText">{props.question}</div>
        <div className="centeredText">Type your answer in chat with !answer (example: !answer forsen)</div>
    </>)
}

export {AnswerPhase, answerPhaseFunction}
