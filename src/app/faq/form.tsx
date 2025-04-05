'use client';
import { post } from '@/utils';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/Toast';

export default function ContactForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { showToast } = useToast();

  const onSubmit = async (val: any) => {
    try {
      const { data } = await post('contact', val);
      showToast({ message: data.message });
      reset();
    } catch (e) {
      console.log('🚀 ~ post ~ e:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register('firstName', { required: 'First name is required' })}
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          />
          {errors?.firstName && <p className="mt-1 text-sm text-red-600">{errors?.firstName?.message as string}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          />
          {errors?.lastName && <p className="mt-1 text-sm text-red-600">{errors?.lastName?.message as string}</p>}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: { message: 'Invalid email address', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
          })}
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
        />
        {errors?.email && <p className="mt-1 text-sm text-red-600">{errors?.email?.message as string}</p>}
      </div>

      <div>
        <textarea
          placeholder="Your message"
          rows={5}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Minimum 10 characters' },
          })}
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
        />
        {errors?.message && <p className="mt-1 text-sm text-red-600">{errors?.message?.message as string}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 sm:w-auto"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
