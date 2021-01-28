# prettier-plugin-import-sort-regex

Prettier plugin using [import-sort](https://www.npmjs.com/package/import-sort) to organize by regular expressions.

## Usage

### **Installation**

#### _With npm_:

```
 npm i -D prettier-plugin-import-sort-regex
```

#### _With yarn_:

```
yarn add -D prettier-plugin-import-sort-regex
```

### Customization

Add the `importSortGroups` key to your prettier configuration (eg. in `.prettierrc.json`, `.prettierrc.js`, etc.) with a string array of regex patterns. An empty string `""` will insert a separator line between entries. The regex pattern will match against the import package name.

#### _Example_:

```json
{
  "importSortGroups": [
    "^react$",
    "",
    "^(?:_|clsx|fs|lodash/?.*|path)$",
    "",
    "^@?[\\w\\-]+",
    "",
    "^\\./[\\w\\-]+$",
    "",
    "^\\.\\?./",
    "",
    "\\.json$",
    "",
    "\\.s?css$"
  ]
}
```
