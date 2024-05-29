/**
 * Combines class specifiers into a single class string, for use in `class`
 * attributes in HTML or JSX.
 *
 * Each argument will be transformed as follows:
 * - Strings will be included as-is.
 * - Boolean values will be ignored (`condition && 'class'`).
 * - Null and undefined values will be ignored.
 * - Arrays will be flattened.
 * - Objects will have their keys included if the value is truthy.
 * - Functions will be called with no arguments, and the result will be
 *   processed as above.
 * - All other values will be ignored.
 * @example
 * ```tsx
 * cls("a", "b") // "a b"
 * cls(true && "a", false && "b") // "a"
 * cls(["a", ["b", "c"]]) // "a b c"
 * cls({ a: true, b: false, c: true }) // "a c"
 * cls(() => "a", () => ["b", "c"]) // "a b c"
 * cls(0, null, undefined) // ""
 * ```
 */
export function cls(...args: unknown[]): string {
	const out = [];

	for (const arg of args) {
		if (typeof arg === "string") {
			out.push(arg);
		} else if (Array.isArray(arg)) {
			out.push(cls(...arg));
		} else if (arg && typeof arg === "object") {
			for (const keyRaw in arg) {
				const key = keyRaw as keyof typeof arg;
				if (arg[key]) out.push(key);
			}
		} else if (typeof arg === "function") {
			out.push(cls(arg()));
		}
	}

	return out.join(" ");
}
