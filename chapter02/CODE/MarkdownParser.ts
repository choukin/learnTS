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
class HParagraphVisitor  extends VisitorBase{
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