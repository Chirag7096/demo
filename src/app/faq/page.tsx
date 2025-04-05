import { Metadata } from 'next';
import { Accordion } from '@/components/accordion';
import ContactForm from './form';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'You can return any item within 30 days of purchase for a full refund.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping usually takes 3-5 business days.',
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes, we offer 24/7 customer support via email and chat.',
  },
  {
    question: 'What is your return policy?',
    answer: 'You can return any item within 30 days of purchase for a full refund.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping usually takes 3-5 business days.',
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes, we offer 24/7 customer support via email and chat.',
  },
];

export const metadata: Metadata = {
  title: 'Contact Us & FAQs',
  description: 'Need help? View our frequently asked questions or contact us directly.',
  openGraph: {
    title: 'Contact Us & FAQs',
    type: 'website',
    description: 'Need help? View our frequently asked questions or contact us directly.',
  },
};

export default function ContactFAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="mb-12 text-center text-3xl font-bold text-gray-800 sm:text-4xl">FAQs & Contact Us</h1>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion key={index} title={faq.question} desc={faq.answer} />
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">Contact Us</h2>
        <p className="mb-10 text-center text-gray-600">
          Reach out to us by filling out the form below or email{' '}
          <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">
            support@yourcompany.com
          </a>
          .
        </p>

        <ContactForm />
      </section>
    </main>
  );
}
