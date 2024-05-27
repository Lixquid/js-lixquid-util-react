## Creating a new version

1. Verify there are no issues with `deno publish --dry-run`.
2. Update the version in [deno.json](./deno.json).
3. Commit with message `Release vX.Y.Z`.
4. Create a new tag with `git tag vX.Y.Z`.
5. Push the commit with `git push`.
6. Push the tag with `git push origin vX.Y.Z`.
7. Publish to JSR with `deno publish`.
