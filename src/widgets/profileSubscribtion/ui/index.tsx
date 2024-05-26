import { Button } from '../../../shared/ui/index';
import { store } from '../../../app/app';
import { useState } from '../../../reactor/index';
import { formatUnixTimestamp } from '../../../shared/lib/date/index';
import {
    activatePremium,
    getPaymentHistory,
    getPaymentURL,
} from '../../../features/payments/api/index';
import { clsx } from '../../../shared/lib/clsx/index';
import { ConfirmationPopup } from '../../index';

const ProfileSubscribtion = () => {
    const state = store.getState();
    const [subStatus, setSubStatus] = useState(
        state.premium ? state.premium : false,
    );
    const [subExpires, setSubExpires] = useState(
        state.premiumExpires ? state.premiumExpires : 0,
    );

    const activatePremiumCallback = async () => {
        try {
            const response = activatePremium();
            setSubStatus(true);
            setSubExpires(100);
            store.dispatch({
                type: 'UPDATE_USER',
                payload: { premium: true, premiumExpires: response },
            });
        } catch {
            return;
        }
    };
    const currentLocation = window.location.search;
    if (currentLocation.includes('sub=success') && !subStatus) {
        activatePremiumCallback();
    }

    const [active, setActive] = useState(false);
    const [paymentCallback, setCallback] = useState(null);
    const [popupError, setPopupError] = useState('');

    const unsubscribeStatus = store.subscribe(
        (premium: boolean) => {
            setSubStatus(premium);
        },
        ['premium'],
    );

    return (
        <div className="profile__content-column">
            <p className="profile__text">
                Преимущества подписки:{'\n'} - Бесконечные лайки
            </p>
            <p className={clsx('profile__text', subStatus && 'any--none')}>
                В данный момент у вас нет подписки
            </p>
            <p className={clsx('profile__text', !subStatus && 'any--none')}>
                Ваша подписка активна до {formatUnixTimestamp(subExpires)}.
            </p>
            <div className={clsx(subStatus && 'any--none')}>
                <Button
                    label="Оформить подписку - 2₽"
                    size="m"
                    fontSize="m"
                    severity="success"
                    onClick={async () => {
                        try {
                            setPopupError('');
                            const paymentUrl = await getPaymentURL();
                            setActive(true);
                            setCallback(() => {
                                return () => {
                                    console.log('CALLBACK');
                                    window.location.href = paymentUrl;
                                };
                            });
                        } catch {
                            setPopupError('Что-то пошло не так');
                            return;
                        }
                    }}
                />
            </div>
            {ConfirmationPopup({
                active: active,
                setActive: setActive,
                popupDescription:
                    'Для проведения оплаты вы будете перенаправлены на сайт YooMoney',
                popupTitle: 'Оплата',
                callback: paymentCallback,
                alternate: true,
                popupError: popupError,
            })}
        </div>
    );
};

export default ProfileSubscribtion;
