import { ApolloClient, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj3aab8m2f6qz0182y9lliztm',
  }),
});
export default client;
