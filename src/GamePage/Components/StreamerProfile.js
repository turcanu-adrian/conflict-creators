const StreamerProfile = (props) => {
    const profilePic = new Image().src = sessionStorage['profile_pic']
    const streamerStrikes = [...Array(props.playerStats['streamerPlayer']['strikes'])].map((element, index) => {
        return <span key={index}>❌</span>
    });

    return (<>
        <div className='streamerProfile'>
            <div>{sessionStorage['display_name']}</div>
            <div><img src={profilePic} alt='streamerPic'/></div>
            <div id='lastAnswerLeft'><span>{props.playerStats['streamerPlayer']['lastAnswer']}</span></div>
        </div>
        <div id="leftStats">
            <div>Round points: {props.playerStats['streamerPlayer']['roundPoints']}</div>
            <div>Total points: {props.playerStats['streamerPlayer']['totalPoints']}</div>
            <div>Strikes:{streamerStrikes}</div>
        </div>
    </>)
}

export {StreamerProfile}