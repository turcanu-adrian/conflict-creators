function joinFunction(tags,message,joiners,setJoiners){
    console.log('IN JOIN FUNCTION BEFORE IF JOINERS = ' + joiners)
    if (String(message).startsWith('!join'))
    {  
        setJoiners(joiners+1);
    }       
}

export {joinFunction}