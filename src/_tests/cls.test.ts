import { cls } from "../cls.ts";
import { eq } from "./deps.test.ts";

Deno.test("cls", () => {
	// Strings
	eq(cls("a", "b"), "a b");

	// Booleans
	eq(cls(true && "a", false && "b"), "a");

	// Arrays
	eq(cls(["a", ["b", "c"]]), "a b c");

	// Objects
	eq(cls({ a: true, b: false, c: true }), "a c");

	// Functions
	eq(
		cls(
			() => "a",
			() => ["b", "c"],
		),
		"a b c",
	);

	// Ignored values
	eq(cls(0, null, undefined, true, false), "");

	// Combined
	eq(
		cls(
			"a",
			["b", "c", ["d", "e"]],
			{ f: true, g: false, h: true },
			() => "i",
			() => ["j", "k"],
			() => ({ l: true, m: false, n: true }),
			() => () => "o",
			0,
			null,
			undefined,
			true,
			false,
		),
		"a b c d e f h i j k l n o",
	);
});
