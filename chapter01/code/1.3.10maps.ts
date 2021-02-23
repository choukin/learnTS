enum Genre{
    Rock,
    CountryAndWestern,
    Classical,
    Pop,
    HeavyMetal
}
// 映射是一个范型类，接受两种类型： 为映射使用的键类型，以及在映射中存储的对象的类型

class MusicCollection{
    private readonly collection:Map<Genre, string[]>;
    constructor(){
        this.collection = new Map<Genre,string[]>();
    }

    /**
     * Add
     */
    public Add(genre:Genre,artlist:string[]):void {
        // 会覆盖AddArtist中添加的内容
        // this.collection.set(genre,artlist)
        for (const individual of artlist) {
            this.AddArtist(genre, individual)
        }
    }
    /**
     * get
     * genre
     *      */
    public get(genre:Genre):string[]|undefined {
       return this.collection.get(genre)
    }

    public AddArtist(genre:Genre,artist:string):void{
        if(!this.collection.has(genre)) {
            this.collection.set(genre,[])
        }

        let artists = this.collection.get(genre)
        if(artists) {
            artists.push(artist)
        }
    }
}

let collection = new MusicCollection();
collection.Add(Genre.Classical,[`Debussy`,`Bach`,`Elgar`,`Beethoven`])

collection.Add(Genre.CountryAndWestern,[`Dolly Parton`,`Toby Keith`,`Willie Nelson`])

collection.Add(Genre.HeavyMetal,[`Tygers of Pan Tang`,`Saxon`,'Doro'])

collection.Add(Genre.Rock,[`Deep Purple`,`Led Zeppelin`,`The Dixie Dregs`])