import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import MainPage from '../pages/main/main';
import MatchesPage from '../pages/matches/matches';
export const Application = () => {
    return (
        <Router
            routes={[
                { path: '/', component: <Landing /> },
                { path: '/login', component: <Login /> },
                { path: '/main', component: <MainPage /> },
                { path: '/matches', component: <MatchesPage /> },
            ]}
        />
    );
};
