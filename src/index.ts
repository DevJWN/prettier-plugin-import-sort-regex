import type { Parser, SupportOption } from "prettier";
import prettierParserBabel from "prettier/parser-babel";
import prettierParserTypescript from "prettier/parser-typescript";

import { sortImports } from "import-sort";
import * as importSortParserBabylon from "import-sort-parser-babylon";
import * as importSortParserTypescript from "import-sort-parser-typescript";

import style from "./style";
import type { PluginOptions } from "./types";

const parsers: Record<string, Parser> = {
  babel: {
    ...prettierParserBabel.parsers.babel,
    preprocess: (code, options) => sortImports(code, importSortParserBabylon, style, undefined, options as PluginOptions).code,
  },
  typescript: {
    ...prettierParserTypescript.parsers.typescript,
    preprocess: (code, options) => sortImports(code, importSortParserTypescript, style, undefined, options as PluginOptions).code,
  },
};

const options: Record<string, Partial<SupportOption>> = {
  importSortGroups: {
    category: "JavaScript",
    type: "path",
    array: true,
    default: [{ value: [] }],
    description: "Groups of regex patterns in order to sort imports by. Use an empty string to denote a line separator.",
  },
  importSortByMemberType: {
    category: "JavaScript",
    type: "boolean",
    default: false,
    description: "Sort by member type first before sorting by package name.",
  },
};

module.exports = {
  parsers,
  options,
};
