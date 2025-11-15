import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const featuresRef = useRef(null);
  const founderRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    const heroTitle = heroRef.current?.querySelector(".hero-title");
    const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
    const heroDescription = heroRef.current?.querySelector(".hero-description");

    if (heroTitle && heroSubtitle && heroDescription) {
      const heroTl = gsap.timeline();
      heroTl.from(heroTitle, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          heroSubtitle,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          heroDescription,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }

    // Mission section animation
    const missionItems = missionRef.current?.querySelectorAll(".mission-item");
    if (missionItems && missionItems.length > 0) {
      gsap.from(missionItems, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Features section animation
    const featureCards = featuresRef.current?.querySelectorAll(".feature-card");
    if (featureCards && featureCards.length > 0 && featuresRef.current) {
      // Set initial state
      gsap.set(featureCards, { opacity: 0, scale: 0.8 });
      
      let hasAnimated = false;
      const animateCards = () => {
        if (!hasAnimated) {
          hasAnimated = true;
          gsap.to(featureCards, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          });
        }
      };
      
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 75%",
        onEnter: animateCards,
        once: true,
      });

      // Check if already in view on mount
      const checkView = () => {
        if (featuresRef.current) {
          const rect = featuresRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
            animateCards();
          }
        }
      };
      
      // Check immediately and after a short delay to ensure DOM is ready
      setTimeout(checkView, 50);
    }

    // Founder section animation
    const founderContents = founderRef.current?.querySelectorAll(".founder-content");
    if (founderContents && founderContents.length > 0) {
      gsap.from(founderContents, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    const socialLinks = founderRef.current?.querySelectorAll(".social-link");
    if (socialLinks && socialLinks.length > 0) {
      gsap.from(socialLinks, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: (
        <svg
          className="h-12 w-12"
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
      title: "Comprehensive Tech Terms",
      description:
        "Access a vast collection of technology terminology covering all domains from programming to cloud computing.",
    },
    {
      icon: (
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Interview Questions",
      description:
        "Prepare for your technical interviews with curated questions and answers that help you excel in your career.",
    },
    {
      icon: (
        <svg
          className="h-12 w-12"
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
      ),
      title: "Learning Resources",
      description:
        "Explore detailed explanations and examples that make complex technical concepts easy to understand.",
    },
    {
      icon: (
        <svg
          className="h-12 w-12"
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
      ),
      title: "Community Driven",
      description:
        "Join a community of passionate learners and developers sharing knowledge and helping each other grow.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative overflow-hidden py-20 sm:py-32"
        >
          <div className="absolute border border-slate-600 rounded-3xl inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="hero-title inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-indigo-200">
                About Tech-Terms
              </p>
              <h1 className="hero-subtitle mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Empowering Developers,
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  One Term at a Time
                </span>
              </h1>
              <p className="hero-description mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Tech-Terms is your comprehensive platform for all technology
                terminology, interview questions, and learning resources. We
                bring together everything passionate learners need in one
                convenient place.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Bridging the gap between learning and success
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <div className="mission-item rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 shadow-2xl">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Centralized Learning Hub
                  </h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  Our main aim is to provide all tech-terms queries of every
                  passionate learner in one place. Whether you're preparing for
                  interviews or exploring new technologies, Tech-Terms is your
                  go-to resource.
                </p>
              </div>

              <div className="mission-item rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 shadow-2xl">
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Accelerate Development
                  </h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  We help fellow developers accelerate their development journey
                  and excel in interviews. Our curated content covers everything
                  from basic terminology to advanced interview questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What We Offer
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Everything you need to succeed in your tech journey
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/20"
                >
                  <div className="text-indigo-400 transition group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section ref={founderRef} className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-8 shadow-2xl sm:p-12">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="founder-content">
                  <div className="inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-indigo-200">
                    Founder & Creator
                  </div>
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Sapnendra Jaiswal
                  </h2>
                  <p className="mt-4 text-lg font-semibold text-indigo-400">
                    Graduated Engineer | Passionate Developer
                  </p>
                  <p className="mt-6 text-lg leading-relaxed text-slate-300">
                    Sapnendra Jaiswal is a graduated engineer with a deep
                    passion for development. His vision is to make fellow
                    developers accelerate into development and excel in their
                    interviews. Tech-Terms was born from this passion to create
                    a centralized platform where every tech enthusiast can find
                    the resources they need to grow and succeed.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-slate-300">
                    With a commitment to helping the developer community,
                    Sapnendra has built Tech-Terms as a comprehensive resource
                    for interview questions, tech terminology, and learning
                    materials—all in one convenient place.
                  </p>
                </div>

                <div className="founder-content flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-75 blur-2xl" />
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-indigo-500/50 bg-slate-800">
                      <svg
                        className="h-24 w-24 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <a
                      href="https://github.com/sapnendra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link group flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-600 bg-slate-800 text-white shadow-lg shadow-slate-900/50 transition-all hover:border-indigo-400 hover:bg-indigo-500/20 hover:scale-110 hover:shadow-indigo-500/30"
                      aria-label="GitHub Profile"
                    >
                      <svg
                        className="h-8 w-8 text-slate-200 transition-colors group-hover:text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/sapnendra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link group flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-600 bg-slate-800 text-white shadow-lg shadow-slate-900/50 transition-all hover:border-indigo-400 hover:bg-indigo-500/20 hover:scale-110 hover:shadow-indigo-500/30"
                      aria-label="LinkedIn Profile"
                    >
                      <svg
                        className="h-8 w-8 text-slate-200 transition-colors group-hover:text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
