import {Timer} from "../../GamePage/Timer";


function chatAnswerPhaseFunction(tags, message, chatSubmitters, chatAnswers){
    const name = tags['display-name'];
    if (!chatSubmitters.includes(name) && message.startsWith('!answer') && message.split(' ')[1] !== undefined)
    {
        const answer = message.split(' ')[1].toUpperCase();
        chatAnswers[answer] = isNaN(chatAnswers[answer]) ? 1 : chatAnswers[answer]+1;
        chatSubmitters.push(name);
    }
}

const ChatAnswerPhase = (props) => {
    
    function timerFinish(){
        const x = Object.assign({}, Object.entries(props.answers).sort(function(a, b) { //GET TOP 8 ANSWERS
            return b[1] - a[1];
        }).splice(0,8));
        props.setAnswers(x);
        props.updatePhase('faceOff');
    }
    
    return (<>
        <Timer timerFinish={timerFinish} timerStart={30}/>
        <div className="centeredText">{props.question}</div>
        <div className="centeredText">Type your answer in chat with !answer (example: !answer forsen)</div>
    </>)
}

export {ChatAnswerPhase, chatAnswerPhaseFunction}
