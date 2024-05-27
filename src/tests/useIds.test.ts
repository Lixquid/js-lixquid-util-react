import { createUseIds } from "../useIds.ts";
import { eq } from "./deps.test.ts";

Deno.test("useIds", () => {
	const ref = {current: [] as string[]}
	const useRef = () => ref

	const useIds = createUseIds(useRef);
	const [id1, id2, id3] = useIds();

	for (const id of [id1, id2, id3]) {
		eq(typeof id, "string")
		eq(id.length, 20)
	}
})

Deno.test("useIds - length", () => {
	const ref = {current: [] as string[]}
	const useRef = () => ref

	const useIds = createUseIds(useRef, 10);
	const [id1, id2, id3] = useIds();

	for (const id of [id1, id2, id3]) {
		eq(typeof id, "string")
		eq(id.length, 10)
	}
});
