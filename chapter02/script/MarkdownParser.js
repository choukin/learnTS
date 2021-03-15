"use strict";
class HtmlHandler {
    constructor() {
        this.markdownChange = new MarkDown;
    }
    TextChangeHandler(id, output) {
        let markdown = document.getElementById(id);
        let markdownOutput = document.getElementById(output);
        if (markdown !== null) {
            markdown.onkeyup = (e) => {
              this.RenderHtmlContent(markdown, markdownOutput)
            };
            markdown.onload = (e) => {
                this.RenderHtmlContent(markdown, markdownOutput);
            };
        }
    }
    RenderHtmlContent(markdown, markdownOutput) {
        if (markdown.value) {
            markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
        }
        else {
            markdownOutput.innerHTML = '<p></p>';
        }
    }
}
// 通过枚举定义我们将提供用户使用的标签
var TagType;
(function (TagType) {
    TagType[TagType["Paragraph"] = 0] = "Paragraph";
    TagType[TagType["Header1"] = 1] = "Header1";
    TagType[TagType["Header2"] = 2] = "Header2";
    TagType[TagType["Header3"] = 3] = "Header3";
    TagType[TagType["HorizontalRule"] = 4] = "HorizontalRule";
})(TagType || (TagType = {}));
// 处理映射 只具有单一职责
class TagTypeToHtml {
    constructor() {
        this.tageType = new Map();
        this.tageType.set(TagType.Header1, 'h1');
        this.tageType.set(TagType.Header2, 'h2');
        this.tageType.set(TagType.Header3, 'h3');
        this.tageType.set(TagType.Paragraph, 'p');
        this.tageType.set(TagType.HorizontalRule, 'hr');
    }
    /**
     * 获取开始标签
     * @param tagType
     */
    OpeningTag(tagType) {
        return this.GetTag(tagType, '<');
    }
    CloseingTag(tagType) {
        return this.GetTag(tagType, '</');
    }
    GetTag(tagType, openingTagPattern) {
        let tag = this.tageType.get(tagType);
        if (tag !== null) {
            return `${openingTagPattern + tag}>`;
        }
        return `${openingTagPattern}p>`;
    }
}
/**
 * 文档的维护方式向消费代码隐藏，内部调整内容的更新方式
 */
class MarkdownDocument {
    constructor() {
        this.content = '';
    }
    Add(...content) {
        content.forEach(item => {
            this.content += item;
        });
    }
    Get() {
        return this.content;
    }
}
// 代表正在处理的行
class ParseElement {
    constructor() {
        this.CurrentLine = "";
    }
}
class VisitorBase {
    constructor(tagType, tagTypeToHtml) {
        this.tagType = tagType;
        this.tagTypeToHtml = tagTypeToHtml;
    }
    Visitor(token, markdownDocument) {
        markdownDocument.Add(this.tagTypeToHtml.OpeningTag(this.tagType), token.CurrentLine, this.tagTypeToHtml.CloseingTag(this.tagType));
    }
}
class Header1Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header1, new TagTypeToHtml());
    }
}
class Header2Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header2, new TagTypeToHtml());
    }
}
class Header3Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header2, new TagTypeToHtml());
    }
}
class ParagraphVisitor extends VisitorBase {
    constructor() {
        super(TagType.Paragraph, new TagTypeToHtml());
    }
}
class HorizontalRuleVisitor extends VisitorBase {
    constructor() {
        super(TagType.HorizontalRule, new TagTypeToHtml());
    }
}
class Visitable {
    Accept(visitor, token, markdownDocument) {
        visitor.Visitor(token, markdownDocument);
    }
}
// 责任链模式
// 抽象类
class Handler {
    constructor() {
        this.next = null;
    }
    // 指定类链中的下一个类
    SetNext(next) {
        this.next = next;
    }
    HandleRequest(request) {
        // 判断当前类是否能够处理请求
        if (!this.CanHandle(request)) {
            // 如果不能处理请求或者 next null 将请求传递给下一个类
            if (this.next !== null) {
                this.next.HandleRequest(request);
            }
            return;
        }
    }
}
class ParseChainHandler extends Handler {
    constructor(document, tagType, visitor) {
        super();
        this.document = document;
        this.tagType = tagType;
        this.visitor = visitor;
        this.visitable = new Visitable();
    }
    CanHandle(request) {
        let split = new LineParser().Parse(request.CurrentLine, this.tagType);
        if (split[0]) {
            request.CurrentLine = split[1];
            this.visitable.Accept(this.visitor, request, this.document);
        }
        return split[0];
    }
}
class LineParser {
    Parse(value, tag) {
        let output = [false, ''];
        output[1] = value;
        if (value === '') {
            return output;
        }
        let split = value.startsWith(`${tag}`);
        if (split) {
            output[0] = true;
            output[1] = value.substr(tag.length);
        }
        return output;
    }
}
class ParagraphHandler extends Handler {
    constructor(document) {
        super();
        this.document = document;
        this.visitable = new Visitable();
        this.visitor = new ParagraphVisitor();
    }
    CanHandle(request) {
        this.visitable.Accept(this.visitor, request, this.document);
        return true;
    }
}
// 标签具体的处理程序
class Header1ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, "# ", new Header1Visitor);
    }
}
class Header2ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, "## ", new Header2Visitor);
    }
}
class Header3ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, "### ", new Header2Visitor);
    }
}
class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '---', new HorizontalRuleVisitor());
    }
}
// 处理程序链
class ChainOfResponsibilityFactory {
    Build(document) {
        let header1 = new Header1ChainHandler(document);
        let header2 = new Header2ChainHandler(document);
        let header3 = new Header3ChainHandler(document);
        let horizontalRule = new HorizontalRuleHandler(document);
        let paragraph = new ParagraphHandler(document);
        header1.SetNext(header2);
        header2.SetNext(header3);
        header3.SetNext(horizontalRule);
        horizontalRule.SetNext(paragraph);
        return header1;
    }
}
class MarkDown {
    ToHtml(text) {
        let document = new MarkdownDocument();
        let header1 = new ChainOfResponsibilityFactory().Build(document);
        let lines = text.split(`\n`);
        for (let index = 0; index < lines.length; index++) {
            let parseElement = new ParseElement();
            parseElement.CurrentLine = lines[index];
            header1.HandleRequest(parseElement);
        }
        return document.Get();
    }
}
//# sourceMappingURL=MarkdownParser.js.map