# Import from Path Module

The `import-from-path` module is designed to simplify the process of importing files dynamically based on a specified pattern from a directory. This utility is particularly useful in projects where schemas or resolvers are split across multiple files and need to be dynamically loaded during runtime.

### Features

- **Dynamic Importing**: Automatically imports files based on regex patterns.
- **Recursive Search**: Traverses directories recursively to find matches.
- **Promise-based API**: Uses promises to handle asynchronous file operations, ensuring that all files are loaded properly before proceeding.

## Installation
```bash
npm install import-from-path
```

#### Usage

```typescript
import importFromPath from 'import-from-path';

await importFromPath('path/to/directory', /\.ts$/); // Import all TypeScript files
```

## Example

To dynamically load GraphQL schema and resolver files in a directory, you might use `importFromPath` like this:

```typescript
import importFromPath from 'import-from-path';

async function loadSchemasAndResolvers() {
  await importFromPath(__dirname + '/schemas', /\.schema\.ts$/);
  await importFromPath(__dirname + '/resolvers', /\.resolver\.ts$/);
}

loadSchemasAndResolvers();
```

This setup will help ensure that all necessary GraphQL components are loaded dynamically at runtime, which is particularly useful in large projects with modularized schema or resolver definitions.

## Error Handling

The functions in `import-from-path` are designed to handle errors internally and will reject the promise if an error occurs during file reading or directory listing. Make sure to use try-catch blocks to handle these rejections properly in your application.

