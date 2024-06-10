import { createUseLocalStorage } from "../useLocalStorage.ts";
import { eq } from "./deps.test.ts";

function createUseState<T>() {
	const unassigned = Symbol("unassigned");
	let value: T | typeof unassigned = unassigned;
	return function useState(
		initialValue: T | (() => T),
	): readonly [T, (value: T) => void] {
		if (value === unassigned) {
			value =
				typeof initialValue === "function"
					? (initialValue as () => T)()
					: initialValue;
		}
		return [
			value,
			(newValue: T) => {
				value = newValue;
			},
		] as const;
	};
}

Deno.test("useLocalStorage", () => {
	const key = String(Math.random());

	try {
		let useLocalStorage = createUseLocalStorage(createUseState());

		let [value, setValue] = useLocalStorage(key, "default");
		eq(value, "default");
		setValue("new value");
		eq(localStorage.getItem(key), '"new value"');

		// From memory
		[value, setValue] = useLocalStorage(key, "default");
		eq(value, "new value");

		// From localStorage
		useLocalStorage = createUseLocalStorage(createUseState());
		[value, setValue] = useLocalStorage(key, "default");
	} finally {
		localStorage.removeItem(key);
	}
});

Deno.test("useLocalStorage - custom serialize/deserialize", () => {
	const key = String(Math.random());

	try {
		let useLocalStorage = createUseLocalStorage(createUseState());

		const serialize = (value: number) => String(value * 2);
		const deserialize = (value: string) => Number(value) / 2;

		let [value, setValue] = useLocalStorage(key, 10, {
			serialize,
			deserialize,
		});
		eq(value, 10);
		setValue(20);
		eq(localStorage.getItem(key), "40");

		// From memory
		[value, setValue] = useLocalStorage(key, 10, { serialize, deserialize });
		eq(value, 20);

		// From localStorage
		useLocalStorage = createUseLocalStorage(createUseState());
		[value, setValue] = useLocalStorage(key, 10, { serialize, deserialize });
		eq(value, 20);
	} finally {
		localStorage.removeItem(key);
	}
});
