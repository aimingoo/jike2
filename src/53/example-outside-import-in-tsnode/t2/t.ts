// NOTE1：ESM支持将目录作为模块导入，准确地说，这与ES规范无关；
// NOTE2："../a"如何处理是具体执行环境决定的，例如Node.js。简单的说，是Node.js的配置决定了这里的"../a"是否能导入！
// NOTE3：在Node.js中这是预期的行为，因为Node.js不支持ESM的目录导入！ @see https://github.com/TypeStrong/ts-node/issues/1832#issuecomment-1179910063
import "../a";

export {}