'use client';
import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useToast} from '@/components/Toast';
import {getCaptchaToken} from '@/utils/captch';
import {ApolloError, gql, useMutation} from '@apollo/client';

const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContactForm(
    $firstName: String!
    $lastName: String
    $email: String!
    $message: String!
    $fileUrl: String
    $captchaToken: String!
  ) {
    submitContactForm(
      firstName: $firstName
      lastName: $lastName
      email: $email
      message: $message
      fileUrl: $fileUrl
      captchaToken: $captchaToken
    ) {
      message
    }
  }
`;

export default function ContactForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm();

  const {showToast} = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submitForm] = useMutation(SUBMIT_CONTACT_FORM);

  const onSubmit = async (variables: Record<string, string>) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('location', 'uploads');
        const res = await fetch('/api/upload', {method: 'POST', body: formData});
        const data = await res.json();
        variables = {...variables, ...data};
      }
      const captchaToken = await getCaptchaToken();
      variables = {...variables, captchaToken};
      const {data} = await submitForm({variables});
      showToast({message: data.submitContactForm.message});
      setFile(null);
      reset();
    } catch (e: unknown) {
      const message =
        (e as ApolloError)?.graphQLErrors?.[0]?.message || (e as Error)?.message || 'Error while submitting the form';
      showToast({message});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register('firstName', {required: 'First name is required'})}
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
          />
          {errors?.firstName && <p className="mt-1 text-sm text-red-600">{errors?.firstName?.message as string}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            {...register('lastName', {required: 'Last name is required'})}
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
            pattern: {message: 'Invalid email address', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
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
            minLength: {value: 10, message: 'Minimum 10 characters'},
          })}
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
        />
        {errors?.message && <p className="mt-1 text-sm text-red-600">{errors?.message?.message as string}</p>}
      </div>

      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
          {file ? file.name : 'Attach File'}
        </button>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 sm:w-auto">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
