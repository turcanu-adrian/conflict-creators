import { getProfileData } from "./LoginFunctions";

const LoginPage = () =>
{
    const accessToken = new URLSearchParams(window.location.hash.slice(1)).get('access_token'); //EXTRACT ACCESS TOKEN FROM LINK
    const twitchLogo = new Image().src=process.env.REACT_APP_TWITCH_LOGO;

    if (accessToken) //IF LINK CONTAINS ACCESS TOKEN
        getProfileData(accessToken);

    return <a href={process.env.REACT_APP_AUTH_URL}><div id='loginButton'><img alt='twitchLogo' style={{width: 'auto', maxHeight: '4vw', float: 'left'}} src={twitchLogo}/>Login with Twitch</div></a>;
}


export {LoginPage}