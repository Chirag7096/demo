import {dbConnect} from '@/utils';
import {contectUs} from '@/models';
import {MutationSubmitContactFormArgs} from './types';

export const resolvers = {
  Query: {hello: () => 'Hello from GraphQL!'},
  Mutation: {
    submitContactForm: async (
      _: unknown,
      {firstName, lastName, email, message, fileUrl}: MutationSubmitContactFormArgs,
    ) => {
      if (!firstName || !email || !message) throw new Error('firstName, email, and message are required');
      try {
        await dbConnect();
        await contectUs.insertOne({firstName, lastName, email, message, fileUrl});
        return {message: 'Our Team will reach you.'};
      } catch (error) {
        console.error('submitContactForm error:', error);
        throw new Error('Server error');
      }
    },
  },
};
