export interface IPersonState{
    FirstName: string,
    LastName: string,
    Address1:string,
    Address2:StringOrNull,
    Town:string,
    Country:string,
    PhoneNumber:string,
    Postcode:string,
    DateOfBirth:StringOrNull,
    PersonId:string
}

export interface IRecordState{
    IsActive:boolean;
}
export class RecordState implements IRecordState {
    public IsActive:boolean = false;
}

// 创建一个交叉类型
export type PersonRecord = RecordState & IPersonState

export interface IProps{
    DefaultState:IPersonState
}
export type StringOrNull = string | null

export interface IValidationProps{
    CurrentState:IPersonState;
    CanSave:(canSave:boolean)=>void;
}

/**
 * 流畅接口，允许将方法链接起来，从而能够更简单地阅读它们，
 * 操作被分组到一起，更容易理解实例上发生了声明，
 * 流畅接口中，并非所有方法都是流畅的，如果在接口中创建了非流畅方法，则调用链到该方法就结束了，当类需要设置一些属性，让后构建该类的一个具有这些属性的实例时，会使用这种方法
 */
export interface ITableBuilder{
    WithDatabase(databaseName: string):ITableBuilder;
    WithVersion(version:number):ITableBuilder;
    WithTableName(tableName:string):ITableBuilder;
    WithPrimaryField(primaryField:string):ITableBuilder;
    WithIndexName(indexName:string):ITableBuilder;
}

/**
 * 获取值并生成 IndexedDB 数据库
 */
export interface ITable{
    Database() :string;
    Version():number;
    TableName():string;
    IndexName():string;
    Build(database:IDBDatabase):void;
}

export  class TableBuilder implements ITableBuilder,ITable{
    private database:StringOrNull = '';
    private tableName:StringOrNull = '';
    private primaryField:StringOrNull= '';
    private indexName: StringOrNull='';
    private version:number = 1;
    public WithDatabase(databaseName:string):ITableBuilder{
        this.database = databaseName
        return this
    }

    public WithVersion(version:number):ITableBuilder{
        this.version = version
        return this
    }
    public WithTableName(tableName:string):ITableBuilder{
        this.tableName = tableName
        return this
    }
    public WithPrimaryField(primaryField:string):ITableBuilder{
        this.primaryField = primaryField
        return this
    }
    public WithIndexName(indexName:string):ITableBuilder{
        this.indexName = indexName
        return this
    }

    public Database():string{
        return this.database as string
    }

    public Version():number{
        return this.version
    }
    public TableName():string{
        return this.tableName as string
    }
    public IndexName():string{
        return this.indexName as string;
    }

    public Build(database:IDBDatabase):void{
        // IDBDatabase 是 IndexedDB 数据库链接，当我们开始编写核心数据库功能时会获取这个链接
        // 设置keyPath 为对象存储提供一个可搜索的字段，所以它将是一个字段的名称，
        // 当添加索引时，可以告诉对象存储那些字段应该是被搜索的
        const parameters:IDBObjectStoreParameters = {keyPath:this.primaryField}
        const objectStore = database.createObjectStore(this.tableName as string,parameters)
        objectStore!.createIndex(this.indexName as string,this.primaryField as string)
    }
}

// 添加个人信息表定义
export class PersonalDetailsTableBuilder{
    public Build():TableBuilder{
        const tableBuilder: TableBuilder = new TableBuilder()
        tableBuilder
            .WithDatabase('packt-advanced-typescript-ch3') // 库名
            .WithTableName('people') // 表名
            .WithPrimaryField('PersonId') // 主键
            .WithVersion(1)
        return tableBuilder   
    }
}

// 操作数据库类
export class Database<T extends RecordState> {
    private readonly indexDb:IDBFactory;
    private database:IDBDatabase | null = null
    private readonly table:ITable
    constructor(table:ITable) {
        this.indexDb = window.indexedDB;
        this.table = table;
        this.OpenDatabase()
    }
 private OpenDatabase():void{
     const open = this.indexDb.open(this.table.Database(),this.table.Version())
     open.onupgradeneeded = (e:any)=>{
         this.UpgradeDatabase(e.target.result)
     }
     open.onsuccess = (e:any)=>{
         this.database = e.target.result
     }
 }

 private UpgradeDatabase(database:IDBDatabase){
    this.database = database;
    this.table.Build(this.database)
 }
 private GetObjectStroe():IDBObjectStore|null{
     try{
         const transaction:IDBTransaction = this.database!.transaction(this.table.TableName(),'readwrite');
         const dbStore:IDBObjectStore = transaction.objectStore(this.table.TableName())
         return dbStore
     }catch(Error){
         return null
     }
 }

 public Create(state:T):void{
     const dbStore = this.GetObjectStroe()
     dbStore!.add(state)
 }

 public Read(): Promise<T[]>{
     return new Promise((response)=>{
         const dbStroe = this.GetObjectStroe()
         const items:T[] = new Array<T>();
         const request:IDBRequest = dbStroe!.openCursor()
         request.onsuccess = (e:any)=>{
             const cursor:IDBCursorWithValue = e.target.result
             if(cursor) {
                 const result:T = cursor.value
                 if(result.IsActive){
                     items.push(result)
                 }
                 cursor.continue()
             } else {
                 response(items)
             }
         }
     })
 }

 public Update(state:T):Promise<void>{
     return new Promise((resolve)=>{
         const dbStore = this.GetObjectStroe()
         const innerRequest:IDBRequest = dbStore!.put(state)
         innerRequest.onsuccess = ()=>{
             resolve()
         }
     })
 }

 public Delete(idx:number|string):Promise<void>{
     return new Promise((resolve)=>{
         const dbStore = this.GetObjectStroe()

         const deleteRequest:IDBRequest = dbStore!.delete(idx.toString())
         deleteRequest.onsuccess = ()=>{
             resolve()
         }
     })
 }
}