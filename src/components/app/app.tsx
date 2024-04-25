import {Router, Route} from '../Router/Router'
import {Landing} from '../../pages/landing/landing'
import {Login} from '../../pages/login/login';
export const Application = () => {
    return (
        <Router routes={[ 
            { path: '/', component: <Landing /> },
            {path: '/login', component: <Login />}
          ]} /> 
        )
}