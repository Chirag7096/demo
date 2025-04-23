import {Schema} from 'mongoose';
import {createModal} from '@/utils';

const contectUsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

contectUsSchema.set('timestamps', true);

export const contectUs = createModal('contectUs', contectUsSchema);
