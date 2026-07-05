'use client';

import { useState } from 'react';

const inputClasses =
  'mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100';

const labelClasses = 'text-sm font-semibold text-neutral-800';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(
        'https://formsubmit.co/roger.twan@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error('Failed to submit contact form.');

      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-cyan-700">Message</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
          Send a direct note
        </h2>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          A short note with context is enough. I will reply by email.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name *
          </label>
          <input
            type="text"
            className={inputClasses}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            type="email"
            className={inputClasses}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClasses}>
          Subject *
        </label>
        <input
          type="text"
          className={inputClasses}
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="AI workflow, project build, collaboration..."
          required
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message *
        </label>
        <textarea
          className={`${inputClasses} min-h-40 resize-y`}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Share what you are building, what you want to discuss, or where I can help."
          required
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        {status === 'sent' && (
          <p className="text-sm font-medium text-cyan-700">
            Message sent. I will get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-medium text-red-600">
            Something went wrong. Email me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}
