# React Utilities

Utility functions and hooks for a variety of React-style frameworks.

## Methodology

To allow this library to be used with React, Preact, or any other library that
implements the React API, all utilities or hooks are provided via factory
functions. This means that to use anything that requires built-in React
functionality, you must pass in the required functions as arguments.

For example:

```ts
// hooks.ts
import { useRef } from "react";
import { createUseIds } from "@lixquid/util-react";

export const useIds = createUseIds(useRef);
```

```tsx
// MyComponent.tsx
import { useIds } from "./hooks";

export function MyComponent() {
  const [id] = useIds();
  return <div id={id}>Hello, world!</div>;
}
```

It's recommended to create a file that constructs all of the utilities you need
and exports them to avoid having to build the utilities every time you need
them.
