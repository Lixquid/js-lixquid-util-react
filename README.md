# React Utilities

Utility functions and hooks for a variety of React-style frameworks.

## Methodology

To allow this library to be used with React, Preact, or any other library that
implements the React API, all utilities or hooks are provided via factory
functions. This means that to use anything that requires built-in React
functionality, you must pass in the required functions as arguments.
