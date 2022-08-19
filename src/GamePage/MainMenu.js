import { StreamerProfile } from "./Components/StreamerProfile";

const MainMenu = (props) => {
    const siteLogo = new Image().src = process.env.REACT_APP_SITE_LOGO;

    return (<>
        <StreamerProfile/>
        <div className='centeredText'>
            <img src={siteLogo} width='70%' alt='siteLogo'/>
            <div>Choose gamemode</div>
            <button onClick={() => props.changeState('parasocialConfrontation')}>Parasocial Confrontation</button><br/>
            {/* <button onClick={() => props.changeState('creatorCheck')}>Creator Check</button> */}
        </div>
    </>)
}

export {MainMenu}