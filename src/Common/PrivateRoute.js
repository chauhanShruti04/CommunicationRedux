import { Route, Navigate, Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
 
export const PrivateRoute = ({ element: Component, ...rest }) => {

    const loggedInUser = useSelector((state) => state.user.loggedInUser);
    const auth = loggedInUser?.length > 0;
    return auth ? (<><NavBar /> <Outlet /></>) : <Navigate to="/" />;
};