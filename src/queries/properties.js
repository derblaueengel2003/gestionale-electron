import gql from 'graphql-tag';

export const allPropertiesQuery = gql`
  {
    properties {
      nodes {
        ref_id
        property_address
        property_zip
        property_price
        title
        content
      }
    }
  }
`;

export const singlePropertyQuery = gql`
  {
    property {
      ref_id
      property_address
      property_zip
      property_price
    }
  }
`;

export const addPropertyMutation = gql`
  mutation CREATE_PROPERTY($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      property {
        id
        title
        date
        slug
      }
    }
  }
`;
