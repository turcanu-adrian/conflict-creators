import { forwardRef } from "react";

const LoadingScreen = () =>
{
    return (
        <div className='centeredText'>
            <img src={process.env.REACT_APP_LOADING_SCREEN} alt='loadingScreen'/>
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

}

export {LoadingScreen, JoinPhase, AnswerPhase}