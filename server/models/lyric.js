const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song' // must same id as 'song' model's id
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

// Due to definition of song's 'ref', 
//  must use the parameter of 'song' model's id
LyricSchema.statics.like = function(id) {
  
  // Invoke lyric's mongo Collection
  const Lyric = mongoose.model('lyric');

  return Lyric.findById(id)
    .then(lyric => {
      ++lyric.likes;
      return lyric.save();
    })

}

mongoose.model('lyric', LyricSchema);