const Buzzers = (props) => {
    const buzzerOff=new Image().src=process.env.REACT_APP_BUZZER_OFF;
    const buzzerOn=new Image().src=process.env.REACT_APP_BUZZER_ON;

    return (<>
        <div id="leftBuzzer"><img alt='leftbuzzer' src={(props.playerStats['streamerPlayer']['answers'][0] ? buzzerOn : buzzerOff)}/></div>
        <div id="rightBuzzer"><img alt='rightbuzzer' src={(props.playerStats['chatPlayer']['answers'][0] ? buzzerOn : buzzerOff)}/></div>
    </>)

}

export {Buzzers}