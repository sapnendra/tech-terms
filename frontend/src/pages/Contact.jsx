import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const quoteRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Quote animation
    if (quoteRef.current) {
      gsap.from(quoteRef.current.querySelectorAll(".quote-text"), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Form animation
    if (formRef.current) {
      const formItems = formRef.current.querySelectorAll(".form-item");
      if (formItems && formItems.length > 0) {
        // Set initial state
        gsap.set(formItems, { opacity: 0 });
        
        // Check if already in view
        const checkView = () => {
          if (formRef.current) {
            const rect = formRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
              // Already in view, animate immediately
              gsap.to(formItems, {
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
              });
            }
          }
        };
        
        // ScrollTrigger animation
        ScrollTrigger.create({
          trigger: formRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(formItems, {
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
            });
          },
          once: true,
        });
        
        // Check immediately
        setTimeout(checkView, 100);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiInstance.post("/contact/send", formData);
      if (response.data.success) {
        toast.success(
          response.data.message || "Thank you for contacting us! We'll get back to you soon."
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950">
        {/* Quote Section */}
        <section
          ref={quoteRef}
          className="relative border border-slate-600 rounded-3xl overflow-hidden py-20 sm:py-32"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="quote-text inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-indigo-200">
                Get in Touch
              </p>
              <blockquote className="quote-text mt-8">
                <p className="text-3xl font-bold italic text-white sm:text-4xl lg:text-3xl">
                  "The best way to find out if you can trust somebody is to trust
                  them."
                </p>
                <footer className="quote-text mt-6 text-xl text-slate-300">
                  — Ernest Hemingway
                </footer>
              </blockquote>
              <p className="quote-text mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Have a question, suggestion, or just want to connect? We'd love
                to hear from you. Reach out and let's build something amazing
                together.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div
              ref={formRef}
              className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-8 shadow-2xl sm:p-12"
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Send us a Message
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form
                autoComplete="off"
                className="flex flex-col gap-6"
                onSubmit={handleFormSubmit}
              >
                <div className="form-item space-y-2">
                  <label
                    htmlFor="name"
                    className="text-lg font-semibold text-slate-200"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-item space-y-2">
                  <label
                    htmlFor="email"
                    className="text-lg font-semibold text-slate-200"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-item space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-lg font-semibold text-slate-200"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-item space-y-2">
                  <label
                    htmlFor="message"
                    className="text-lg font-semibold text-slate-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    name="message"
                    rows="6"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-indigo-500 px-6 py-4 text-xl font-semibold text-white cursor-pointer transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
