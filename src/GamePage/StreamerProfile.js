const StreamerProfile = () => {
    const profilePic = new Image().src = sessionStorage['profilepic']

    return (<>
        <div className='streamerProfile'>
            <div>{sessionStorage['display_name']}</div>
            <div><img src={profilePic} alt='streamerPic'/></div>
        </div>
    </>)
}

export {StreamerProfile}