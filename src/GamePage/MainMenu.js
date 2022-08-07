const MainMenu = (props) => {
     Ma
    return (<>
        <div className='centeredText'>
            <div>Choose gamemode</div>
            <button onClick={() => props.changeState('soloGame')}>Parasocial Confrontation</button>
        </div>
    </>)
}

export {MainMenu}