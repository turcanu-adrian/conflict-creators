function joinFunction(tags,message,joiners,setJoiners){
    if (String(message).startsWith('!join'))
        setJoiners(joiners.push(tags['display-name']));
}

export {joinFunction}