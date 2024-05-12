import { Interest, Photo } from '../entities/person/model/index';

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
    authStatus: boolean;
    csrft: string;
};

export type Store = {
    dispatch: (action: Action) => void;
    subscribe: (callback: Function, props?: string[]) => Function;
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
    authStatus: false,
    csrft: '',
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
    let subscribers: { callback: Function; props?: string[] }[] = [];

    return {
        dispatch(action: Action) {
            const prevState = state;
            state = reducer(state, action);
            subscribers.forEach(({ callback, props }) => {
                if (props && props.length > 0)
                    for (const prop of props) {
                        if (state[prop] !== prevState[prop]) {
                            callback(state[prop]);
                        }
                    }
                else {
                    return callback(state);
                }
            });
            // положить в  localStorage
            localStorage.setItem('state', JSON.stringify(state));
        },
        subscribe(callback: Function, props?: string[]): Function {
            const subscriber = { callback, props };
            subscribers.push(subscriber);
            const unsubscribe = () => {
                subscribers = subscribers.filter((sub) => sub !== subscriber);
            };
            return unsubscribe;
        },
        getState() {
            return state;
        },
    };
};
