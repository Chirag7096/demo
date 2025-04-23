import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';
import {NextRequest} from 'next/server';
import {ApolloServer} from '@apollo/server';
import {startServerAndCreateNextHandler} from '@as-integrations/next';

const server = new ApolloServer({typeDefs, resolvers});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (request: NextRequest) => ({req: request}),
});

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
