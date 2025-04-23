import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';
import {ApolloServer} from '@apollo/server';
import {startServerAndCreateNextHandler} from '@as-integrations/next';

const handler = startServerAndCreateNextHandler(new ApolloServer({typeDefs, resolvers}));

export {handler as GET, handler as POST};
