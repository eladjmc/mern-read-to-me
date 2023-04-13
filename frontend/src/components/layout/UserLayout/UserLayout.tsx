import { Stack } from '@mui/material';
import { Outlet } from 'react-router';
import Navbar from '../../navbar/Navbar';

const UserLayout = () => {
    return (
        <>
            <Stack sx={{height: 1}}>
                <Navbar />
                <Stack component='section' flexGrow={1}>
                    <Outlet />
                </Stack>
            </Stack>
        </>
    );
};

export default UserLayout;
