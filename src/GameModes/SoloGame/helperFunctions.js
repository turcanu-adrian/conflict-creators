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
        this.faceOffAnswer = null;
        this.roundPoints = 0;
        this.totalPoints = 0;
        this.strikes = 0;
    }

    let vars = {
        currentRound: 1,
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
        chatPlayer: null,
        playerAnswers: []
    };

    return vars;
}

function resetVars(gameVars){
        const newVars = initializeVars();
        const streamerPoints =  gameVars['playerStats']['chatPlayer']['totalPoints'];
        const playerPoints =  gameVars['playerStats']['streamerPlayer']['totalPoints'];
        gameVars['currentRound']++;
        gameVars['chatSubmitters']=[];
        gameVars['questions']=[];
        gameVars['currentQuestion']=null;
        gameVars['chatAnswers']=[];
        gameVars['playerStats']=newVars['playerStats'];
        gameVars['playerStats']['streamerPlayer']['totalPoints']=streamerPoints;
        gameVars['playerStats']['chatPlayer']['totalPoints']=playerPoints;
        gameVars['currentPlayer']=null;
        gameVars['playerAnswers'] = [];
}

export {getQuestions, getChat, initializeVars, resetVars}