"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod !== null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const next_1 = __importDefault(require("next"));
const path_1 = __importDefault(require("path"));
// const dev = process.env.NODE_ENV !== "production";
const app = next_1.default({
  dev: false,
  conf: { distDir: `${path_1.default.relative(process.cwd(), __dirname)}/next` }
  // conf: { dir: "./src/functions/next", distDir: "next" }
});
const handle = app.getRequestHandler();
exports.next = functions.https.onRequest(async (req, res) => {
  console.log("File: " + req.originalUrl); // log the page.js file that is being requested
  await app.prepare();
  handle(req, res);
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map
