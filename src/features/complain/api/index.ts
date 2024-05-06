import { sendRequest } from '../../../shared/api';
import { API_URL } from '../../../shared/config';

export const complain = async ({ id = 1, reciever }: any) => {
    return sendRequest(API_URL, '/createClaim', 'POST', {
        type: id,
        receiverID: reciever,
    });
};
