import type { EventLike, HTMLInputLike } from "./_internal/types.d.ts";

/**
 * Returns an event handler that will call the callback with the value of the
 * target element. This is mainly used for `input` `onChange` events.
 * @example
 * ```tsx
 * const [value, setValue] = useState("");
 * return <input value={value} onChange={setString(setValue)} />;
 * ```
 */
export function setString(
	callback: (value: string) => void,
): (e: EventLike) => void {
	return (e) => callback((e.target as HTMLInputLike).value);
}

const setterDontSet = Symbol("setterDontSet");

/**
 * Returns an event handler that will call the callback with the value of the
 * target element as a float. If the value is not a valid float, the callback
 * will not be called, unless `orElse` is provided, in which case the callback
 * will be called with that value.
 * @param callback The setter function to be called.
 * @param orElse If set, this value will be passed to the callback if the input
 * is not a valid float.
 * @example
 * ```tsx
 * const [value, setValue] = useState(0);
 * return <input type="number" value={value} onChange={setFloat(setValue)} />;
 * // If the input is not a valid float, `setValue` will not be called.
 * ```
 * @example
 * ```tsx
 * const [value, setValue] = useState<number | null>(0);
 * return <input type="number" value={value ?? ""} onChange={setFloat(setValue, null)} />;
 * // If the input is not a valid float, `setValue` will be called with `null`.
 */
export function setFloat<T>(
	callback: (value: T | number) => void,
	orElse: T | typeof setterDontSet = setterDontSet,
): (e: EventLike) => void {
	return (e) => {
		const v = Number.parseFloat((e.target as HTMLInputLike).value);
		if (Number.isNaN(v)) {
			if (orElse !== setterDontSet) {
				callback(orElse);
			}
		} else {
			callback(v);
		}
	};
}

/**
 * Returns an event handler that will call the callback with the value of the
 * target element as a integer. If the value is not a valid integer, the
 * callback will not be called, unless `orElse` is provided, in which case the
 * callback will be called with that value.
 * @param callback The setter function to be called.
 * @param orElse If set, this value will be passed to the callback if the input
 * is not a valid integer.
 * @example
 * ```tsx
 * const [value, setValue] = useState(0);
 * return <input type="number" value={value} onChange={setinteger(setValue)} />;
 * // If the input is not a valid integer, `setValue` will not be called.
 * ```
 * @example
 * ```tsx
 * const [value, setValue] = useState<number | null>(0);
 * return <input type="number" value={value ?? ""} onChange={setinteger(setValue, null)} />;
 * // If the input is not a valid integer, `setValue` will be called with `null`.
 */
export function setInteger<T>(
	callback: (value: T | number) => void,
	orElse: T | typeof setterDontSet = setterDontSet,
): (e: EventLike) => void {
	return (e) => {
		const v = Number.parseInt((e.target as HTMLInputLike).value);
		if (Number.isNaN(v)) {
			if (orElse !== setterDontSet) {
				callback(orElse);
			}
		} else {
			callback(v);
		}
	};
}
