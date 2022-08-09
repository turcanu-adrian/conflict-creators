import { useEffect, useState } from "react";

function joinPhaseFunction(tags, message, joiners){
    joiners.push(tags['display-name']);
    console.log(joiners);
}

const JoinPhase = (props) => {

    useEffect(()=>{
        const timer = setTimeout(() =>{
            console.log('TIME RAN OUT, SWITCHING PHASE');
            props.updatePhase('answer') 
        }, 30000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className='centeredText'>
            <div>TIMER: {props.timer}</div>
            <div>Type !join to join</div>
            <div>Players joined so far: {props.joiners.length}</div>
            <div id="chatterName">
                <img alt='parasocial' src={process.env.REACT_APP_PARASOCIAL_ICON}/>{props.joiners[props.joiners.length-1]}
            </div>
        </div>
    )
}

export {JoinPhase, joinPhaseFunction};