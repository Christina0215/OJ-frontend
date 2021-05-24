import Markdownit from "markdown-it";
import markdownitmark from "markdown-it-mark";
import hljs from "highlight.js";
import markdownittexmath from "markdown-it-texmath";
import kt from "katex";

const tm = markdownittexmath.use(kt);

const md = new Markdownit({
  html: false,
  breaks: true,
  typographer: true,
  langPrefix: "language-",
  linkify: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        console.log(hljs.highlight(lang, str, true).value);
        return `<pre class="hljs"  style="background-color:#f7f9fa; min-width:80%"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      } catch (__) {
        console.error("some thing wrong with highlight.js");
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
  quotes: "“”‘’",
})
  .use(tm, { delimiters: "dollars", macros: { "\\RR": "\\mathbb{R}" } })
  .use(markdownitmark);

export default md;
