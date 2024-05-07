import './index.css';
import App from './src/app/app';
import { checkAuth } from './src/entities/session/api/index';
import { render } from './src/reactor/index';
checkAuth();
const rootElement = document.getElementById('root');
render(<App />, rootElement);
