import { Action } from '../../../app/store';
const initialState = {
    id: '1',
    name: '',
    email: '',
    birthday: '',
    description: '',
    photos: [],
    interests: [],
    currentCard: 0,
    currentChat: {
        id: '',
        name: '',
        photo: '',
    },
    newMatches: [],    premium: false,
    premiumExpires: 0,
};

/**
 * Редьюсер для работы с пользователем
 * @param {Object} state - начальное состояние
 * @param {Action} action - объект с типом и данными
 * @returns {Object} - новое состояние хранилища
 */
export const userReducer = (state = initialState, action: Action) => {
    let key = '';
    let value = null;
    if (action.payload) {
        key = Object.keys(action.payload)[0];
        value = action.payload[key];
    }
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                ...action.payload,
            };
        case 'UPDATE_SOMETHING':
            return {
                ...state,
                [key]: value,
            };
        case 'UPDATE_CURRENT_CHAT':
            return {
                ...state,
                currentChat: action.payload,
            };
        case 'UPDATE_CURRENT_CARD':
            return {
                ...state,
                currentCard: action.payload,
            };
        case 'UPDATE_NEW_MATCH':
            console.log('new match:', action.payload);
            return {
                ...state,
                newMatches: state.newMatches ? [...state.newMatches, action.payload] : [action.payload],
            };
        case 'REMOVE_NEW_MATCH':
            return {
                ...state,
                newMatches: state.newMatches.filter(
                    (match) => match !== action.payload,
                ),
            };
        case 'LOGOUT':
            return {};
        case 'UPDATE_AUTH':
            return {
                ...state,
                authStatus: action.payload,
            };
        case 'SET_CSRFT':
            return {
                ...state,
                csrft: action.payload,
            };
        default:
            return state;
    }
};
