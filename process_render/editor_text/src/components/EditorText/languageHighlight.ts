import hljs from 'highlight.js';
// import pygmentize from 'pygmentize-bundled';


export function setupLangHighlight(marked: any, langu: string) {
  marked.setOptions({
    async: false, // 如果为true，函数可以是异步的，并且将返回一个承诺，该承诺在所有walk tokens函数解析时解析
    baseUrl: null, // 任何相对链接的前缀url。
    breaks: false, // 如果为true，则添加一个换行符(复制注释上的GitHub行为，但不复制渲染的markdown文件)。Requires be.<br>gfmtrue
    gfm: true, // 如果是真的，使用批准的GitHub风味减价(GFM)规格。
    headerIds: true,
    headerPrefix: '', // 发出标题时作为属性前缀的字符串(h1、h2、h3等)。身份证明（identification）
    highlight: function (code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : langu;
      return hljs.highlight(code, { language }).value;

    },
    langPrefix: 'hljs language-', // 突出显示代码块的函数，请参见[异步突出显示](https://marked.js.org/using_advanced#highlight)。
    mangle: true, // 如果为真，自动链接的电子邮件地址将与HTML字符引用一起转义。
    pedantic: false, // 如果是真的，尽可能符合原著。不要修复原始的markdown 错误或行为。关闭并覆盖 .markdown.plgfm
    renderer: new marked.Renderer(), // 一个包含将标记呈现给HTML的函数的对象。有关更多详细信息，请参见[扩展性](https://marked.js.org/using_pro)。
    sanitize: false, // 如果为true，则使用函数整理传入的HTML。警告:此功能已被否决，不应使用，因为它被认为是不安全的。
    sanitizer: null, // 	A function to sanitize the HTML passed into .markdownString
    silent: false, // 如果为true，解析器不会抛出任何异常。
    smartypants: false, // 如果是真的，使用 "smart" 印刷标点符号，如引号和破折号。
    tokenizer: new marked.Tokenizer(), // 包含从markdown创建令牌的函数的对象。有关更多详细信息，请参见[扩展性](https://marked.js.org/using_pro)。
    walkTokens: null,  // 为每个标记调用的函数。有关更多详细信息，请参见[扩展性](https://marked.js.org/using_pro)。
    xhtml: false,  // 如果为true，则为void元素发出自结束HTML标记 (<br/>, <img/>等) 加上一个 "/" ，这是XHTML所要求的。
  });
}