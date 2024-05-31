import { clsx } from '../../../shared/lib/clsx/index';
import './index.css';

type TUserPhoto = {
    size: 's' | 'm' | 'l';
    premium: boolean;
    url: any;
};

const UserPhotoWidget = ({ size, premium, url }: TUserPhoto) => {
    return (
        <div className={clsx(premium && 'photo-container--premium')}>
            <img
                src={url}
                alt="User Photo"
                className={clsx('user-photo', `user-photo--${size}`)}
            />
            <span
                className={clsx(
                    'premium-icon icon-stars',
                    !premium && 'any--none',
                )}
            ></span>
        </div>
    );
};
export default UserPhotoWidget;
