import { getProfileData } from "./LoginFunctions";

const LoginPage = () =>
{
    const accessToken = new URLSearchParams(window.location.hash.slice(1)).get('access_token'); //EXTRACT ACCESS TOKEN FROM LINK
    const twitchLogo = new Image().src=process.env.REACT_APP_TWITCH_LOGO;
    const siteLogo = new Image().src=process.env.REACT_APP_SITE_LOGO;

    if (accessToken) //IF LINK CONTAINS ACCESS TOKEN
        getProfileData(accessToken);

    return (<>
        <div className="centeredText"><img src={siteLogo} width='70%' alt='siteLogo'/></div>
        <a href={process.env.REACT_APP_AUTH_URL}><div id='loginButton'><img alt='twitchLogo' style={{width: 'auto', maxHeight: '4vw', float: 'left'}} src={twitchLogo}/>Login with Twitch</div></a>
    </>)
}


export {LoginPage}