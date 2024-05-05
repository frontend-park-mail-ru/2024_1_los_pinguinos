import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import MainPage from '../pages/main/main';
import ChatPage from '../pages/chats/chats';
import MatchesPage from '../pages/matches/matches';

import { Profile } from '../pages/profile/profile';
const App = () => {
    return (
        <Router>
            <Route path="/" component={Landing} />
            <Route path="/main" component={MainPage} isSecure={true} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chats" component={ChatPage} isSecure={true} />
            <Route path="/matches" component={MatchesPage} isSecure={true} />
            <Route path="/profile" component={Profile} />
        </Router>
    );
};

export default App;
