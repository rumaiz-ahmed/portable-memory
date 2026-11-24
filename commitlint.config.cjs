module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // DCO: every commit must carry a Signed-off-by trailer.
    "signed-off-by": [2, "always", "Signed-off-by:"],
  },
};
