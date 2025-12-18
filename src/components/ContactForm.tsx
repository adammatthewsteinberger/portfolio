'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mdkzqgly");

  if (state.succeeded) {
    return (
      <div className="bg-[var(--color-accent-green)]/20 border border-[var(--color-accent-green)] text-[var(--color-accent-green-light)] rounded-lg p-6 text-center" role="alert">
        <h4 className="text-xl font-bold mb-2">Thank you!</h4>
        <p>Your message has been sent successfully. I&apos;ll get back to you soon!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--color-dark-card)] rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[var(--color-accent-blue)] text-white px-6 py-4">
            <h3 className="text-xl font-semibold">Contact Me</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} noValidate style={{ position: 'relative', zIndex: 10 }}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-[var(--color-text-primary)] font-semibold mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-1 focus:ring-[var(--color-accent-blue)] transition-colors"
                  required
                  autoComplete="name"
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    userSelect: 'text'
                  }}
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-[var(--color-accent-coral)] text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-[var(--color-text-primary)] font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-1 focus:ring-[var(--color-accent-blue)] transition-colors"
                  required
                  autoComplete="email"
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    userSelect: 'text'
                  }}
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-[var(--color-accent-coral)] text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-[var(--color-text-primary)] font-semibold mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  className="w-full px-4 py-3 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-1 focus:ring-[var(--color-accent-blue)] transition-colors"
                  required
                  autoComplete="off"
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    userSelect: 'text'
                  }}
                />
                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                  className="text-[var(--color-accent-coral)] text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-[var(--color-text-primary)] font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-3 bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-1 focus:ring-[var(--color-accent-blue)] transition-colors resize-y"
                  rows={5}
                  required
                  placeholder="Please describe your project or inquiry..."
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    userSelect: 'text'
                  }}
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-[var(--color-accent-coral)] text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {state.submitting ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {state.errors && Object.keys(state.errors).length > 0 && (
                <div className="mt-4 p-4 bg-[var(--color-accent-coral)]/20 border border-[var(--color-accent-coral)] text-[var(--color-accent-coral)] rounded-lg" role="alert">
                  <strong>Error:</strong> Please check the form and try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
