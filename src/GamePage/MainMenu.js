const MainMenu = (props) => {
    const siteLogo = new Image().src = process.env.REACT_APP_SITE_LOGO;

    return (<>
        <div className='centeredText'>
            <img src={siteLogo} width='70%' alt='siteLogo'/>
            <div>Choose gamemode</div>
            <button onClick={() => props.changeState('parasocialConfrontation')}>Parasocial Confrontation</button>
        </div>
    </>)
}

export {MainMenu}