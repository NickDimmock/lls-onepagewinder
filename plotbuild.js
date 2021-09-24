class PlotBuilder {
    constructor() {
        this.RE = /<.*?>/g;
        this.articleRE = /\[A\]../g;
        this.used = [];
        this.limit = 10;
    }
    build (text) {
        let count, i, len, match, ref, replacement, untaggedMatch;
        if (text.match(this.RE)) {
            ref = text.match(this.RE);
            for (i = 0, len = ref.length; i < len; i++) {
                match = ref[i];
                untaggedMatch = match.substr(1, match.length - 2);
                count = 0;
                while (true) {
                    count += 1;
                    replacement = storyData[untaggedMatch][Math.floor(Math.random() * storyData[untaggedMatch].length)];
                    if (replacement.match(PlotBuilder.RE)) {
                      break;
                    }
                    if (count === this.limit) {
                      break;
                    }
                    if (indexOf.call(this.used, replacement) < 0) {
                      this.used.push(replacement);
                      break;
                    }
                }
                text = text.replace(match, this.build(replacement));
            }
            return(text);
        }
        else {
            return(text);
        }
    }
    setArticles(text) {
        // Take the processed text and swap ?a / ?A for a / an depending on the
        // first letter of the next word.
        // A little kludgy in that we run it twice to catch lower and upper case
        // articles, but it works until we have a better solution.
        let start;
        while(text.indexOf("?A") > -1) {
            start = text.indexOf("?A");
            if (text[text.indexOf("?A") + 3].toLowerCase().match(/[aeiou]/)) {
                text = text.substr(0,start)+"An"+text.substr(start+2);
            }
            else {
                text = text.substr(0,start)+"A"+text.substr(start+2);
            }
        }
        while(text.indexOf("?a") > -1) {
            start = text.indexOf("?a");
            if (text[text.indexOf("?a") + 3].toLowerCase().match(/[aeiou]/)) {
                text = text.substr(0,start)+"an"+text.substr(start+2);
            }
            else {
                text = text.substr(0,start)+"a"+text.substr(start+2);
            }
        }
        return(text);
    }
}

/*
console.log(storyData);
let seedNo = Math.floor(Math.random()*storyData["beginning"].length);
let seed = storyData["beginning"][seedNo];
let pb = new PlotBuilder();
let story = pb.build(seed);
story = pb.setArticles(story);
console.log(story);
*/