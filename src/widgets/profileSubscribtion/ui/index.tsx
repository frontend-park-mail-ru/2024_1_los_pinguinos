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
            const response = await activatePremium();
            setSubStatus(true);
            setSubExpires(response);
            store.dispatch({
                type: 'UPDATE_USER',
                payload: { premium: true, premiumExpires: response },
            });
        } catch {
            return;
        }
    };
    const currentLocation = window.location.search;
    if (currentLocation.includes('sub') && !subStatus) {
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
            <div className="profile__text premium--feature">
                Преимущества подписки:
                <div className="profile__label--row">
                    <span className="profile__text icon-check"></span>
                    <span className="profile__text">Бесконечные лайки</span>
                </div>
            </div>
            <p
                className={clsx(
                    'profile__text premium--default',
                    subStatus && 'any--none',
                )}
            >
                В данный момент у вас нет подписки
            </p>
            <p
                className={clsx(
                    'profile__text premium--success',
                    !subStatus && 'any--none',
                )}
            >
                Ваша подписка активна до {formatUnixTimestamp(subExpires)}.
            </p>
            <div className={clsx(subStatus && 'any--none')}>
                <Button
                    label="Оформить подписку"
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
                popupDescription: `Для проведения оплаты вы будете перенаправлены на YooMoney. \nСтоимость подписки - 2₽.`,
                popupTitle: 'Оплата',
                callback: paymentCallback,
                alternate: true,
                popupError: popupError,
            })}
        </div>
    );
};

export default ProfileSubscribtion;
