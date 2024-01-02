// src/components/LoginForm.js
import React, { useRef } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Link } from '@mui/material';
import { postDataRequest } from '../../Axios/dataRequests';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import ShowMessage from '../Notifications/Toastify';

const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '0px 20px 20px 0px',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    '@media (max-width: 600px)': {
        width: '90%',
    },
});

const InputField = styled(TextField)({
    width: '100%',
    margin: '8px 0',
});

const SubmitButton = styled(Button)({
    width: '100%',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
        backgroundColor: '#45a049',
    },
});

const ActionContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '16px',
});

const ForgotPasswordLink = styled(Link)({
    color: '#4CAF50',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const RegisterLink = styled(Link)({
    color: '#2196F3',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const LoginForm = () => {
    //Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //ImputRefs
    const usernameREF = useRef(null);
    const passwordREF = useRef(null);

    //Functions and Methods
    const handleClickLoginButton = async () => {
        if (usernameREF.current.value === null || usernameREF.current.value === '' || usernameREF.current.value === undefined) return alert('Please Fill Username or Email field')
        else if (passwordREF.current.value === null || passwordREF.current.value === '' || passwordREF.current.value === undefined) return alert('Please Fill Password field')
        else {
            const userData = await postDataRequest('Auth/Login', { UserName: usernameREF.current.value, Password: passwordREF.current.value })
            if (userData.status === 200) {
                dispatch(login(userData));
                ShowMessage('Login Success', 'Success');
                await navigate('/');
            } else {
                ShowMessage('Error', userData.Message);
            }
        }
    }

    return (
        <FormContainer>
            <h2 style={{ marginBottom: '16px' }}>Sign in</h2>
            <InputField
                inputRef={usernameREF}
                label="Username or Email"
                variant="outlined"
                margin="normal"
                required
                id="username"
            />
            <InputField
                inputRef={passwordREF}
                label="Password"
                variant="outlined"
                margin="normal"
                required
                id="password"
                type="password"
            />
            <SubmitButton onClick={handleClickLoginButton} variant="contained">SIGN IN</SubmitButton>
            <ActionContainer>
                <ForgotPasswordLink href="#" onClick={(e) => e.preventDefault()}>
                    Şifrenizi unuttuysanız?
                </ForgotPasswordLink>
                <RegisterLink href="#" onClick={(e) => e.preventDefault()}>
                    Üye değil misiniz? Üye Ol
                </RegisterLink>
            </ActionContainer>
        </FormContainer>
    );
};

export default LoginForm;
