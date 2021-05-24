import React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/go/go";
import "codemirror/theme/base16-light.css";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";

export default ({ value, language, autoSave }) => {
  switch (language) {
    case "C":
      language = "text/x-csrc";
      break;
    case "C++":
      language = "text/x-c++src";
      break;
    case "C#":
      language = "text/x-csharp";
      break;
    case "Go":
      language = "go";
      break;
    case "Javascript":
      language = "javascript";
      break;
    default:
      language = "text/x-csrc";
  }
  const options = {
    lineNumbers: true, // 显示行号
    mode: language, // 定义mode
    extraKeys: {
      "Ctrl-H": "autocomplete",
    }, // 自动提示配置
    theme: "base16-light", // 选中的theme
    smartIndent: true, // 自动缩进
    matchBrackets: true, // 括号匹配
    autoCloseBrackets: true,
  };

  return <CodeMirror value={value} autoFocus options={options} onChange={autoSave} />;
};
