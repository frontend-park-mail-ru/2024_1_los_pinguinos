import { sendRequest } from '../../../shared/api';
import { API_URL } from '../../../shared/config';

export const complain = async ({ id, reciever }: any) => {
    return sendRequest(API_URL, '/createClaim', 'POST', {
        type: id,
        receiverID: reciever,
    });
};

export const getComplaintTypes = async () => {
    return sendRequest(API_URL, '/claimTypes', 'GET');
};
