import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import MainPage from '../pages/main/main';

export const Application = () => {
    return (
        <Router
            routes={[
                { path: '/', component: <Landing /> },
                { path: '/login', component: <Login /> },
                { path: '/main', component: <MainPage /> },
            ]}
        />
    );
};
