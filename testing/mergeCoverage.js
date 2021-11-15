/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */
const { execSync } = require("child_process");
const fs = require("fs-extra");
const REPORTS_FOLDER = "reports";
const FINAL_OUTPUT_FOLDER = "docs/coverage";
const run = (commands) => {
  commands.forEach((command) => execSync(command, { stdio: "inherit" }));
};

// Create the reports folder and move the reports from cypress and jest inside it
fs.rmSync("coverage", { recursive: true, force: true });
fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync(
  "coverage_cypress/coverage-final.json",
  `${REPORTS_FOLDER}/from-cypress.json`
);
fs.copyFileSync(
  "coverage_jest/coverage-final.json",
  `${REPORTS_FOLDER}/from-jest.json`
);
//fs.emptyDirSync(".nyc_output");
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);
// Run "nyc merge" inside the reports folder, merging the two coverage files into one,
// then generate the final report on the coverage folder

// "nyc merge" will create a "coverage.json" file on the root, we move it to .nyc_output
run([`nyc merge ${REPORTS_FOLDER}`]);
fs.copyFileSync("coverage.json", ".nyc_output/out.json");
run([`nyc report --reporter lcov --report-dir ${FINAL_OUTPUT_FOLDER}`]);

fs.rmSync("coverage_cypress", { recursive: true });
fs.rmSync("coverage_jest", { recursive: true });
// fs.rmSync(".nyc_output", { recursive: true });
fs.rmSync("reports", { recursive: true });
fs.rmSync("coverage.json", { recursive: true });
