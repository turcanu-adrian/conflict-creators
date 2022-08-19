const StreamerProfile = (props) => {
    const profilePic = new Image().src = sessionStorage['profile_pic']

    return (<>
        <div className='streamerProfile'>
            <div>{sessionStorage['display_name']}</div>
            <div><img src={profilePic} alt='streamerPic'/></div>
            <div id='lastAnswerLeft'><span>{props.lastAnswer}</span></div>
        </div>
    </>)
}

export {StreamerProfile}