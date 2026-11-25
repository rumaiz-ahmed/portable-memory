module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    // Dependabot uses sentence case for dependency bump subjects; keep requiring DCO.
    (message) =>
      message.startsWith("chore(deps-dev): Bump ") &&
      /(?:^|\n)Signed-off-by: .+ <[^>\n]+>/.test(message),
  ],
  rules: {
    // DCO: every commit must carry a Signed-off-by trailer.
    "signed-off-by": [2, "always", "Signed-off-by:"],
  },
};
