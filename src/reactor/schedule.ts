import { ITask } from './type'

const queue: ITask[] = []
const threshold: number = 5
const transitions: any[] = []
let executionDeadline: number = 0

export const startTransition = (callback: { (): void; (): void }) => {
  transitions.push(callback) && translate()
}

export const schedule = (callback: any): void => {
  queue.push({ callback } as any)
  startTransition(flush)
}

const task = (pending: boolean) => {
  const callback = () => transitions.splice(0, 1).forEach(callback => callback());
  if (!pending && typeof queueMicrotask !== 'undefined') {
    return () => queueMicrotask(callback);
  }
  return () => setTimeout(callback);
}

let translate = task(false)
const flush = (): void => {
  executionDeadline = getTime() + threshold;
  let currentJob = peek(queue);

  while (currentJob && !shouldYield()) {
    const { callback } = currentJob as any
    currentJob.callback = null;
    const nextTask = callback();
    currentJob.callback = nextTask ? nextTask as any : null;
    if (!nextTask) {
      queue.shift();
    }
    currentJob = peek(queue);
  }
  if (currentJob) {
    translate = task(shouldYield());
    startTransition(flush);
  }
}


export const shouldYield = (): boolean => {
  return getTime() >= executionDeadline
}

export const getTime = () => performance.now()

const peek = (queue: ITask[]) => queue[0]