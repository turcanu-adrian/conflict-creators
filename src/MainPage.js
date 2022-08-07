import {LoginPage} from './LoginPage/LoginPage.js';
import {GamePage} from './GamePage/GamePage.js';

const MainPage = () =>
{
  const isLoggedIn = (sessionStorage['login'] === undefined ? false : true)

  if (isLoggedIn)
    return (<div id='gameContainer'><GamePage/></div>) 
  else
    return (<div id='gameContainer'><LoginPage/></div>)
}

export {MainPage};