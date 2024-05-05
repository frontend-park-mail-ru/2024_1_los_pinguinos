import { Interest, Photo } from '../entities/person/model';

export type Action = {
    type: string;
    payload: any;
};

export type InitialState = {
    id: number;
    name: string;
    email: string;
    description: string;
    photos: Photo[];
    interests: Interest[];
    currentCard: number;
    currentChat: number;
};

export type Store = {
    dispatch: (action: Action) => void;
    subscribe: (callback: Function) => void;
    getState: () => InitialState;
};

const initState: InitialState = {
    id: 0,
    name: '',
    email: '',
    description: '',
    photos: [],
    interests: [],
    currentCard: 0,
    currentChat: 0,
};

/**
 * Функция создания хранилища
 * @param {Function} reducer - функция редьюсер
 * @param {Object} initialState - начальное состояние
 * @returns {Object} - объект хранилища
 */
export const createStore = (
    reducer: Function,
    initialState: InitialState = initState,
): Store => {
    const stateInLS = localStorage.getItem('state');
    let state = stateInLS ? JSON.parse(stateInLS) : initialState;
    const subscribers: Function[] = [];

    return {
        dispatch(action: Action) {
            state = reducer(state, action);
            subscribers.forEach((subscriber) => subscriber(state));
            // положить в  localStorage
            localStorage.setItem('state', JSON.stringify(state));
        },
        subscribe(callback: Function) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        },
    };
};
