import { Button } from '../../../shared/ui/index';
import { store } from '../../../app/app';
import { useEffect, useState } from '../../../reactor/index';
import {
    getPaymentHistory,
    getPaymentURL,
} from '../../../features/payments/api/index';
import { clsx } from '../../../shared/lib/clsx/index';

const ProfileSubscribtion = () => {
    const state = store.getState();
    const [subStatus, setSubStatus] = useState(state.premium);
    const [subExpires, setSubExpires] = useState(state.premiumExpires);

    useEffect(() => {
        const unsubscribeStatus = store.subscribe(
            (premium: boolean) => {
                setSubStatus(premium);
            },
            ['premium'],
        );
        const unsubscribeExpires = store.subscribe(
            (premiumExpires: number) => {
                setSubExpires(premiumExpires);
            },
            ['premiumExpires'],
        );
        return () => {
            unsubscribeStatus();
            unsubscribeExpires();
        };
    }, []);

    return (
        <div className="profile__content-column">
            <p className="profile__text">
                Преимущества подписки:{'\n'} - Бесконечные лайки
            </p>
            <p className={clsx('profile__text', subStatus && 'any--none')}>
                В данный момент у вас нет подписки
            </p>
            <p className={clsx('profile__text', !subStatus && 'any--none')}>
                Ваша подписка действительна до {subExpires}
            </p>
            <div className={clsx(subStatus && 'any--none')}>
                <Button
                    label="Оформить подписку - 2₽"
                    size="m"
                    fontSize="m"
                    severity="success"
                    onClick={async () => {
                        try {
                            const paymentUrl = await getPaymentURL();
                            const paymentHistory = await getPaymentHistory();
                            console.log(paymentHistory);
                            console.log(paymentUrl);
                            store.dispatch({
                                type: 'UPDATE_SOMETHING',
                                payload: { premium: !subStatus },
                            });
                            // window.location.href = paymentUrl;
                        } catch {
                            console.log('error payment');
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ProfileSubscribtion;
