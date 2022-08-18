const Answers = (props) => {
    const playerAnswers = props.gameVars['playerAnswers'];
    const pointsSum = props.gameVars['chatAnswers'].reduce((previousValue, currentValue) => previousValue + currentValue[1], 0);

    let answers;
    if (props.gameVars['phaseRef']!=='endRound')
        answers = props.gameVars['chatAnswers'].map((answer, index) => {
            const percentage = Math.round(answer[1]*100/pointsSum);
            const style ={
                '--percent': percentage + '%'
            };
            if (playerAnswers.includes(answer[0]))
                return <div className="shownAnswer" style={style} key={index}>{answer[0]} <span>{percentage}% ({answer[1]})</span></div>
            else
                return <div className="hiddenAnswer" key={index}>{index+1}</div>
        })
    else
        answers = props.gameVars['chatAnswers'].map((answer, index) => {
            const percentage = Math.round(answer[1]*100/pointsSum);
            const style ={
                '--percent': percentage + '%'
            };
            return <div className="shownAnswer" style={style} key={index}>{answer[0]} <span>{percentage}% ({answer[1]})</span></div>
        });
        

    return (<div id='answersContainer'>
        {answers}
    </div>)
}



export {Answers}