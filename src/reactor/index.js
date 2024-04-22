import { clsx, createElement } from './util';
import { useEffect, useState } from './hooks';
import { render, workLoop } from './reactor';

const Reactor = {
    useEffect,
    useState,
    render,
    createElement,
};
requestIdleCallback(workLoop);

export { clsx, Reactor, createElement };
