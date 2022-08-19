import { useEffect, useState } from "react";

const StreamerInput = (props) => {
    const [userInput, setUserInput] = useState('');

    function onChange(e){
        setUserInput(e.currentTarget.value);
    }

    function onKeyDown(e) {
        if (e.keyCode === 13 && userInput !== null)
        {
            let answer = userInput.toUpperCase().split(' ')[0];
            setUserInput('');

            props.onEnter(answer);
        }
    }
    


    return (<input value={userInput} disabled={props.disabled} onChange={onChange} onKeyDown={onKeyDown} type="text" autoComplete="off" placeholder={props.placeholder} id="streamerInput"></input>)
}

export {StreamerInput}