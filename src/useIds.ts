import type { useRefType } from "./_internal/types.d.ts";

const alphabet =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function randomString(length: number): string {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(alphabet[Math.floor(Math.random() * alphabet.length)]!);
	}
	return result.join("");
}

/**
 * Creates a hook that will infinitely generate unique IDs that are stable for
 * the lifetime of the component. This is typically used for `<label for="...">`
 * and `<input id="...">` pairs.
 *
 * @param useRef The `useRef` hook.
 * @param length The length of the generated IDs.
 * @example
 * ```tsx
 * const useIds = createUseIds(useRef);
 *
 * function MyComponent() {
 *     const [buttonId, textId] = useIds();
 *
 *     return <>
 *         <button id={buttonId}>Click me</button>
 *         <label for={textId}>Enter text:</label>
 *         <input id={textId} />
 *     </>;
 * }
 * ```
 */
export function createUseIds(
	useRef: useRefType<string[]>,
	length = 20,
): () => Generator<string> {
	return function* useIds(): Generator<string> {
		const ref = useRef([]);
		let i = 0;
		while (true) {
			let id = ref.current[i];
			if (id === undefined) {
				id = randomString(length);
				ref.current[i] = id;
			}
			i++;
			yield id;
		}
	};
}
