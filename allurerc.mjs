import { defineConfig } from "allure";

export default defineConfig({
  name: "Allure Report",
  output: "./allure-report",
  historyPath: "./allure-history/history.jsonl",
//   qualityGate: {
//     rules: [
//       {
//         maxFailures: 5,
//         fastFail: true,
//       },
//     ],
//   },
});