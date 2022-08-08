function getQuestions(){
    fetch (process.env.REACT_APP_QUESTIONS)
        .then (response => response.text())
        .then (response => {
            return JSON.parse(response);
        });
}

function getChat(){
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