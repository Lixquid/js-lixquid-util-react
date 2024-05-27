export type useRefType<T> = (initialValue: T) => { current: T };

/**
 * A minimal HTML input-like object that represents the minimum properties
 * needed for the library.
 * @description This is used instead of the `HTMLInputElement` interface from
 * DOM to avoid needing to reference the DOM types in the library.
 */
export interface HTMLInputLike extends EventTargetLike {
	value: string;
}

/**
 * A minimal event target-like object that represents the minimum properties
 * needed for the library.
 * @description This is used instead of the `EventTarget` interface from DOM to
 * avoid needing to reference the DOM types in the library.
 */
export interface EventTargetLike {
	dispatchEvent(event: EventLike): boolean;
}

/**
 * A minimal event-like object that represents the minimum properties needed
 * for the library.
 * @description This is used instead of the `Event` interface from DOM to avoid
 * needing to reference the DOM types in the library.
 */
export interface EventLike {
	target: EventTargetLike | null;
}
