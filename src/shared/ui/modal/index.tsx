import './index.css';

const Modal = ({ active, setActive, forced, children }: any) => {
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={forced ? () => {} : () => setActive(false)}
        >
            <div
                className={active ? 'modal__content active' : 'modal__content'}
                onClick={(e: any) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
