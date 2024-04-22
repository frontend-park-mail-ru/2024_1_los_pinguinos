class Reactive {
    constructor() {
        let nxtUnit = null;
        let curRoot = null;
        let activeRoot = null;
        let dels = null;
        let activeFiber = null;
        let hookIdx = null;
        this.setActiveFiber = (fiber) => {
            activeFiber = fiber;
        };
        this.getActiveFiber = () => {
            return activeFiber;
        };
        this.setNextUnitOfWork = (unit) => {
            nxtUnit = unit;
        };
        this.getNextUnitOfWork = () => {
            return nxtUnit;
        };
        this.setCurrentRoot = (root) => {
            curRoot = root;
        };
        this.getCurrentRoot = () => {
            return curRoot;
        };
        this.setActiveRoot = (root) => {
            activeRoot = root;
        };
        this.getActiveRoot = () => {
            return activeRoot;
        };
        this.setDeletions = (deletions) => {
            dels = deletions;
        };
        this.getDeletions = () => {
            return dels;
        };
        this.setHookIndex = (idx) => {
            hookIdx = idx;
        };
        this.getHookIndex = () => {
            return hookIdx;
        };
    }
}

export default new Reactive();
