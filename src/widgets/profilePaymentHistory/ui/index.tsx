import { getPaymentHistory } from '../../../features/payments/api/index';
import { useState } from '../../../reactor/index';
import { clsx } from '../../../shared/lib/clsx/index';
import { throttle } from '../../../shared/lib/performance/index';
import { formatUnixTimestamp } from '../../../shared/lib/date/index';
import { store } from '../../../app/app';

const ProfilePaymentHistory = () => {
    let history = store.getState().paymentHistory;
    const getHistory = async () => {
        try {
            const response = await getPaymentHistory();
            store.dispatch({
                type: 'UPDATE_SOMETHING',
                payload: { paymentHistory: response.records },
            });
        } catch {
            return;
        }
    };

    // const unsubscribeStatus = store.subscribe(
    //     (premium: boolean) => {
    //         getHistory();
    //     },
    //     ['premium'],
    // );

    const unsubscribeHistory = store.subscribe(
        (paymentHistory: any) => {
            history = paymentHistory;
        },
        ['paymentHistory'],
    );

    if (
        store.getState().paymentHistory === undefined &&
        store.getState().authStatus
    ) {
        console.log('BUT I AM RETARDED', history);
        getHistory();
    }

    return (
        <div
            className={clsx('profile__payment-block', !history && 'any--none')}
        >
            <span className="profile__label-text">История платежей</span>
            <div className="payment-block__header">
                <span className="payment__text icon-calendar-event"></span>
                <span className="payment__text icon-tags"></span>
                <span className="payment__text icon-cash-stack"></span>
            </div>
            {history
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
                : null}
        </div>
    );
};

export default ProfilePaymentHistory;
