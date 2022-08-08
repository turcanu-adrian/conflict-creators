import { forwardRef } from "react";

const LoadingScreen = () =>
{
    const loadingPic = new Image().src=process.env.REACT_APP_LOADING_SCREEN;
    console.log(loadingPic.src)
    return (
        <div className='centeredText'>
            <img src={loadingPic} alt='loadingScreen'/>
            <div>LOADING...</div>
        </div>
    );
}

const JoinPhase = (props, ref) => {
    return (
        <div className='centeredText'>
            <div>Type !join to join</div>
            <div>Players joined so far: {props.joiners}</div>
        </div>
    )
}

const AnswerPhase = () => {
    return (<div>IN ANSWERS PHASE</div>)

}

export {LoadingScreen, JoinPhase, AnswerPhase}