import { sendRequest } from '../../../shared/api';
import { API_URL } from '../../../shared/config';

/**
 * Sends a complaint request to the server.
 *
 * @async
 * @function complain
 * @param {Object} params - The parameters for the complaint.
 * @returns {Promise<any>} The server response.
 */
export const complain = async ({ id, reciever }: any) => {
    return sendRequest(API_URL, '/createClaim', 'POST', {
        type: id,
        receiverID: reciever,
    });
};

/**
 * Fetches the list of complaint types from the server.
 *
 * @async
 * @function getComplaintTypes
 * @returns {Promise<any>} The list of complaint types.
 */
export const getComplaintTypes = async () => {
    return sendRequest(API_URL, '/claimTypes', 'GET');
};
