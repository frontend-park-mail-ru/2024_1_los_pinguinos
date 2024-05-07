import { Router, Route } from './Router';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { PageNotFound } from '../pages/notFound/notFound';
import MainPage from '../pages/main/main';
import ChatPage from '../pages/chats/chats';
import MatchesPage from '../pages/matches/matches';
import { createStore } from './store';
import { userReducer } from '../entities/person/model/reducer';
import { Profile } from '../pages/profile/profile';
export const store = createStore(userReducer);

const App = () => {
    return (
        <Router>
            <Route path="/" component={Landing} />
            <Route path="/main" component={MainPage} isSecure={true} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chats" component={ChatPage} isSecure={true} />
            <Route path="/matches" component={MatchesPage} isSecure={true} />
            <Route path="/profile" component={Profile} isSecure={true} />
            <Route path="*" component={PageNotFound} />
        </Router>
    );
};

export default App;
