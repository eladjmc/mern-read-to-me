import react from 'react';
import './styles/App.css'
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReadingPage from './pages/ReadingPage/ReadingPage';
import UserLayout from './components/layout/UserLayout/UserLayout';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './auth/PrivateRoute/PrivateRoute';
import { useGlobalTheme } from './context/ThemeContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute component={<UserLayout />} />,
        children: [
            { path: '/', element: <WelcomePage /> },
            {
                path: '/reading',
                element: <ReadingPage />,
            },
            { path: '*', element: <ErrorPage /> },
        ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/sign-up', element: <SignUp /> },
]);

function App() {
    const {theme, setThemeMod} = useGlobalTheme()
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
