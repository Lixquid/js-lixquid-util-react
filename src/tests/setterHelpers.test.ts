import { setFloat, setInteger, setString } from "../setterHelpers.ts";
import { eq } from "./deps.test.ts";

function ev(value: string) {
	return { target: { value } } as unknown as Event;
}

Deno.test("setString", () => {
	const calls: string[] = [];
	const callback = (value: string) => calls.push(value);

	setString(callback)(ev("a"));
	eq(calls, ["a"]);
	setString(callback)(ev("b"));
	eq(calls, ["a", "b"]);
});

Deno.test("setFloat - valid", () => {
	const calls: number[] = [];
	const callback = (value: number) => calls.push(value);

	setFloat(callback)(ev("1.5"));
	eq(calls, [1.5]);
	setFloat(callback)(ev("2.5"));
	eq(calls, [1.5, 2.5]);
})

Deno.test("setFloat - no fallback", () => {
	const calls: number[] = [];
	const callback = (value: number) => calls.push(value);

	setFloat(callback)(ev("1"));
	eq(calls, [1]);
	setFloat(callback)(ev("b"));
	eq(calls, [1]);
});

Deno.test("setFloat - fallback", () => {
	const calls: (number | null)[] = [];
	const callback = (value: number | null) => calls.push(value);

	setFloat(callback, null)(ev("1"));
	eq(calls, [1]);
	setFloat(callback, null)(ev("b"));
	eq(calls, [1, null]);
});

Deno.test("setInteger - valid", () => {
	const calls: number[] = [];
	const callback = (value: number) => calls.push(value);

	setInteger(callback)(ev("1"));
	eq(calls, [1]);
	setInteger(callback)(ev("2"));
	eq(calls, [1, 2]);
});

Deno.test("setInteger - no fallback", () => {
	const calls: number[] = [];
	const callback = (value: number) => calls.push(value);

	setInteger(callback)(ev("1"));
	eq(calls, [1]);
	setInteger(callback)(ev("b"));
	eq(calls, [1]);
});

Deno.test("setInteger - fallback", () => {
	const calls: (number | null)[] = [];
	const callback = (value: number | null) => calls.push(value);

	setInteger(callback, null)(ev("1"));
	eq(calls, [1]);
	setInteger(callback, null)(ev("b"));
	eq(calls, [1, null]);
});
