export function isDomNode(target: unknown): target is Node {
    return target instanceof Node;
}

export function isHTMLElement(target: unknown): target is HTMLElement {
    return target instanceof HTMLElement;
}
