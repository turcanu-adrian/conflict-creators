export const LoadingPhase = () =>
{
    const loadingPic = new Image().src=process.env.REACT_APP_LOADING_SCREEN;
    return (
        <div className='centeredText'>
            <img src={loadingPic} alt='loadingScreen'/>
            <div>LOADING...</div>
        </div>
    );
}
