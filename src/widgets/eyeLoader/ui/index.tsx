import './index.css';
import { clsx } from '../../../shared/lib/clsx';
const EyeLoader = ({ active, placeholder }: any) => {
    return (
        <div className={clsx('loader-container', !active && 'any--none')}>
            <div className="eye-loader"></div>
            <span className="loader__text">{placeholder}</span>
        </div>
    );
};
export default EyeLoader;
