import { useEffect } from "react";
import { useState } from "react"

const Timer = (props) => {
    const [counter, setCounter] = useState(props.timerStart);

    useEffect(() => {
        const timer = counter > 0 && setTimeout(() => setCounter(counter-1), 1000);
        return () => clearTimeout(timer);
    }, [counter])

    return (<div onClick={props.onClick} id='timer60'>
                <svg>
                    <text x='50%' textAnchor='middle'>CLICK ON TIMER TO SKIP IT</text>
                    <text x='50%' y='59%' dominantBaseline="middle"  textAnchor="middle">{counter}</text>
                    <circle cx='50' cy='57' r='52'></circle>
                </svg>
            </div>)
}

export {Timer}