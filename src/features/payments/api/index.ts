import { sendRequest } from '../../../shared/api';
import { AUTH_URL } from '../../../shared/config';

export const getPaymentURL = async () => {
    return sendRequest(AUTH_URL, '/payment', 'POST', {});
};

export const activatePremium = async () => {
    return sendRequest(AUTH_URL, '/activatePremium', 'POST', {});
};

export const getPaymentHistory = async () => {
    return sendRequest(AUTH_URL, '/payHistory', 'GET');
};
