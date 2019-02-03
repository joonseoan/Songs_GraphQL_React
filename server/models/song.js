const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  user: { // ???
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

SongSchema.statics.addLyric = function(id, content) {

  // Invoke current lyric's mongo collection!!!
  const Lyric = mongoose.model('lyric');

  console.log('Lyric: ', Lyric);

  return this.findById(id)
    .then(song => {

      console.log('song at addLyric: ', song);

      const lyric = new Lyric({ content, song });

      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });

}


// https://mongoosejs.com/docs/populate.html
// https://www.zerocho.com/category/MongoDB/post/59a66f8372262500184b5363 (better)
// I must find again to fully figure out populate
SongSchema.statics.findLyrics = function(id) {

  this.findById(id).populate('lyrics').exec((err, data) => {

    if(err) return;
    
    console.log('data value of populate: !!!!!!!!!!!!!!!!', data);

    /* 
        { lyrics:
            [ { likes: 2,
                _id: 5c50a69715aba84a24c523b9,
                content: 'Hello, Canada',
                song: 5c2cf74233b0c43054d7fb41,
                __v: 0 },
              { likes: 5,
                _id: 5c50a6d415aba84a24c523bb,
                content: 'Hello, Canada',
                song: 5c2cf74233b0c43054d7fb41,
                __v: 0 },
              { likes: 1,
                _id: 5c5342a8f97a7539ec39b6ea,
                content: 'How come today?',
                song: 5c2cf74233b0c43054d7fb41,
              __v: 0 } ],
              _id: 5c2cf74233b0c43054d7fb41,
              title: 'Rapsody',
        __v: 3 }
          
    */
  });

  this.findById(id).then(song => {

    console.log('song: ', song);

    console.log('song.lyrics: @@@@@@@@@@@@@@@@@@@@@@@@@@@: ', song.lyrics)

    /* 
      song.lyrics: @@@@@@@@@@@@@@@@@@@@@@@@@@@:  ["5c50a69715aba84a24c523b9","5c50a6d415aba84a24c523bb","5c5342a8f97a7539ec39b6ea"]


      Because of the one below
      lyrics: [{
        type: Schema.Types.ObjectId,
      ref: 'lyric'
  }]
    */

  })
    
   // console.log('data value of populate: !!!!!!!!!!!!!!!!', data);

  return this.findById(id)

    // Pull out all documents from MongoDB about 'lyric'
    .populate('lyrics')

    // 'song' is the one foun from id input into Song Schema 
    // Just pull out the populated lyrics!!!
    .then(song => song.lyrics);

}

mongoose.model('song', SongSchema);