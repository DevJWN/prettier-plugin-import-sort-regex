import type { IImport } from "import-sort-parser";
import type { IMatcherFunction, ISorterFunction, IStyle } from "import-sort-style";

import type { StyleOptions } from "./types";

const defaultGroups = [
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
  "\\.s?css$",
];

const memberType: ISorterFunction = (i1: IImport, i2: IImport) => {
  const compareHasNamespaceMember = Number(Boolean(i1.namespaceMember)) - Number(Boolean(i2.namespaceMember));
  if (compareHasNamespaceMember !== 0) {
    return compareHasNamespaceMember;
  }

  const compareHasDefaultMember = Number(Boolean(i1.defaultMember)) - Number(Boolean(i2.defaultMember));
  if (compareHasDefaultMember !== 0) {
    return compareHasDefaultMember;
  }

  const compareHasNamedMembers = Number(i1.namedMembers.length > 0) - Number(i2.namedMembers.length > 0);
  return compareHasNamedMembers;
};

const style: IStyle = (styleApi, _file, options?: StyleOptions) => {
  try {
    const groups = options?.importSortGroups || defaultGroups;
    const sortByMemberType = options?.importSortByMemberType || false;

    const { and, unicode, moduleName, member, name, hasNoMember, isAbsoluteModule, isRelativeModule } = styleApi;

    return [
      { match: and(hasNoMember, isAbsoluteModule) },
      { separator: true },

      { match: and(hasNoMember, isRelativeModule) },
      { separator: true },

      ...groups.map((group) => {
        if (group === "") return { separator: true };

        const match: IMatcherFunction = (i: IImport) => Boolean(new RegExp(group).exec(i.moduleName));

        return {
          match,
          sort: [...(sortByMemberType ? [memberType] : []), moduleName(unicode), member(unicode)],
          sortNamedMembers: name(unicode),
        };
      }),
      { separator: true },
    ];
  } catch {
    return [];
  }
};

export default style;
