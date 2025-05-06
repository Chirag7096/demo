import {dbConnect} from '@/utils';
import {contectUs} from '@/models';
import {verifyCaptchaToken} from '@/utils/captch';
import {MutationSubmitContactFormArgs} from './types';
import {sendMail} from '@/utils/nodemailer';

export const resolvers = {
  Query: {hello: () => 'Hello from GraphQL!'},
  Mutation: {
    submitContactForm: async (
      _: unknown,
      {firstName, lastName, email, message, fileUrl, captchaToken}: MutationSubmitContactFormArgs,
    ) => {
      try {
        if (!firstName || !email || !message || !captchaToken)
          throw new Error('firstName, email, message and captchaToken are required');
        const {score} = await verifyCaptchaToken(captchaToken);
        if (score < 0.5) throw new Error('Captcha verification failed');
        await sendMail({
          mail: email,
          subject: 'Contact Us',
          html: `<h1>Contact Us</h1><p>Our Team will reach you. for ${message}</p>`,
        });
        await dbConnect();
        await contectUs.insertOne({firstName, lastName, email, message, fileUrl});
        return {message: 'Our Team will reach you.'};
      } catch (error) {
        console.error('submitContactForm error:', error);
        throw new Error((error as Error)?.message || 'Server error');
      }
    },
  },
};
