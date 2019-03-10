const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

// Basically, it uses model and its functions (or middlewares)
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      
      resolve(parentValue, { title }) {

        // mongo syntax
        return (new Song({ title })).save();
      }

    },

    addLyricToSong: {

      // Because Lyric is pushed in Song model.
      // Because lyrics are added with song id
      // One to many (a song and many lyrics)
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      }
    },
    
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
      }
    },

    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {

        // .remove : mongoos delete function
        return Song.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;