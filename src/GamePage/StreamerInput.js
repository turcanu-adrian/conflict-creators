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
            let answer = userInput;
            setUserInput('');
            setDisabled((props.currentPlayer === null ? true : false));
            props.addAnswer(answer.split(" ")[0].toUpperCase(), 'streamerPlayer');
        }
    }
    
    useEffect(() => {
        if (props.currentPlayer==='chatPlayer')
            setDisabled(true);
    }, [props.currentPlayer]);

    return (<input value={userInput} disabled={disabled} onChange={onChange} onKeyDown={onKeyDown} type="text" autoComplete="off" id="streamerInput"></input>)
}

export {StreamerInput}