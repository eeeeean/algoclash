import React from 'react';

import {GoogleLogin} from 'react-google-login'
import GitHubLogin from 'react-github-login';

import {refreshTokenSetup} from '../utils/refreshToken'
import {clientIdGoogle} from '../utils/googleAuth'
import {githubClientId, githubRedirectURL} from '../utils/githubAuth'

const googleClientID = clientIdGoogle

const ghClientId = githubClientId
const redirectURL = githubRedirectURL

const Login = (props) => {

    let username;
    let password;

    const usernameInput = (e) => {username = e.target.value}
    const passwordInput = (e) => {password = e.target.value}

    const submitButton = (e) => {
        e.preventDefault()
        const body = {username, password}

        fetch('/user/signup', { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
        .then(res => {
            if (res.status === 200) console.log('POSTED --------------', res.json())})

        props.toggleModal(false);
    }

    const onSuccessGoogle = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        refreshTokenSetup(res)
    }

    const onFailureGoogle = (res) => {
        console.log('[Login failed] res:', res);
    }

    const onSuccessGithub = (res) => {
        console.log('[Login Success] currentUser:', res);
    }
    
    const onFailureGithub = (res) => {
        console.log('[Login failed] res:', res);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Username</h1>
            <input type='text' onChange={usernameInput}/>

            <br/>

            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}}>Password</h1>
            <input type='text' onChange={passwordInput} />
            <br/>
            <button onClick={submitButton} type="button">Confirm</button>

            <br/><br/>

            <GoogleLogin 
                clientId={googleClientID}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
            />

            <GitHubLogin 
                clientId= {ghClientId}
                onSuccess={onSuccessGithub}
                onFailure={onFailureGithub}
                redirectUri={redirectURL}
            />
        </div>
    );
}

export default Login;