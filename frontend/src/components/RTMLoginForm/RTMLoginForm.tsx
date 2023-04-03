import { Box, Button, Link } from '@mui/material';
import RTMTextField from '../RTMTextField/RTMTextField';

import { Link as RouterLink } from 'react-router-dom';
import USERS_API from '../../services/usersApi';
import { RTMSession } from '../../services/RTMSession';

const RTMLoginForm = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const {accessToken} = await USERS_API.login({
            email: data.get('email') as string,
            password: data.get('password') as string,
        });

        RTMSession.token = accessToken;    
    };

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <RTMTextField
                id='email'
                label='Email Address'
                autoComplete='email'
                required
                autoFocus
            />

            <RTMTextField
                required
                id='password'
                type='password'
                autoComplete='current-password'
            />

            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign In
            </Button>
            <Link component={RouterLink} to='/sign-up' variant='body2'>
                {"Don't have an account? Sign Up"}
            </Link>
        </Box>
    );
};

export default RTMLoginForm;
