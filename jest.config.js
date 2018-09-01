module.exports = {
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/src/tests/.*|(\\.|/)(test|spec))\\.(ts)$",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
};