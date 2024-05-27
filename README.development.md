## Creating a new version

1. Verify tests pass with `deno test`.
2. Verify there are no issues with `deno publish --dry-run`.
3. Update the version in [deno.json](./deno.json).
4. Commit with message `Release vX.Y.Z`.
5. Create a new tag with `git tag vX.Y.Z`.
6. Push the commit with `git push`.
7. Push the tag with `git push origin vX.Y.Z`.
8. Publish to JSR with `deno publish`.
