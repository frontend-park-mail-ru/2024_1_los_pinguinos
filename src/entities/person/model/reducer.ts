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
    newMatches: [],
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
            console.log(state);
            const updatedState = { ...state };
            for (const key in action.payload) {
                if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
                    updatedState[key] = action.payload[key];
                }
            }
            console.log('action payload:', action.payload); // Логируем payload
            console.log('updatedState:', updatedState); // Логируем новое состояние
            return updatedState;
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
