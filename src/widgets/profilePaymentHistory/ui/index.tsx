import { getPaymentHistory } from '../../../features/payments/api/index';
import { useState } from '../../../reactor/index';
import { clsx } from '../../../shared/lib/clsx/index';
import { formatUnixTimestamp } from '../../../shared/lib/date/index';
import { store } from '../../../app/app';

const ProfilePaymentHistory = () => {
    const [history, setHistory] = useState([] as any);
    const getHistory = async () => {
        try {
            const response = await getPaymentHistory();
            setHistory(response.records ? response.records : ['empty']);
        } catch {
            return;
        }
    };

    const unsubscribeStatus = store.subscribe(
        (premium: boolean) => {
            getHistory();
        },
        ['premium'],
    );

    if (history.length === 0) getHistory();

    return (
        <div
            className={clsx(
                'profile__payment-block',
                history[0] === 'empty' && 'any--none',
            )}
        >
            <span className="profile__label-text">История платежей</span>
            <div className="payment-block__header">
                <span className="payment__text icon-calendar-event"></span>
                <span className="payment__text icon-tags"></span>
                <span className="payment__text icon-cash-stack"></span>
            </div>
            {history[0] !== 'empty'
                ? history.map((item: any) => (
                      <div className="payment__border">
                          <div className="payment-block__header">
                              <span className="payment__text">
                                  {formatUnixTimestamp(item.time)}
                              </span>
                              <span className="payment__text">
                                  {item.title}
                              </span>
                              <span className="payment__text">{item.sum}₽</span>
                          </div>
                      </div>
                  ))
                : history[0]}
        </div>
    );
};

export default ProfilePaymentHistory;
