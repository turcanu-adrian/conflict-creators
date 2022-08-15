function getQuestions(){ //RETURNS THE QUESTIONS
    return new Promise((resolve, reject) => {
        fetch (process.env.REACT_APP_QUESTIONS)
        .then (response => response.text())
        .then (response => {
            return resolve(JSON.parse(response));
        });
    })
    
}

function getChat(){ //RETURNS AN INSTANCE OF THE TMI.JS CHAT CLIENT
    const tmi = require('tmi.js');
    const client = new tmi.Client({
        channels: [ sessionStorage.login  ]
    });

    return new Promise((resolve, reject) => {
        client.connect()
            .then(()=>{
                resolve(client);
            });
    })
}

function initializeVars(){
    function PlayerStats(){
        this.answers = [];
        this.roundPoints = 0;
        this.totalPoints = 0;
        this.strikes = 0;
    }

    let vars = {
        chatSubmitters: [],
        questions: [],
        phaseRef: 'loading',
        currentQuestion: null,
        chatAnswers: [],
        playerStats: {
            streamerPlayer: new PlayerStats(),
            chatPlayer: new PlayerStats()
        },
        currentPlayer: null,
        chatPlayer: null
    };

    return vars;
}

export {getQuestions, getChat, initializeVars}