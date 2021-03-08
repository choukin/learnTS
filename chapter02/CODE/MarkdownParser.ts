class HtmlHandler{
    public TextChangeHandler(id:string,output:string):void{
        let markdown = <HTMLTextAreaElement>document.getElementById(id)
        let markdownOutput = <HTMLLabelElement>document.getElementById(output)

        if(markdown!==null){
            markdown.onkeyup = (e)=>{
                if(markdown.value) {
                    markdownOutput.innerHTML = markdown.value
                }
                else{
                    markdownOutput.innerHTML = "<p></p>"
                }
            }
        } 
    }
}

// 通过枚举定义我们将提供用户使用的标签
enum TagType{
    Paragraph,
    Header1,
    Header2,
    Header3,
    HorizontalRule
}

// 处理映射 只具有单一职责
class TagTypeToHtml{
    private readonly tageType: Map<TagType,string> = new Map<TagType,string>()
    constructor(){
        this.tageType.set(TagType.Header1,'h1')
        this.tageType.set(TagType.Header2,'h2')
        this.tageType.set(TagType.Header3,'h3')
        this.tageType.set(TagType.Paragraph,'p')
        this.tageType.set(TagType.HorizontalRule,'hr')
    }

    /**
     * 获取开始标签
     * @param tagType 
     */
    public OpeningTag(tagType:TagType) :string{
        return this.GetTag(tagType,'<')
    }

    public CloseingTag(tagType:TagType):string{
        return this.GetTag(tagType,'</')
    }

    private GetTag(tagType:TagType,openingTagPattern:string):string{
        let tag = this.tageType.get(tagType)
        if(tag!==null){
            return `${openingTagPattern+tag}>`
        }
        return `${openingTagPattern}p>`
    }
}

interface IMarkdownDocument{
    Add(...content:string[]):void
    Get():string
}

/**
 * 文档的维护方式向消费代码隐藏，内部调整内容的更新方式
 */
class MarkdownDocument implements IMarkdownDocument{
    private content :string = ''
    Add(...content:string[]):void{
        content.forEach(item=>{
            this.content += item
        })
    }
    Get():string{
        return this.content
    }
}

// 代表正在处理的行
class ParseElement{
    CurrentLine: string = ""
}

interface IVisitor{
    Visitor(token:ParseElement,markdownDocument:IMarkdownDocument):void;
}
interface IVisitable{
    Accept(visitor: IVisitor, token:ParseElement,markdownDocument:IMarkdownDocument):void
}

abstract class VisitorBase implements IVisitor{
    constructor(private readonly tagType:TagType,private readonly tagTypeToHtml:TagTypeToHtml){}
    Visitor(token:ParseElement,markdownDocument:IMarkdownDocument):void{
        markdownDocument.Add(this.tagTypeToHtml.OpeningTag(this.tagType),token.CurrentLine,this.tagTypeToHtml.CloseingTag(this.tagType))

    }
}

class Header1Visitor extends VisitorBase{
    constructor(){
        super(TagType.Header1,new TagTypeToHtml())
    }
}

class Header2Visitor  extends VisitorBase{
    constructor() {
        super(TagType.Header2,new TagTypeToHtml())
    }
}
class Header3Visitor  extends VisitorBase{
    constructor() {
        super(TagType.Header2,new TagTypeToHtml())
    }
}
class ParagraphVisitor  extends VisitorBase{
    constructor() {
        super(TagType.Paragraph,new TagTypeToHtml())
    }
}

class HorizontalRuleVisitor extends VisitorBase{
    constructor() {
        super(TagType.HorizontalRule, new TagTypeToHtml())
    }
}

class Visitable implements IVisitable{
    Accept(visitor:IVisitor,token:ParseElement,markdownDocument:IMarkdownDocument):void {
        visitor.Visitor(token, markdownDocument)
    }
}

// 责任链模式
// 抽象类
abstract class Handler<T>{
 protected next :Handler<T>|null = null;
 
 // 指定类链中的下一个类
 public SetNext(next:Handler<T>):void{
    this.next = next;
 }

 public HandleRequest(request:T):void{
     // 判断当前类是否能够处理请求
     if(!this.CanHandle(request)){
         // 如果不能处理请求或者 next null 将请求传递给下一个类
         if(this.next !== null){
             this.next.HandleRequest(request)
         }
         return ;
     }
 }

 protected abstract CanHandle(request:T):boolean;
}

class ParseChainHandler extends Handler<ParseElement> {
    private readonly visitable:IVisitable = new Visitable()
    constructor(private readonly document:IMarkdownDocument,
        private readonly tagType:string,
        private readonly visitor:IVisitor
        ) {
        super()
    }

    protected CanHandle(request: ParseElement): boolean {
        let split = new LineParser().Parse(request.CurrentLine,this.tagType)
        if(split[0]) {
            request.CurrentLine = split[1]
            this.visitable.Accept(this.visitor,request,this.document)
        }
        return split[0]
    }
}

class LineParser{
    public Parse(value:string, tag:string):[boolean,string]{
        let output:[boolean,string] = [false,'']
        output[1] = value
        if(value === ''){
            return output
        }

        let split = value.startsWith(`${tag}`)
        if(split) {
            output[0] = true
            output[1] = value.substr(tag.length)
        }
        return output
    }
}


class ParagraphHandler extends Handler<ParseElement> {
    private readonly visitable:IVisitable = new Visitable()
    private readonly visitor: IVisitor = new ParagraphVisitor()
    protected CanHandle(request: ParseElement):boolean{
        this.visitable.Accept(this.visitor, request,this.document)
        return true
    }
    constructor(private readonly document:IMarkdownDocument) {
        super()
    }

}

// 标签具体的处理程序

class Header1ChainHandler extends ParseChainHandler {
    constructor(document:IMarkdownDocument) {
        super(document,"# ", new Header1Visitor)
    }
}
class Header2ChainHandler extends ParseChainHandler {
    constructor(document:IMarkdownDocument) {
        super(document,"## ", new Header2Visitor)
    }
}
class Header3ChainHandler extends ParseChainHandler {
    constructor(document:IMarkdownDocument) {
        super(document,"### ", new Header2Visitor)
    }
}

class HorizontalRuleHandler extends ParseChainHandler{
    constructor(document:IMarkdownDocument) {
        super(document,'---', new HorizontalRuleVisitor())
    }
}

// 处理程序链

class ChainOfResponsibilityFactory{
    Build(document:IMarkdownDocument): ParseChainHandler{
        let header1: Header1ChainHandler = new Header1ChainHandler(document)
        let header2: Header2ChainHandler = new Header2ChainHandler(document)
        let header3: Header3ChainHandler = new Header3ChainHandler(document)
        let horizontalRule:HorizontalRuleHandler = new HorizontalRuleHandler(document)

        let paragraph: ParagraphHandler = new ParagraphHandler(document)

        header1.SetNext(header2)
        header2.SetNext(header3)
        header3.SetNext(horizontalRule)
        horizontalRule.SetNext(paragraph)

        return header1
    }
}