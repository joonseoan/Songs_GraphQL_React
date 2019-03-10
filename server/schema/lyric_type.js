const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Lyric = mongoose.model('lyric');

const LyricType = new GraphQLObjectType({

  name:  'LyricType',
  
  fields: () => ({
  
    id: { type: GraphQLID },
  
    likes: { type: GraphQLInt },
  
    content: { type: GraphQLString },
  
    song: {
  
      type: require('./song_type'),
  
      resolve(parentValue) {
  
        return Lyric.findById(parentValue.id).populate('song')

        .then(lyric => {
          console.log('lyric =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', lyric)
          
          

           // lyric =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> { likes: 1,
            // _id: 5c6e38d9dcb74f41a891f443,
            // content: 'Love is changing on the fly.',
            // song:
            //  { lyrics: [ 5c6e38d9dcb74f41a891f443, 5c6e38f4dcb74f41a891f445 ],
            //    _id: 5c6e38bfdcb74f41a891f442,
            //    title: 'Love is nothing!',
            //    __v: 2 },
            // __v: 0 }


          
          return lyric.song

        });

      }

    }

  })

});

module.exports = LyricType;
