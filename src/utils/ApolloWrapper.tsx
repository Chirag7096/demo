'use client';
import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri: '/api/graphql'}),
});

export default function ApolloWrapper({children}: {children: React.ReactNode}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
