function joinFunction(tags,message,joiners,setJoiners){
    console.log('IN JOIN FUNCTION WITH MESSAGE = ' + message)
    console.log('IN JOIN FUNCTION BEFORE IF JOINERS = ' + joiners)
    if (String(message).startsWith('!join'))
    {  
        console.log('IN JOIN FUNCTION AFTER IF  JOINERS = ' + joiners)
        console.log('COMBINED ARRAY IS ' + [...joiners, tags['display-name']] )
        setJoiners([...joiners, tags['display-name']]);
    }       
}

export {joinFunction}