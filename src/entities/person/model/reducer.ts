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
    currentChat: null,
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
    console.log(action.payload);
    if (action.payload) {
        key = Object.keys(action.payload)[0];
        value = action.payload[key];
    }
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                // ...state,
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
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};
