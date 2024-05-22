import { ITask } from './type';

const queue: ITask[] = [];
const threshold: number = 5;
const transitions: any[] = [];
let executionDeadline: number = 0;

/**
 * Starts a transition by pushing a callback to the transitions queue.
 *
 * @function startTransition
 * @param {Function} callback - The callback to push to the transitions queue.
 */
export const startTransition = (callback: { (): void; (): void }) => {
    transitions.push(callback) && translate();
};

/**
 * Schedules a task by pushing it to the task queue.
 *
 * @function schedule
 * @param {any} callback - The task to schedule.
 */
export const schedule = (callback: any): void => {
    queue.push({ callback } as any);
    startTransition(flush);
};

/**
 * Creates a task based on the pending state.
 *
 * @function task
 * @param {boolean} pending - The pending state of the task.
 * @returns {Function} The created task.
 */
const task = (pending: boolean) => {
    const callback = () =>
        transitions.splice(0, 1).forEach((callback) => callback());
    if (!pending && typeof queueMicrotask !== 'undefined') {
        return () => queueMicrotask(callback);
    }
    return () => setTimeout(callback);
};

let translate = task(false);

/**
 * Clears the task queue.
 *
 * @function flush
 */
const flush = (): void => {
    executionDeadline = getTime() + threshold;
    let currentJob = peek(queue);

    while (currentJob && !shouldYield()) {
        const { callback } = currentJob as any;
        currentJob.callback = null;
        const nextTask = callback();
        currentJob.callback = nextTask ? (nextTask as any) : null;
        if (!nextTask) {
            queue.shift();
        }
        currentJob = peek(queue);
    }
    if (currentJob) {
        translate = task(shouldYield());
        startTransition(flush);
    }
};

/**
 * Checks if the execution should yield based on the deadline.
 *
 * @function shouldYield
 * @returns {boolean} Whether the execution should yield.
 */
export const shouldYield = (): boolean => {
    return getTime() >= executionDeadline;
};

/**
 * Gets the current time using performance.now().
 *
 * @function getTime
 * @returns {number} The current time.
 */
export const getTime = () => performance.now();

/**
 * Peeks at the first task in the task queue.
 *
 * @function peek
 * @param {ITask[]} queue - The task queue.
 * @returns {ITask} The first task in the queue.
 */
const peek = (queue: ITask[]) => queue[0];
