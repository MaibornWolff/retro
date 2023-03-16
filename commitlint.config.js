module.exports = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",

  parserPreset: {
    parserOpts: {
      issuePrefixes: ["#"],
    },
  },
};
