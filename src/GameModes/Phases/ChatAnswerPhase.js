import {Timer} from "../../GamePage/Timer";
import {PlayerProfile} from "../../GamePage/PlayerProfile";
import {Question} from "../../GamePage/Question";

function chatAnswerPhaseFunction(tags, message, gameVars){
    function getOccurence(array, value){
        let count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    const name = tags['display-name'];
    if (getOccurence(gameVars['chatSubmitters'], name)<process.env.REACT_APP_MAX_ANSWERS && message.startsWith('!answer') && message.split(' ')[1])
    {
        const answer = message.split(' ')[1].toUpperCase();
        gameVars['chatAnswers'][answer] = isNaN( gameVars['chatAnswers'][answer]) ? 1 :  gameVars['chatAnswers'][answer]+1;
        gameVars['chatSubmitters'].push(name);
    }
}

const ChatAnswerPhase = (props) => {
    
    function timerFinish(){
        if (!props.gameVars['chatSubmitters'].length)
            alert('No one submitted an answer, refresh the page to try again');
        else
        {const x = Object.entries(props.gameVars['chatAnswers']).sort(function(a, b) { //GET TOP 8 ANSWERS
            return b[1] - a[1];
        }).splice(0,(10-2*props.gameVars['currentRound']));
        props.gameVars['chatAnswers']=x;
        props.updatePhase('faceOff');}
    }

    const chatExample = new Image().src=process.env.REACT_APP_CHAT_EXAMPLE;
    
    return (<>
        <PlayerProfile chatPlayer={props.gameVars['chatPlayer']}/>
        <Timer timerFinish={timerFinish} timerStart={60}/>
        <div className="centeredText">Chat survey time!</div>
        <Question question={props.gameVars['currentQuestion']}/>
        <div id="chatExample"><img alt='chatExample' src={chatExample}/></div>
        <div className="centeredText">Type your answer in chat with !answer<br/>Answer can only be 1 word<br/>You may answer up to 3 times, even if you aren't a !join-er</div>
    </>)
}

export {ChatAnswerPhase, chatAnswerPhaseFunction}
