const PlayerProfile = (props) => {
    const profilePic = new Image().src = process.env.REACT_APP_PARASOCIAL_ICON_LARGE;

    return (<>
        <div className='playerProfile'>
            <div>{props.chatPlayer}</div>
            <div><img src={profilePic} alt='playerPic'/></div>
        </div>
    </>)
}

export {PlayerProfile}