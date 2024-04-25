import './index.css';
import {render} from './src/reactor/index'
import { Application } from './src/components/app/app'

const rootElement = document.getElementById('root');
render(<Application />, rootElement);