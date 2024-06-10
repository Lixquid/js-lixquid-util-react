import type { useStateType } from "./_internal/types.d.ts";

type useLocalStorage = <T>(
	/** The key to store the value under in {@link localStorage}. */
	key: string,
	/**
	 * The initial value to use if the key is not set in {@link localStorage}.
	 * If the initial value is expensive to compute, you can pass a function
	 * that will be called to compute the initial value.
	 */
	initialValue: (() => T) | T,
	options?: {
		/**
		 * If set, this function will be called to serialize the value before
		 * storing it in {@link localStorage}. If not set, the value will be
		 * serialized using {@link JSON.stringify}.
		 */
		serialize?: (value: T) => string;
		/**
		 * If set, this function will be called to deserialize the value when
		 * retrieving it from {@link localStorage}. If not set, the value will
		 * be deserialized using {@link JSON.parse}.
		 *
		 * If an exception is thrown during deserialization, the default value
		 * will be used instead.
		 */
		deserialize?: (value: string) => T;
	},
) => [T, (value: T) => void];

/**
 * Creates a hook that acts like `useState`, but serializes sets to
 * {@link localStorage}, and deserializes initial values from it on first load.
 * @param useState
 */
export function createUseLocalStorage(
	useState: useStateType<unknown>,
): useLocalStorage {
	return function useLocalStorage<T>(
		key: string,
		initialValue: (() => T) | T,
		options?: {
			serialize?: (value: T) => string;
			deserialize?: (value: string) => T;
		},
	) {
		const serialize = options?.serialize ?? JSON.stringify;
		const deserialize = options?.deserialize ?? JSON.parse;
		const [state, rawSetState] = useState(() => {
			const value = localStorage.getItem(key);
			if (value === null) {
				return typeof initialValue === "function"
					? (initialValue as () => T)()
					: initialValue;
			}
			try {
				return deserialize(value);
			} catch (ex: unknown) {
				console.error(
					"Error deserializing value from localStorage",
					key,
					", using default value instead:",
					ex,
				);
				return typeof initialValue === "function"
					? (initialValue as () => T)()
					: initialValue;
			}
		});

		const setState = (value: T) => {
			rawSetState(value);
			localStorage.setItem(key, serialize(value));
		};

		return [state as T, setState];
	};
}