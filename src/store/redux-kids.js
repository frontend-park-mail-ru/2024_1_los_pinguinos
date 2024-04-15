/**
 * Функция создания хранилища
 * @param {Function} reducer - функция редьюсер
 * @param {Object} initialState - начальное состояние
 * @returns {Object} - объект хранилища
 */
export const createStote = (reducer, initialState) => {
    const stateInLS = localStorage.getItem('state');
    let state = stateInLS ? JSON.parse(stateInLS) : initialState;
    const subscribers = [];

    return {
        dispatch(action) {
            state = reducer(state, action);
            subscribers.forEach((subscriber) => subscriber(state));
            // положить в  localStorage
            localStorage.setItem('state', JSON.stringify(state));
        },
        subscribe(callback) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        },
    };
};
