const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;
const dbWordpress = require('../../src/db-wordpress/database');
const axios = require('axios');

const PropertyType = new GraphQLObjectType({
  name: 'Property',
  fields: () => ({
    ID: { type: GraphQLString },
    post_title: { type: GraphQLString },
    post_content: { type: GraphQLString },
    post_name: { type: GraphQLString },
    guid: { type: GraphQLString },
    post_mime_type: { type: GraphQLString },
    post_parent: { type: GraphQLString },
    menu_order: { type: GraphQLInt },
    // ref_id: {
    //   type: PropertyType,
    //   async resolve(parentValue, args) {
    //     return dbWordpress.wp_postmeta.findAll({
    //       where: {
    //         ref_id: args.ref_id,
    //       },
    //     });
    //   },
    // },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    property: {
      type: PropertyType,
      args: { slug: { type: GraphQLString } },
      async resolve(parentValue, args) {
        // return dbWordpress.wp_posts.findByPk(args.ID);
        return axios
          .get(`localhost:8888/wp-json/wl/v1/properties/${args.slug}`)
          .then((res) => res.data);
      },
    },
    properties: {
      type: GraphQLList(PropertyType),
      async resolve() {
        return dbWordpress.wp_posts.findAll({
          where: {
            post_type: 'estate_property',
          },
        });
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProperty: {
      type: PropertyType,
      args: {
        post_title: { type: GraphQLString },
        post_content: { type: GraphQLString },
        post_name: { type: GraphQLString },
        guid: { type: GraphQLString },
        post_mime_type: { type: GraphQLString },
        post_parent: { type: GraphQLString },
        menu_order: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        return dbWordpress.wp_posts.create(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
