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

export {getQuestions, getChat}