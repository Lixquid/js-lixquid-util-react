import type { useRefType } from "./_internal/types.d.ts";

const uninitialized = Symbol("uninitialized");

/**
 * Creates a hook that will return a ref object like `useRef`, but is
 * initialized with a value from a callback function. Useful for when you need
 * to initialize a ref with a value that would be expensive to compute on every
 * render.
 * @example
 * ```tsx
 * const useInitRef = createUseInitRef(useRef);
 *
 * function MyComponent() {
 *     const ref = useInitRef(() => expensiveComputation());
 *     return <div>{ref.current.toString()}</div>;
 * }
 * ```
 */
export function createUseInitRef(
	useRef: useRefType<unknown>
): <T>(init: () => T) => { current: T } {
	return function useInitRef<T>(init: () => T): { current: T } {
		const ref = (useRef as useRefType<T | typeof uninitialized>)(uninitialized);
		if (ref.current === uninitialized) {
			ref.current = init();
		}
		return ref as { current: T };
	};
}
