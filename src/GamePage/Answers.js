const Answers = (props) => {
    const playerAnswers = [...props.playerStats['streamerPlayer']['answers'], ...props.playerStats['chatPlayer']['answers']];
    const pointsSum = props.chatAnswers.reduce((previousValue, currentValue) => previousValue + currentValue[1], 0);

    const answers = props.chatAnswers.map((answer, index) => {
        const percentage = Math.round(answer[1]*100/pointsSum);
        const correctAnswerStyle={background: 'linear-gradient(to right, #9147ff ' + percentage +'%, #3a3a3c 0%'};
        const wrongAnswerStyle={textAlign: 'center', fontWeight: '100'};

        if (playerAnswers.includes(answer[0]))
            return <div style={correctAnswerStyle} key={index}>{answer[0]} <span>{percentage}% ({answer[1]})</span></div>
        else
            return <div style={wrongAnswerStyle} key={index}>{index+1}</div>
    })

    return (<div id='answersContainer'>
        {answers}
    </div>)
}

export {Answers}