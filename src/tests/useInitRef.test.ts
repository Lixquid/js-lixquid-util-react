import { createUseInitRef } from "../useInitRef.ts";
import { eq } from "./deps.test.ts";

Deno.test("useInitRef", () => {
	let obj: { current: unknown } | undefined;
	const useRef = <T>(initialValue: T) => {
		if (obj === undefined) {
			obj = { current: initialValue };
		}
		return obj;
	};

	const useInitRef = createUseInitRef(useRef);
	let initialValue: number | undefined;
	let calls = 0;
	for (let i = 0; i < 10; i++) {
		const ref = useInitRef(() => {
			calls++;
			const v = Math.random();
			if (initialValue === undefined) {
				initialValue = v;
			}
			return v;
		});
		// Ensure we always get the same ref object.
		eq(ref.current, initialValue);
	}
	// Ensure the init function was only called once.
	eq(calls, 1);
});
