const Question = (props) => {
    const questionEmote = new Image().src=process.env.REACT_APP_QUESTION_EMOTE;

    return <div id="question"><img alt='questionemote' src={questionEmote}/><div><div>{props.question}</div></div></div>
}

export {Question}