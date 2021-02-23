"use strict";
var Genre;
(function (Genre) {
    Genre[Genre["Rock"] = 0] = "Rock";
    Genre[Genre["CountryAndWestern"] = 1] = "CountryAndWestern";
    Genre[Genre["Classical"] = 2] = "Classical";
    Genre[Genre["Pop"] = 3] = "Pop";
    Genre[Genre["HeavyMetal"] = 4] = "HeavyMetal";
})(Genre || (Genre = {}));
// 映射是一个范型类，接受两种类型： 为映射使用的键类型，以及在映射中存储的对象的类型
var MusicCollection = /** @class */ (function () {
    function MusicCollection() {
        this.collection = new Map();
    }
    /**
     * Add
     */
    MusicCollection.prototype.Add = function (genre, artlist) {
        // 会覆盖AddArtist中添加的内容
        // this.collection.set(genre,artlist)
        for (var _i = 0, artlist_1 = artlist; _i < artlist_1.length; _i++) {
            var individual = artlist_1[_i];
            this.AddArtist(genre, individual);
        }
    };
    /**
     * get
     * genre
     *      */
    MusicCollection.prototype.get = function (genre) {
        return this.collection.get(genre);
    };
    MusicCollection.prototype.AddArtist = function (genre, artist) {
        if (!this.collection.has(genre)) {
            this.collection.set(genre, []);
        }
        var artists = this.collection.get(genre);
        if (artists) {
            artists.push(artist);
        }
    };
    return MusicCollection;
}());
var collection = new MusicCollection();
collection.Add(Genre.Classical, ["Debussy", "Bach", "Elgar", "Beethoven"]);
collection.Add(Genre.CountryAndWestern, ["Dolly Parton", "Toby Keith", "Willie Nelson"]);
collection.Add(Genre.HeavyMetal, ["Tygers of Pan Tang", "Saxon", 'Doro']);
collection.Add(Genre.Rock, ["Deep Purple", "Led Zeppelin", "The Dixie Dregs"]);
//# sourceMappingURL=1.3.10maps.js.map