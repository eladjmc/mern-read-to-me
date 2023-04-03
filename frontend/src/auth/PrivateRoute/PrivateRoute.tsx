import { ReactNode, useEffect, useState } from "react";
import { RTMSession } from "../../services/RTMSession";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";

const PrivateRoute = ({ component }: { component: ReactNode }) => {
    const navigate = useNavigate();
    const [isAuthorized] = useState(!!RTMSession.token);
    useEffect(() => {
        if (!isAuthorized) {
            navigate('/login');
        }
    }, [])
    return <>
    {isAuthorized ? component : <CircularProgress color="secondary" />}
    </>;
};

export default PrivateRoute
