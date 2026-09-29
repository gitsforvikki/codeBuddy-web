import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const ContactPage = () => {
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    name: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "",
    email: user?.email || "",
    topic: "general",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);

    // Simulate async contact dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been received.");
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "",
      email: user?.email || "",
      topic: "general",
      message: "",
    });
    setSubmitted(false);
  };

  const channels = [
    {
      title: "Support & Helpdesk",
      email: "support@codebuddy.dev",
      description: "Assistance with your account, profile, or connection inquiries.",
      icon: "🛟",
      badge: "24h Response",
    },
    {
      title: "Partnerships & Ideas",
      email: "collaborate@codebuddy.dev",
      description: "Hackathons, campus events, and open-source integrations.",
      icon: "🤝",
      badge: "Projects",
    },
    {
      title: "Security & Privacy",
      email: "security@codebuddy.dev",
      description: "Report vulnerabilities or inquire about data practices.",
      icon: "🔒",
      badge: "Confidential",
    },
  ];

  const faqs = [
    {
      question: "Is CodeBuddy free to join?",
      answer:
        "Yes! Basic discovery, connections, and direct chat are completely free for all developers.",
    },
    {
      question: "How does matching work?",
      answer:
        "We prioritize developers based on complementary skills, location preferences, and active interests.",
    },
    {
      question: "Can I report inappropriate behavior?",
      answer:
        "Absolutely. You can ignore or reject requests anytime, or email security@codebuddy.dev with details.",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-(--connections-cream) px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#f7ded0]/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#dbe8f5]/80 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--connections-line) bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-(--connections-coral) shadow-xs">
            <span>💬</span> Get In Touch
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl md:text-5xl">
            Let’s start a conversation.
          </h1>
          <p className="mt-3 text-base leading-7 text-(--connections-muted) sm:text-lg">
            Have a question, feedback on our features, or an idea for a
            collaboration? We’re always eager to hear from our developer
            community.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left Column: Direct channels and info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black tracking-tight text-(--connections-ink)">
                Direct Channels
              </h2>
              <p className="mt-1 text-sm text-(--connections-muted)">
                Choose the channel that best suits your inquiry.
              </p>
            </div>

            <div className="space-y-4">
              {channels.map((channel) => (
                <div
                  key={channel.title}
                  className="rounded-3xl border border-(--connections-line) bg-white p-5 shadow-xs transition-colors hover:border-(--connections-coral)"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-(--connections-cream) text-2xl shadow-2xs">
                      {channel.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-(--connections-ink)">
                          {channel.title}
                        </h3>
                        <span className="rounded-full bg-[#f0f4f1] px-2.5 py-0.5 text-[10px] font-bold text-[#2c6e49]">
                          {channel.badge}
                        </span>
                      </div>
                      <a
                        href={`mailto:${channel.email}`}
                        className="mt-1 inline-block text-xs font-bold text-(--connections-coral) hover:underline"
                      >
                        {channel.email}
                      </a>
                      <p className="mt-1 text-xs leading-5 text-(--connections-muted)">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick FAQs */}
            <div className="rounded-3xl border border-(--connections-line) bg-[#f4f7f5] p-6 shadow-xs">
              <h3 className="text-sm font-black uppercase tracking-wider text-(--connections-ink)">
                Frequently Asked
              </h3>
              <div className="mt-4 space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-t border-[#e2e8e3] pt-3 first:border-0 first:pt-0">
                    <p className="text-xs font-bold text-(--connections-ink)">
                      {faq.question}
                    </p>
                    <p className="mt-1 text-xs text-(--connections-muted)">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-4xl border border-(--connections-line) bg-white p-6 shadow-[0_20px_50px_rgba(23,32,51,0.06)] sm:p-10">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#eaf5ed] text-3xl text-emerald-600 shadow-xs">
                  ✓
                </span>
                <h3 className="mt-5 text-2xl font-black text-(--connections-ink)">
                  Message Dispatched!
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-(--connections-muted)">
                  Thanks for reaching out, <strong>{formData.name}</strong>. A team
                  member will review your inquiry and get back to you at{" "}
                  <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn mt-6 h-11 rounded-xl border-0 bg-(--connections-coral) px-6 text-sm font-bold text-white hover:bg-[#9f3829]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-(--connections-ink)">
                    Send us a note
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-(--connections-muted)">
                    Fill out the form below and we'll reply directly via email.
                  </p>
                </div>

                {/* Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs font-bold text-(--connections-ink)">
                    Your Name <span className="text-(--connections-coral)">*</span>
                  </legend>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ada Lovelace"
                    className="input input-bordered h-12 w-full border-(--connections-line) bg-[#f8fafb] text-sm text-(--connections-ink) placeholder:text-slate-400 focus:border-(--connections-coral) focus:outline-none"
                  />
                </fieldset>

                {/* Email */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs font-bold text-(--connections-ink)">
                    Email Address <span className="text-(--connections-coral)">*</span>
                  </legend>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@domain.com"
                    className="input input-bordered h-12 w-full border-(--connections-line) bg-[#f8fafb] text-sm text-(--connections-ink) placeholder:text-slate-400 focus:border-(--connections-coral) focus:outline-none"
                  />
                </fieldset>

                {/* Topic / Category */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs font-bold text-(--connections-ink)">
                    Inquiry Topic
                  </legend>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="select select-bordered h-12 w-full border-(--connections-line) bg-[#f8fafb] text-sm text-(--connections-ink) focus:border-(--connections-coral) focus:outline-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="bug">Report a Bug / Issue</option>
                    <option value="feature">Feature Suggestion</option>
                    <option value="partnership">Partnership / Community Event</option>
                    <option value="account">Account & Privacy Question</option>
                  </select>
                </fieldset>

                {/* Message */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs font-bold text-(--connections-ink)">
                    Message <span className="text-(--connections-coral)">*</span>
                  </legend>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about what you have in mind, questions you have, or ideas to share..."
                    className="textarea textarea-bordered w-full border-(--connections-line) bg-[#f8fafb] text-sm text-(--connections-ink) placeholder:text-slate-400 focus:border-(--connections-coral) focus:outline-none"
                  />
                </fieldset>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn h-12 w-full rounded-xl border-0 bg-(--connections-coral) text-sm font-bold text-white shadow-[0_10px_20px_rgba(184,68,50,0.2)] hover:bg-[#9f3829] disabled:bg-slate-300"
                >
                  {submitting ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
