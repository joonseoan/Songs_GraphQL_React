const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require('./lyric_type');
const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({

  name:  'SongType',

  fields: () => ({

    id: { type: GraphQLID },

    title: { type: GraphQLString },

    lyrics: {

      type: new GraphQLList(LyricType),

      resolve(parentValue) {

        // console.log('parentValue: ', parentValue);

        // console.log('findLyrcis^^^^^^^^^^^^^^^^^^^^^^^^66: ', Song.findLyrics(parentValue.id));
        return Song.findLyrics(parentValue.id);

      }

    }

  })

});

module.exports = SongType;
