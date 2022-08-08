import { forwardRef } from "react";

const LoadingScreen = () =>
{
    const loadingPic = new Image().src=process.env.REACT_APP_LOADING_SCREEN;
    return (
        <div className='centeredText'>
            <img src={loadingPic} alt='loadingScreen'/>
            <div>LOADING...</div>
        </div>
    );
}

const JoinPhase = (props) => {
    return (
        <div className='centeredText'>
            <div>Type !join to join</div>
            <div>Players joined so far: {props.joiners.length}</div>
            <div id="chatterName"><img alt='parasocial' src={process.env.REACT_APP_PARASOCIAL_ICON}/>{props.joiners[props.joiners.length-1]}</div>
        </div>
    )
}

const AnswerPhase = () => {
    return (<div>IN ANSWERS PHASE</div>)

}

export {LoadingScreen, JoinPhase, AnswerPhase}