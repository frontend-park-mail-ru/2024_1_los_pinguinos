import './index.css';
import App from './src/app/app';
import { render } from './src/reactor/index';
const rootElement = document.getElementById('root');
render(<App />, rootElement);
