var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};
__markAsModule(exports);
__export(exports, {
  default: () => src_default
});
var import_util = __toModule(require("util"));
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_marked = __toModule(require("marked"));
var src_default = (options) => ({
  name: "md",
  setup(build) {
    build.onResolve({filter: /\.md$/}, (args) => {
      if (args.resolveDir === "")
        return;
      return {
        path: import_path.default.isAbsolute(args.path) ? args.path : import_path.default.join(args.resolveDir, args.path),
        namespace: "md"
      };
    });
    build.onLoad({filter: /.*/, namespace: "md"}, (args) => {
      const md = new import_util.TextDecoder().decode(import_fs.default.readFileSync(args.path));
      const data = import_marked.marked.parse(md, options);
      return {
        contents: `export default ${JSON.stringify(data)};`,
        loader: "js"
      };
    });
  }
});
