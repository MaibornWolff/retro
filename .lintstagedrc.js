module.exports = {
  "**/*.[j|t]s?(x)": (filenames) => `eslint ${filenames.join(" ")} --fix`,
  "**/*.{json,md,yml,yaml}": (filenames) => `prettier --write ${filenames.join(" ")}`,
};
