const example = `

<center><font size=5 color="green"><b>MarkDown 编辑器</b></font></center>
<center><font size=5 color="green"><b>用法案例详解</b></font></center><hr>


<center><font size=6 color="#476A6D"><b>目  录</b></font ></center><hr>

[1.标题](#1)

[2.文本样式](#2)

[3.列表](#3)

[4.图片](#4)

[5.链接](#5)

[6.目录](#6)

[7.代码片](#7)

[8.表格](#8)

[9.脚注](#9)

[10.注释](#10)

[11.自定义列表](#11)

[12.数学公式](#12)

[13.甘特图](#13)

[14.UML 图](#14)

[15.Mermaid流程图](#15)

[16.Flowchart流程图](#16)

[17.类图](#17)

---

<div id="1"></div>

# [1.标题](#1)

\`\`\`md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
\`\`\`

<div id="2"></div>

# [2.文本样式](#2)

\`\`\`
*强调文本* _强调文本_

**加粗文本** __加粗文本__

==标记文本==

~~删除文本~~

> 引用文本

H~2~O is是液体。

2^10^ 运算结果是 1024。

\`\`\`


<div id="3"></div>

# [3.列表](#3)

\`\`\`md
- 项目
  * 项目
    + 项目

1. 项目1
2. 项目2
3. 项目3

- [ ] 计划任务
- [x] 完成任务

\`\`\`


<div id="4"></div>

# [4.图片](#4)

\`\`\`md
图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png)

带尺寸的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png =60x60)

宽度确定高度等比例的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png =60x)

高度确定宽度等比例的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png =x60)

居中的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png#pic_center)

居中并且带尺寸的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png#pic_center =60x60)

居右的图片: ![Alt](https://img-home.csdnimg.cn/images/20220524100510.png#pic_right)

\`\`\`

<div id="5"></div>

# [5.链接](#5)

\`\`\`md
链接: [link](https://www.csdn.net/)
\`\`\`

<div id="6"></div>

# [6.目录](#6)

\`\`\`md
@[TOC](这里写目录标题)
# 一级目录
## 二级目录
### 三级目录
\`\`\`

<div id="7"></div>

# [7.代码片](#7)

<code class="jcstudio language-md">

\`\`\`
// A code block
var foo = 'bar';
\`\`\`

\`\`\`javascript
// An highlighted block
var foo = 'bar';
\`\`\`

</code>

<div id="8"></div>

# [8.表格](#8)

\`\`\`md
项目     | Value
-------- | -----
电脑  | $1600
手机  | $12
导管  | $1

| Column 1 | Column 2      |
|:--------:| -------------:|
| centered 文本居中 | right-aligned 文本居右 |

\`\`\`

<div id="9"></div>

# [9.脚注](#9)

\`\`\`md
一个具有注脚的文本。[^1]

[^1]: 注脚的解释
\`\`\`

<div id="10"></div>

# [10.注释](#10)

\`\`\`md
Markdown将文本转换为 HTML。

*[HTML]:   超文本标记语言
\`\`\`

<div id="11"></div>

# [11.自定义列表](#11)

\`\`\`md
Markdown
:  Text-to-HTML conversion tool

Authors
:  John
:  Luke
\`\`\`


<div id="12"></div>

# [12.数学公式](#12)

[参考文档](https://khan.github.io/KaTeX/)

\`\`\`md
Gamma公式展示 $\\Gamma(n) = (n-1)!\\quad\\forall
n\\in\\mathbb N$ 是通过 Euler integral

$$
\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.
$$
\`\`\`

<div id="13"></div>

# [13.甘特图](#13)

[参考文档](https://mermaid-js.github.io/mermaid/#/gantt)

<code class="jcstudio language-md">

\`\`\`mermaid
gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram functionality to mermaid
    section 现有任务
    已完成               :done,    des1, 2014-01-06,2014-01-08
    进行中               :active,  des2, 2014-01-09, 3d
    计划中               :         des3, after des2, 5d
\`\`\`

<code>

<div id="14"></div>

# [14.UML 图](#14)

[参考文档](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)

<code class="jcstudio language-md">

\`\`\`mermaid
sequenceDiagram
张三 ->> 李四: 你好！李四, 最近怎么样?
李四-->>王五: 你最近怎么样，王五？
李四--x 张三: 我很好，谢谢!
李四-x 王五: 我很好，谢谢!
Note right of 王五: 李四想了很长时间, 文字太长了<br/>不适合放在一行.

李四-->>张三: 打量着王五...
张三->>王五: 很好... 王五, 你怎么样?
\`\`\`

</code>

<div id="15"></div>

# [15.Mermaid流程图](#15)

[参考文档](https://mermaid-js.github.io/mermaid/#/flowchart?id=graph)

<code class="jcstudio language-md">

\`\`\`mermaid
graph LR
A[长方形] -- 链接 --> B((圆))
A --> C(圆角长方形)
B --> D{菱形}
C --> D
\`\`\`

</code>

<div id="16"></div>

# [16.Flowchart流程图](#16)

[参考文档](http://flowchart.js.org/)

<code class="jcstudio language-md">

\`\`\`mermaid
flowchat
st=>start: 开始
e=>end: 结束
op=>operation: 我的操作
cond=>condition: 确认？

st->op->cond
cond(yes)->e
cond(no)->op
\`\`\`

</code>

<div id="17"></div>

# [17.类图](#17)

[参考文档](http://flowchart.js.org/)

<code class="jcstudio language-md">

\`\`\`mermaid
classDiagram
    Class01 <|-- AveryLongClass : Cool
    <<interface>> Class01
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    class Class10 {
        >>service>>
        int id
        size()
    }
\`\`\`

</code>



`

export default {
  example
}