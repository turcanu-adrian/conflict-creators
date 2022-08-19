// eslint-disable-next-line
import HackTimer from "hacktimer";
import { useEffect } from "react";
import { useState } from "react";
import useWebAnimations from "@wellyshen/use-web-animations"; 


const Timer = (props) => {    
    return (<div onClick={props.timerFinish} id='timer'>
                <svg>
                    <TimerText duration={props.timerStart*1000}/>
                    <TimerCircle duration={props.timerStart*1000} timerFinish={props.timerFinish}/>
                </svg>
            </div>)
}

const TimerText = (props) => {
    const [counter, setCounter] = useState(props.duration/1000);

    const { ref } = useWebAnimations({
        keyframes:[
            { fill: 'lightgreen'},
            { fill: 'yellow'},
            { fill: 'red'},
        ],
         animationOptions: {
            duration: props.duration,
         },
    }); //TIMER TEXT ANIMATION
    
    useEffect(() => {
        const timer = counter > 0 && setTimeout(() => setCounter(counter-1), 1000);
        return () => clearTimeout(timer);
    }, [counter])


    return (<svg ref={ref}>
        <text x='50%' textAnchor='middle'>CLICK ON TIMER TO SKIP IT</text>
        <text x='50%' y='53%' dominantBaseline="middle"  textAnchor="middle">{counter}</text>
    </svg>)
}


const TimerCircle = (props) => {

    const { ref } = useWebAnimations({
        keyframes:[
            { stroke: 'lightgreen', strokeDashoffset: '0vw'},
            { stroke: 'yellow'},
            { stroke: 'red', strokeDashoffset: '25vw'},
        ],
         animationOptions: {
            duration: props.duration,
         },
        onFinish: () => {
            props.timerFinish();
        }
    }); //TIMER CIRCLE ANIMATION


    return (<circle ref={ref}></circle>)

}

export {Timer}