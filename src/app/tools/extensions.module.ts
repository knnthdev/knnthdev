import { Observable } from 'rxjs';

export class Extension implements ExtendedElement<HTMLElement> {
    element: HTMLElement | undefined;
    elements: HTMLElement[] | undefined;
    _type: string = 'null';
    length: number = 0;


    constructor(selector: string | HTMLElement | NodeList | ExtendedElement<HTMLElement> | HTMLElement[] | Document | null) {
        if (selector instanceof HTMLElement) {
            this.element = selector;
        }
        else if (typeof (selector) === 'string') {
            // detect if it's id, tag, or class
            let siblings: any = null;
            if (selector.trim().startsWith('<')){
                this.element = document.createElement('div');
                this.element!.insertAdjacentHTML('beforeend', selector);
                this.element = this.element!.firstChild as HTMLElement;
            }
            else
                siblings = document.querySelectorAll(selector as string);

            if (siblings.length == 0 && !['[', '#', '.'].includes(selector[0] as string) && !this.element) {
                this.element = document.querySelector(`#${selector}`) as HTMLElement;
            }

            if (siblings.length > 0) {
                this.elements = Array.from(siblings) as HTMLElement[];
                this.element = this.elements[0];
                this.length = this.elements.length;
            }
        }
        else if (selector instanceof Extension) {
            this.element = (selector as ExtendedElement<HTMLElement>).element;
        }
        else if (selector instanceof Array) {
            this.elements = selector as HTMLElement[];
            this.length = this.elements.length;
            if (this.elements.length > 0)
                this.element = this.elements[0];
            else
                this.element = undefined;
        }
        else if (selector instanceof NodeList) {
            const div = document.createElement('div');
            const list = selector as NodeList;
            list.forEach(element => {
                div.appendChild(element);
            });
            this.element = div;
        }
        else if (selector instanceof Document) {
            this.element = selector.documentElement;
        }
        else {
            this.element = undefined;
        }

        if (this.element) {
            if (selector instanceof Document)
                this._type = 'document';
            else
                this._type = this.element.tagName.toLowerCase();

            if (this.attr('type'))
                this._type += '|' + this.attr('type');
            if (this.length == 0)
                this.length = this.element.children.length;
        }
    }

    public find(selector: string): ExtendedElement<HTMLElement>;
    public find(selector: any): ExtendedElement<HTMLElement> {
        if (this.element == null)
            return new Extension(null);
        if (selector as string) {
            if (this.elements)
                return new Extension(this.elements.find(element => element.matches(selector)) as HTMLElement);
            return new Extension(this.element.querySelector(selector));
        }
        return new Extension(null);
    }
    public closest(selector: string): ExtendedElement<HTMLElement>;
    public closest(selector: unknown): ExtendedElement<HTMLElement> {
        let current = this.element as HTMLElement | null;
        while (current) {
            if (current.matches(selector as string))
                return new Extension(current);
            current = current.parentElement;
        }
        return new Extension(null);
    }
    public parent(): ExtendedElement<HTMLElement> {
        return new Extension(this.element?.parentElement as HTMLElement);
    }
    public children(): ExtendedElement<HTMLElement> {
        return new Extension(Array.from(this.element?.children as HTMLCollection) as HTMLElement[]);
    }
    public first(): ExtendedElement<HTMLElement> {
        return new Extension(this.element?.firstElementChild as HTMLElement);
    }
    public last(): ExtendedElement<HTMLElement> {
        return new Extension(this.element?.lastElementChild as HTMLElement);
    }
    public next(): ExtendedElement<HTMLElement> {
        return new Extension(this.element?.nextElementSibling as HTMLElement);
    }
    public prev(): ExtendedElement<HTMLElement> {
        return new Extension(this.element?.previousElementSibling as HTMLElement);
    }
    public attr(name: string): string | null;
    public attr(name: unknown, value?: unknown): string | null {
        if (value == undefined)
            return this.element?.getAttribute(name as string) as string;
        this.element!.setAttribute(name as string, value as string);
        return null;
    }
    public removeAttr(name: string): this {
        this.element?.removeAttribute(name);
        return this;
    }
    public data(key: string): any;
    public data(key: string, value: any): this;
    public data(key: unknown, value?: unknown): any {
        if (value == undefined) {
            if (this.element!.hasAttribute(`data-${key}`)) {
                const data_saved = window.localStorage.getItem(key as string);
                const data_on_element = this.element!.getAttribute(`data-${key}`);

                return data_saved ? JSON.parse(data_saved) : data_on_element;
            }
        }
        else {
            if (this.element!.hasAttribute(`data-${key}`))
                this.element!.setAttribute(`data-${key}`, value as string);
            else
                this.element!.setAttribute(`data-${key}`, JSON.stringify(value));
            window.localStorage.setItem(key as string, JSON.stringify(value));
        }
        return this;
    }
    public removeData(key: string): this {
        this.element!.removeAttribute(`data-${key}`);
        window.localStorage.removeItem(key);
        return this;
    }
    public addClass(...classNames: string[]): this {
        this.element!.classList.add(...classNames);
        return this;
    }
    public removeClass(...classNames: string[]): this {
        for (const className of classNames) {
            this.element!.classList.remove(className);
        }
        return this;
    }
    public toggleClass(className: string): this;
    public toggleClass(className: string, state?: boolean): this {
        if (state == undefined)
            this.element!.classList.toggle(className);
        else
            this.element!.classList.toggle(className, state);
        return this;
    }
    public hasClass(className: string): boolean {
        return this.element!.classList.contains(className);
    }
    public css(propertyName: keyof CSSStyleDeclaration): string;
    public css(properties: Partial<CSSStyleDeclaration>): this;
    public css(propertyName: keyof CSSStyleDeclaration, value: string | number): this;
    public css(propertyName: unknown, value?: unknown): string | this {
        this.element!.style[propertyName as any] = value as string;
        return this;
    }
    public text(): string;
    public text(value: string | number): this;
    public text(value?: unknown): string | this {
        if (value == undefined)
            return this.element!?.innerText;
        if (this._type == 'input|text')
            (this.element as HTMLInputElement).value = value as string;
        else
            this.element!.textContent = value as string;
        return this;
    }
    public stack(value: string | number): this {
        if (this._type == 'input|text'){
            (this.element as HTMLInputElement).value += value as string;
            (this.element as HTMLInputElement).value = (this.element as HTMLInputElement).value.trim();
        }
        else {
            this.element!.textContent += value as string;
            this.element!.textContent = this.element!.textContent?.trim() as string;
        }
        return this;
    }
    public html(): string;
    public html(value: string): this;
    public html(value?: unknown): string | this {
        if (value == undefined) {
            if (this.elements) {
                let html = '';
                for (const element of this.elements) {
                    html += element.innerHTML + '\n';
                }
                return html.trimEnd();
            }
            return this.element!.innerHTML;
        }
        this.element!.innerHTML = value as string;
        return this;
    }

    public on(eventName: string, listener: (ev: Event | any, it?: HTMLElement) => void, options?: boolean | AddEventListenerOptions): this
    {
        this.element!?.addEventListener(eventName as string, (event) => {
            listener(event, event.target as HTMLElement);
        }, options as boolean | AddEventListenerOptions);
        return this;
    }
    public off(eventName: unknown, listener?: unknown, options?: unknown): this {
        this.element!.removeEventListener(eventName as string, listener as (this: HTMLElement, ev: Event) => any, options as boolean | EventListenerOptions);
        return this;
    }
    public trigger(event: string, detail?: unknown): this {
        const eventy = new CustomEvent(event as string, { detail: detail || null });
        this.element!.dispatchEvent(eventy);
        return this;
    }
    public on$(eventName: string, options?: AddEventListenerOptions): Observable<Event>;
    public on$(eventName: unknown, options?: unknown): Observable<Event> {
        // Suscribe a event
        return new Observable<Event>(observer => {
            this.element!.addEventListener(eventName as string, (event) => {
                observer.next(event);
            }, options as AddEventListenerOptions | boolean | undefined
            );
        });
    }
    public show(): this {
        this.element!.style.visibility = 'initial';
        return this;
    }
    public hide(): this {
        if (this._type == 'table')
            this.element!.style.visibility = 'collapse';
        else
            this.element!.style.visibility = 'hidden';
        return this;
    }
    public toggle(state?: boolean): this {
        if (state == undefined)
            this.element!.style.visibility = this.element!.style.visibility == 'hidden' ? 'initial' : 'hidden';
        else
            this.element!.style.visibility = state ? 'initial' : 'hidden';
        return this;
    }
    public forEach(callback: (el: HTMLElement, index?: number, array?: HTMLElement[]) => void): this {
        if (this.elements) {
            for (let i = 0; i < this.elements.length; i++) {
                callback(this.elements[i], i, this.elements);
            }
            return this;
        }
        if (this.element)
            for (let i = 0; i < this.element!.children.length; i++) {
                callback(this.element!.children[i] as HTMLElement, i, Array.from(this.element!.children) as HTMLElement[]);
            }
        return this;
    }
    public select(callback: (el: HTMLElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, index?: number) => boolean): ExtendedElement<HTMLElement> {
        if (this.elements) {
            let list: HTMLElement[] = [];
            for (let i = 0; i < this.elements.length; i++) {
                const result = callback.bind(this)(this.elements[i], i);
                if (result)
                    list.push(this.elements[i]);
            }
            return new Extension(list);
        }
        if (this.element)
            return new Extension(callback.bind(this)(this.element) ? this.element : null);
        return new Extension(null);   
    }
    public map<outcome>(callback: (el: HTMLElement, index?: number) => outcome): outcome[] {
        if (this.elements) {
            let list: outcome[] = [];
            for (let i = 0; i < this.elements.length; i++) {
                list.push(callback.bind(this)(this.elements[i], i));
            }
            return list;
        }
        return this.element ? [callback.bind(this)(this.element)] : [];
    }
    public isEmpty(): boolean {
        return (this.element!.textContent == '' && this.length == 0);
    }
    public contains(child: HTMLElement): boolean {
        return this.element!.contains(child);
    }
    public toArray(): HTMLElement[] {
        return Array.from(this.element!.children) as HTMLElement[];
    }

    public isChecked(): boolean {
        if (this._type == 'input|checkbox')
            return (this.element as HTMLInputElement)!.checked;
        else if (this._type == 'input|radio')
            return (this.element as HTMLInputElement)!.checked;
        return false;
    }

    public append(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this {
        for (const node of nodes) {
            if (typeof node === 'string')
                this.element!.insertAdjacentHTML('beforeend', node);
            else if (node instanceof Extension)
                this.element!.appendChild(node!.element as HTMLElement);
            else
                this.element!.appendChild(node as HTMLElement);
        }
        return this;
    }
    public prepend(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this {
        for (const node of nodes) {
            if (typeof node === 'string')
                this.element!.insertAdjacentHTML('afterbegin', node);
            else if (node instanceof Extension)
                this.element!.prepend(node!.element as HTMLElement);
            else
                this.element!.prepend(node as HTMLElement);
        }
        return this;
    }
    public after(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this {
        for (const node of nodes) {
            if (typeof node === 'string')
                this.element!.insertAdjacentHTML('afterend', node);
            else if (node instanceof Extension) {
                if (!(node as Extension).element!.parentNode)
                    continue;
                this.element!.after(node!.element as HTMLElement);
            }
            else {
                if (!(node as HTMLElement).parentNode)
                    continue;
                this.element!.after(node as HTMLElement);
            }
        }
        return this;
    }
    public before(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this {
        for (const node of nodes) {
            if (typeof node === 'string')
                this.element!.insertAdjacentHTML('beforebegin', node);
            else if (node instanceof Extension)
                this.element!.before(node!.element as HTMLElement);
            else
                this.element!.before(node as HTMLElement);
        }
        return this;
    }
    public empty(): this {
        this.element!.innerHTML = '';
        return this;
    }
    public remove(): this {
        this.element!.remove();
        return this;
    }
    public clone(deep?: boolean): ExtendedElement<HTMLElement> {
        return new Extension(this.element!.cloneNode(deep as boolean) as HTMLElement);
    }
    public wrap(wrapper: string | HTMLElement | ExtendedElement<HTMLElement>): this {
        let wrapperElement: HTMLElement;
        if (typeof wrapper === 'string')
            wrapperElement = document.createElement(wrapper);
        else if (wrapper instanceof Extension)
            wrapperElement = wrapper!.element?.cloneNode(true) as HTMLElement;
        else
            wrapperElement = (wrapper as HTMLElement).cloneNode(true) as HTMLElement;

        this.before(wrapperElement);

        let innermost = wrapperElement;
        while (innermost.firstElementChild) {
            innermost = innermost.firstElementChild as HTMLElement;
        }
        innermost.append(this.element!);

        return this;
    }
    public width(): number;
    public width(value: number | string): this;
    public width(value?: unknown): number | this {
        if (value == undefined)
            return this.element!.offsetWidth;
        this.element!.style.width = value as string;
        return this;
    }
    public height(): number;
    public height(value: number | string): this;
    public height(value?: unknown): number | this {
        if (value == undefined)
            return this.element!.offsetHeight;
        this.element!.style.height = value as string;
        return this;
    }
    public offset(): {
        top: number;
        left: number;
    } {
        return { top: this.element!.offsetTop, left: this.element!.offsetLeft };
    }
    public position(): {
        top: number;
        left: number;
    } {
        return { top: this.element!.offsetTop, left: this.element!.offsetLeft };
    }
    public focus(options?: FocusOptions): this {
        this.element!.focus(options);
        return this;
    }
    public blur(): this {
        this.element!.blur();
        return this;
    }

    // conversions
    public toString(): string { return this.html(); }
    // Extension to HTMLElement
    public [Symbol.toPrimitive](hint: ExtendedElement<HTMLElement>): HTMLElement | undefined {
        return hint.element;
    }

}

interface ExtendedElement<T extends HTMLElement = HTMLElement> {
    // DOM Traversal & Manipulation
    find(selector: string): ExtendedElement<HTMLElement>;
    closest(selector: string): ExtendedElement<HTMLElement>;
    parent(): ExtendedElement<HTMLElement>;
    children(): ExtendedElement<HTMLElement>;
    first(): ExtendedElement<HTMLElement>;
    last(): ExtendedElement<HTMLElement>;
    next(): ExtendedElement<HTMLElement>;
    prev(): ExtendedElement<HTMLElement>;

    // Data & Attributes
    attr(name: string): string | null;
    removeAttr(name: string): this;
    data(key: string): any;
    data(key: string, value: any): this;
    removeData(key: string): this;

    // Class Manipulation
    addClass(...classNames: string[]): this;
    removeClass(...classNames: string[]): this;
    toggleClass(className: string, state?: boolean): this;
    hasClass(className: string): boolean;

    // CSS Manipulation
    css(propertyName: keyof CSSStyleDeclaration): string;
    css(properties: Partial<CSSStyleDeclaration>): this;
    css(propertyName: keyof CSSStyleDeclaration, value: string | number): this;

    // Content
    text(): string;
    text(value: string | number): this;
    stack(value: string | number): this;
    html(): string;
    html(value: string): this;

    // Event Handling
    //on(eventName: string, eventName1?: string, eventName2?: string, eventName3?: string, eventName4?: string, listener?: (ev: Event, it: ExtendedElement<HTMLElement>) => any, options?: boolean | AddEventListenerOptions): this
    on(eventName: string, listener: (ev: Event | any, it?: T) => void, options?: boolean | AddEventListenerOptions): this;
    off(eventName: string, listener?: (ev: Event | any, it?: T) => void, options?: boolean | EventListenerOptions): this;
    trigger(event: string, detail?: unknown): this;

    // RxJS Observables for Events
    on$(eventName: string, options?: AddEventListenerOptions): Observable<Event>;

    // Visibility & Display
    show(): this;
    hide(): this;
    toggle(state?: boolean): this;

    // Iteration
    forEach(callback: (el: T, index?: number, array?: T[]) => void): this;
    select(callback: (el: T, index?: number) => boolean): ExtendedElement<HTMLElement>;
    map<outcome>(callback: (el: T, index?: number) => outcome ): outcome[];

    // Utility
    isEmpty(): boolean;
    contains(child: HTMLElement): boolean;
    toArray(): T[];

    // Actual element(s)
    readonly element: T | undefined; // For single element operations
    readonly _type: string; // For single element operations
    readonly length: number; // For single element operations

    // Valid forms
    isChecked(): boolean;


    // New element creation and manipulation
    append(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this;
    prepend(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this;
    before(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this;
    after(...nodes: (string | HTMLElement | ExtendedElement<HTMLElement>)[]): this;
    empty(): this;
    remove(): this;
    clone(deep?: boolean): ExtendedElement<T>;
    wrap(wrapper: string | HTMLElement | ExtendedElement<HTMLElement>): this;

    // Dimension & Position
    width(): number;
    width(value: number | string): this;
    height(): number;
    height(value: number | string): this;
    offset(): {
        top: number;
        left: number;
    };
    position(): {
        top: number;
        left: number;
    };

    // Focus
    focus(options?: FocusOptions): this;
    blur(): this;

    // Conversions
    toString(): string;
    // This to HTMLElement
    [Symbol.toPrimitive](hint: ExtendedElement<T>): HTMLElement | undefined;
}

export function $(selector: string | HTMLElement | NodeList | ExtendedElement<HTMLElement> | HTMLElement[] | Document | null): ExtendedElement<HTMLElement> {
    return new Extension(selector);
}
export namespace $ {
    export function ready(callback: (this: Document) => void): void {
        if (document && window)
            document.addEventListener('DOMContentLoaded', callback);
    }
    export function extend(target: { [key: string]: any }, ...sources: { [key: string]: any }[]): object {
        if (sources.length == 0)
            return target;

        for (const source of sources) {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    export function go(url: string): void {
        if (window)
            window.location.href = url;
    }

    export function amIn(route: string): boolean {
        if (window)
            return window.location.pathname == route;
        return false;
    }

    export function data(key: string): string | { [key: string]: any };
    export function data(key: string, value: string | { [key: string]: any }): string | { [key: string]: any };
    export function data(key: unknown, value?: unknown): string | { [key: string]: any } {
        if (value == undefined) {
            return window.localStorage.getItem(key as string) as any;
        }
        else {
            window.localStorage.setItem(key as string, typeof value === 'string' ? value as string : JSON.stringify(value));
            return value;
        }

    }

    export function look(selector: string): Observable<ExtendedElement<HTMLElement>> {
        return new Observable<ExtendedElement<HTMLElement>>(observer => {
            const interval = setInterval(() => {
                const element = $(selector);
                if (element.element) {
                    observer.next(element);
                    clearInterval(interval);
                }
            }, 1);
        });
    }

    export function match(phrase: string, pattern: string): boolean {
        const regex = new RegExp(pattern);
        return regex.test(phrase);
    }

    export function isEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    export function ajax(options: RequestInit & {
        url: string;
    }): Promise<Response> {
        return fetch(options.url, options);
    }
    // Utility methods can be added here


}
