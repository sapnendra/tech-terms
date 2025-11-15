const Guidelines = () => {

  const rules = [
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Title Requirements",
      description:
        "Your title must be clear, descriptive, and unique. Use specific tech terms like 'React Hooks', 'API Gateway', or 'Microservices'. Duplicate titles are not allowed.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h10m-7 4h7M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Content Length",
      description:
        "Your content must be at least 200 characters long. Provide detailed explanations, examples, and context to help others understand the tech term thoroughly.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Technical Accuracy",
      description:
        "Ensure all information is accurate and up-to-date. Include relevant examples, use cases, and practical applications of the tech term.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Original Content",
      description:
        "Write original content in your own words. Avoid plagiarism and ensure your post adds value to the community. Cite sources when necessary.",
    },
  ];

  const howToSteps = [
    {
      number: "01",
      title: "Choose a Tech Term",
      description:
        "Select a technology term, concept, or topic that you want to explain. Make sure it's relevant to software development, programming, or technology in general.",
    },
    {
      number: "02",
      title: "Write a Clear Title",
      description:
        "Create a descriptive title that clearly identifies the tech term. Use proper capitalization and avoid generic terms. Examples: 'React Hooks', 'RESTful API', 'Docker Containers'.",
    },
    {
      number: "03",
      title: "Provide Detailed Content",
      description:
        "Write a comprehensive explanation (minimum 200 characters) that includes: what the term means, how it works, when to use it, code examples if applicable, and real-world use cases.",
    },
    {
      number: "04",
      title: "Review and Submit",
      description:
        "Review your post for accuracy, clarity, and completeness. Ensure it follows all guidelines, then submit. Your post will be visible to the community once created.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute border border-slate-600 rounded-3xl inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="hero-title inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-indigo-200">
                Posting Guidelines
              </p>
              <h1 className="hero-subtitle mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                How to Write
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Quality Posts
                </span>
              </h1>
              <p className="hero-description mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Follow these guidelines to create informative and valuable tech term
                posts that help the community learn and grow together.
              </p>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Purpose of Tech-Terms
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Understanding why we're here
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <div className="purpose-item rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
                    <svg
                      className="h-8 w-8 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Centralized Learning Hub
                  </h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  Tech-Terms is a comprehensive platform designed to provide all
                  technology terminology, interview questions, and learning resources
                  in one convenient place. Our goal is to help developers accelerate
                  their development journey and excel in technical interviews.
                </p>
              </div>

              <div className="purpose-item rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
                    <svg
                      className="h-8 w-8 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Community-Driven Knowledge
                  </h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  We believe in the power of community. By sharing your knowledge
                  through well-written posts, you're helping fellow developers learn,
                  grow, and succeed. Every post contributes to building a comprehensive
                  resource for the entire tech community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Post Requirements
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Essential rules for creating quality posts
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="rule-card group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/20"
                >
                  <div className="text-indigo-400 transition group-hover:scale-110">
                    {rule.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    {rule.title}
                  </h3>
                  <p className="mt-4 text-slate-300">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Write Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How to Write a Post
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Step-by-step guide to creating your post
              </p>
            </div>

            <div className="mt-16 space-y-8">
              {howToSteps.map((step, index) => (
                <div
                  key={index}
                  className="how-to-item rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 shadow-2xl"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40">
                      <span className="text-2xl font-bold text-indigo-300">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Character Limits Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-8 shadow-2xl sm:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Character Limits
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  Understanding the requirements for your posts
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20">
                      <svg
                        className="h-6 w-6 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h10m-7 4h7M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Title</h3>
                  </div>
                  <p className="mt-4 text-slate-300">
                    <span className="font-semibold text-indigo-400">No specific limit</span>
                    , but should be clear and descriptive. Aim for 5-10 words that
                    accurately describe the tech term. Duplicate titles are not allowed.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                      <svg
                        className="h-6 w-6 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Content</h3>
                  </div>
                  <p className="mt-4 text-slate-300">
                    <span className="font-semibold text-purple-400">Minimum 200 characters</span>
                    . Provide detailed explanations with examples, use cases, and
                    practical applications. The more comprehensive, the better!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Write Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-8 shadow-2xl sm:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  What Should You Write?
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  Guidelines for creating valuable content
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    ✓ Include in Your Post:
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-green-400">•</span>
                      <span>
                        <strong className="text-white">Clear Definition:</strong> Start with a
                        concise explanation of what the tech term means.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-green-400">•</span>
                      <span>
                        <strong className="text-white">How It Works:</strong> Explain the
                        underlying mechanism or concept behind the term.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-green-400">•</span>
                      <span>
                        <strong className="text-white">Use Cases:</strong> Describe when and
                        where this term is commonly used in real-world scenarios.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-green-400">•</span>
                      <span>
                        <strong className="text-white">Code Examples:</strong> If applicable,
                        include code snippets or examples to illustrate the concept.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-green-400">•</span>
                      <span>
                        <strong className="text-white">Best Practices:</strong> Share tips,
                        best practices, or common pitfalls related to the term.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-500/30 bg-red-900/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    ✗ Avoid in Your Post:
                  </h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-red-400">•</span>
                      <span>
                        <strong className="text-white">Plagiarism:</strong> Don't copy content
                        from other sources without proper attribution.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-red-400">•</span>
                      <span>
                        <strong className="text-white">Spam or Promotional Content:</strong>{" "}
                        Keep posts educational and avoid self-promotion.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-red-400">•</span>
                      <span>
                        <strong className="text-white">Inaccurate Information:</strong> Ensure
                        all facts are correct and up-to-date.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-red-400">•</span>
                      <span>
                        <strong className="text-white">Off-Topic Content:</strong> Stay focused
                        on technology-related terms and concepts.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="warning-content rounded-3xl border-2 border-red-500/50 bg-gradient-to-br from-red-900/20 to-orange-900/10 p-8 shadow-2xl sm:p-12">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500/50 bg-red-500/20">
                  <svg
                    className="h-10 w-10 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Important Notice
                </h2>
                <p className="mt-4 text-xl font-semibold text-red-300">
                  Posts Not Following Rules Will Be Deleted
                </p>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
                  We maintain high-quality standards to ensure Tech-Terms remains a
                  valuable resource for the community. Posts that violate our guidelines,
                  contain inaccurate information, are duplicates, or don't meet the minimum
                  requirements will be removed without notice. Please review all guidelines
                  carefully before submitting your post.
                </p>
                <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-900/20 p-6">
                  <p className="text-lg font-semibold text-white">
                    Remember: Quality over quantity. Take your time to create informative,
                    accurate, and helpful posts that benefit the entire community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Guidelines;