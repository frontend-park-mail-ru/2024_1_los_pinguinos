import { IAttributes, TDOM, IFiber } from './type'
import { isText, TAG } from './reconcile'

const defaultProps = {} as const

const compareProps = <IProps extends IAttributes>(
  aProps: IProps,
  bProps: IProps,
  callback: (name: string, a: any, b: any) => void
) => {
  aProps = aProps || defaultProps as IProps
  bProps = bProps || defaultProps as IProps
  Object.keys(aProps).forEach(k => callback(k, aProps[k], bProps[k])) 
  Object.keys(bProps).forEach(k => !aProps.hasOwnProperty(k) && callback(k,undefined, bProps[k])) 
}

export const updateElement = <IProps extends IAttributes>(
  dom: TDOM,
  aProps: IProps,
  bProps: IProps
) => {
  compareProps(aProps, bProps, (name, a, b) => {
    if (a === b || name === 'children') {
    } else if (name === 'style' && !isText(b)) {
      compareProps(a, b, (styleKey, aStyle, bStyle) => {
        if (aStyle !== bStyle) {
          ;(dom as any)[name][styleKey] = bStyle || ''
        }
      })
    } else if (name[0] === 'o' && name[1] === 'n') {
      name = name.slice(2).toLowerCase() as Extract<keyof IProps, string>
      if (a) dom.removeEventListener(name, a)
      dom.addEventListener(name, b)
    } else if (name in dom && !(dom instanceof SVGElement)) {
      ;(dom as any)[name] = b || ''
    } else if (b == null || b === false) {
      dom.removeAttribute(name)
    } else {
      dom.setAttribute(name, b)
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
