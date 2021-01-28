import type { ParserOptions } from "prettier";

export type StyleOptions = {
  importSortGroups?: string[];
  importSortByMemberType?: boolean;
};

export type PluginOptions = ParserOptions & StyleOptions;
