import { useEffect, useState } from "react";

const StreamerInput = (props) => {
    const [userInput, setUserInput] = useState('');
    const [disabled, setDisabled] = useState(false);

    function onChange(e){
        setUserInput(e.currentTarget.value);
    }

    function onKeyDown(e) {
        if (e.keyCode === 13 && userInput !== null)
        {
            let answer = userInput.toUpperCase().split(' ')[0];
            setUserInput('');
            setDisabled((props.gameVars['currentPlayer'] === null ? true : false));
            
            if (props.gameVars['phaseRef']==='faceOff' && props.gameVars['playerStats']['chatPlayer']['faceOffAnswer'] !== answer)
               { 
                props.gameVars['playerStats']['streamerPlayer']['faceOffAnswer'] = answer;
                props.gameVars['playerAnswers'].push(answer);
            }
            else
                props.addAnswer(answer,  'streamerPlayer');
        }
    }
    
    useEffect(() => {
        if (props.gameVars['currentPlayer']==='chatPlayer')
            setDisabled(true);
        else
            setDisabled(false);
            // eslint-disable-next-line
    }, [props.gameVars['currentPlayer']]);

    return (<input value={userInput} disabled={disabled} onChange={onChange} onKeyDown={onKeyDown} type="text" autoComplete="off" placeholder="Streamer answer here" id="streamerInput"></input>)
}

export {StreamerInput}