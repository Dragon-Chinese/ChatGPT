import { defineComponent } from "vue";
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const MarkdownRenderer = (props) => {
  const md = new MarkdownIt({
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang }).value +
            '</code></pre>';
        } catch (__) { }
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  return (
    <div class="markdown-body" innerHTML={md.render(props.content)}></div>
  );
};

export default MarkdownRenderer;
