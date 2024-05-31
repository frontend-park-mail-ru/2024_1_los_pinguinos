export function throttle(mainFunction: (arg0: any) => void, delay: number) {
    let timerFlag = null as any;

    return (...args: any) => {
        if (timerFlag === null) {
            mainFunction(...args);
            timerFlag = setTimeout(() => {
                timerFlag = null;
            }, delay);
        }
    };
}
