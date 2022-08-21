const PlayerProfile = (props) => {
    const profilePic = new Image().src = process.env.REACT_APP_PARASOCIAL_ICON_LARGE;
    const playerStrikes = [...Array(props.playerStats['chatPlayer']['strikes'])].map((element, index) => {
        return <span key={index}>❌</span>
    });
    
    return (<>
        <div className='playerProfile'>
            <div>{props.chatPlayer}</div>
            <div><img src={profilePic} alt='playerPic'/></div>
            <div id='lastAnswerRight'><span>{props.playerStats['chatPlayer']['lastAnswer']}</span></div>
        </div>
        <div id="rightStats">
            <div>Round points: {props.playerStats['chatPlayer']['roundPoints']}</div>
            <div>Total points: {props.playerStats['chatPlayer']['totalPoints']}</div>
            <div>Strikes: {playerStrikes}</div>
        </div>
    </>)
}

export {PlayerProfile}