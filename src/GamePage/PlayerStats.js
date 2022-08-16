const PlayerStats = (props) => {

    const streamerStrikes = [...Array(props.playerStats['streamerPlayer']['strikes'])].map((element, index) => {
        return <span key={index}>❌</span>
    });

    const playerStrikes = [...Array(props.playerStats['chatPlayer']['strikes'])].map((element, index) => {
        return <span key={index}>❌</span>
    });

    return (<>
        <div id="leftStats">
            <div>Round points: {props.playerStats['streamerPlayer']['roundPoints']}</div>
            <div>Total points: {props.playerStats['streamerPlayer']['totalPoints']}</div>
            <div>Strikes:{streamerStrikes}</div>
        </div>
        <div id="rightStats">
            <div>Round points: {props.playerStats['chatPlayer']['roundPoints']}</div>
            <div>Total points: {props.playerStats['chatPlayer']['totalPoints']}</div>
            <div>Strikes: {playerStrikes}</div>
        </div>
    </>
    )
}

export {PlayerStats}