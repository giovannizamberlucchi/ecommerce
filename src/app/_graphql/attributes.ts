export const ATTRIBUTES = `#graphql
  query ATTRIBUTES( $filterAttributesByAttribute: [String]) {
    Attributes(where: { attribute: { in: $filterAttributesByAttribute } }, limit: 10000) {
      docs {
        id
        attribute
      }
    }
  }
`;
