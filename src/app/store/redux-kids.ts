import { Interest, Photo } from "../../entities/person/model"

export type Action = {
    type: string,
    payload: any
}

export type InitialState = {
    session: {
        isAuth: boolean,
        token: string,
    },
    user: {
        id: number,
        name: string,
        email: string,
        description: string,
        photos: Photo[],
        interests: Interest[],
    }
}

export type Store = {
    dispatch: (action: Action) => void,
    subscribe: (callback: Function) => void,
    getState: () => InitialState,
}

const initState: InitialState = {
    session: {
        isAuth: false,
        token: "",
    },
    user: {
        id: 0,
        name: "",
        email: "",
        description: "",
        photos: [],
        interests: [],
    }
}

/**
 * Функция создания хранилища
 * @param {Function} reducer - функция редьюсер
 * @param {Object} initialState - начальное состояние
 * @returns {Object} - объект хранилища
 */
export const createStore = (reducer: Function, initialState: InitialState = initState): Store => {
    const stateInLS = localStorage.getItem('state');
    let state = stateInLS ? JSON.parse(stateInLS) : initialState;
    const subscribers : Function[] = [];

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
}