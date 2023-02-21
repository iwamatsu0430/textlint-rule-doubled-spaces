const { matchPatterns } = require("@textlint/regexp-string-matcher");

const defaultOptions = {
  allow: [],
};

const reporter = (context, options = {}) => {
  const { Syntax, RuleError, report, getSource, fixer } = context;
  const allow = options.allow ?? defaultOptions.allow;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      const allowMatch = matchPatterns(text, allow);
      const regex = /\s{2,}/g;
      while (true) {
        const matches = regex.exec(text);
        if (!matches) break;
        const isAllow = allowMatch.some(
          (m) => m.startIndex < matches.index && matches.index < m.endIndex
        );
        if (!isAllow) {
          report(
            node,
            new RuleError("Found doubled spaces.", {
              index: matches.index,
              fix: fixer.replaceTextRange([matches.index, matches.index + matches[0].length], " "),
            })
          );
        }
      }
    },
  };
};

export default {
  linter: reporter,
  fixer: reporter,
};
