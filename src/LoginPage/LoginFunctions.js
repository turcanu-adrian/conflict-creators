function getProfileData(accessToken){
    fetch(
        'https://api.twitch.tv/helix/users',
        {
            "headers": {
                "Client-ID": process.env.REACT_APP_CLIENT_ID,
                "Authorization": "Bearer " + accessToken
            }
        })
        .then (resp => resp.json())
        .then (resp => {
            setProfileData(resp.data[0]); //SAVE THE LOGIN DATA
            revokeAccessToken(accessToken); //REVOKE THE ACCESS TOKEN FOR SECURITY REASONS
            window.location.href=process.env.REACT_APP_REDIRECT_URL;
        })
        .catch (err => {
            console.log(err);
        });
    }

function setProfileData(data){
    sessionStorage.setItem('login', data['login']);
    sessionStorage.setItem('display_name', data['display_name']);
    sessionStorage.setItem('profile_pic', data['profile_image_url']);
}

function revokeAccessToken(accessToken){
    fetch("https://id.twitch.tv/oauth2/revoke", { 
              body: "client_id="+process.env.REACT_APP_CLIENT_ID+"&token="+accessToken,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST"
            });
}

export {getProfileData}