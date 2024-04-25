import { IAttributes, TDOM, IFiber } from './type'
import { isText, TAG } from './reconcile'

const defaultProps = {} as const

const compareProps = <IProps extends IAttributes>(
  oldProps: IProps,
  newProps: IProps,
  callback: (name: string, oldFiber: any, newFiber: any) => void
) => {
  oldProps = oldProps || defaultProps as IProps
  newProps = newProps || defaultProps as IProps
  Object.keys(oldProps).forEach(key => callback(key, oldProps[key], newProps[key])) 
  Object.keys(newProps).forEach(key => !oldProps.hasOwnProperty(key) && callback(key,undefined, newProps[key])) 
}

export const updateElement = <IProps extends IAttributes>(
  dom: TDOM,
  oldProps: IProps,
  newProps: IProps
) => {
  compareProps(oldProps, newProps, (name, oldFiber, newFiber) => {
    if (oldFiber === newFiber || name === 'children') {
    } else if (name === 'style' && !isText(newFiber)) {
      compareProps(oldFiber, newFiber, (styleKey, oldStyle, newStyle) => {
        if (oldStyle !== newStyle) {
          (dom as any)[name][styleKey] = newStyle || ''
        }
      })
    } else if (name.startsWith('on')) {
      name = name.slice(2).toLowerCase() as Extract<keyof IProps, string>
      if (oldFiber) dom.removeEventListener(name, oldFiber)
      dom.addEventListener(name, newFiber)
    } else if (name in dom && !(dom instanceof SVGElement)) {
      (dom as any)[name] = newFiber || ''
    } else if (newFiber == null || newFiber === false) {
      dom.removeAttribute(name)
    } else {
      dom.setAttribute(name, newFiber)
    }
  })
}

export const createElement = <IProps extends IAttributes>(fiber: IFiber) => {
  const dom =
    fiber.type === '#text'
      ? document.createTextNode('')
      : fiber.lane === TAG.SVG
      ? document.createElementNS(
          'http://www.w3.org/2000/svg',
          fiber.type as string
        )
      : document.createElement(fiber.type as string)
  updateElement(dom as TDOM, {} as IProps, fiber.props as IProps)
  return dom
}
