
import { Link } from "react-router-dom";

function Dashboard() {
  const features = [
    {
      title: "AI Scheme Assistant",
      description: "Ask questions and understand government schemes in simple language.",
      icon: "💬",
      link: "/chat",
      button: "Start Chat"
    },
    {
      title: "Eligibility Checker",
      description: "Enter your details to prepare for a scheme eligibility assessment.",
      icon: "✓",
      link: "/eligibility",
      button: "Check Eligibility"
    },
    {
      title: "Document Upload",
      description: "Add government scheme PDFs and official website links.",
      icon: "📄",
      link: "/upload",
      button: "Upload Documents"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Welcome Section */}
      <section className="bg-blue-900 px-6 py-12 text-white md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-blue-200">
            Welcome to SchemeSathi
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Government Schemes,
            <br />
            Made Simple.
          </h1>

          <p className="mt-4 max-w-xl text-blue-100">
            Discover government schemes, understand eligibility,
            and get guidance through an AI-powered assistant.
          </p>

          <Link
            to="/chat"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 hover:bg-blue-50"
          >
            Ask AI Assistant →
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-12">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Explore SchemeSathi
          </h2>

          <p className="mt-2 text-slate-500">
            Choose a service to get started.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                {feature.title}
              </h3>

              <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>

              <Link
                to={feature.link}
                className="mt-5 inline-block rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {feature.button} →
              </Link>
            </div>
          ))}

        </div>

        {/* How it works */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-7">
          <h2 className="text-xl font-bold text-slate-800">
            How SchemeSathi Works
          </h2>

          <div className="mt-7 grid gap-7 sm:grid-cols-3">

            <div>
              <span className="text-3xl">📤</span>
              <h3 className="mt-3 font-semibold text-slate-800">
                1. Upload Documents
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Add government scheme documents or official URLs.
              </p>
            </div>

            <div>
              <span className="text-3xl">🤖</span>
              <h3 className="mt-3 font-semibold text-slate-800">
                2. Ask Questions
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Get answers based on scheme information.
              </p>
            </div>

            <div>
              <span className="text-3xl">🎯</span>
              <h3 className="mt-3 font-semibold text-slate-800">
                3. Check Eligibility
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Prepare your details for eligibility assessment.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-5 text-center text-sm text-slate-500">
        © 2026 SchemeSathi | Making Government Schemes Accessible
      </footer>

    </div>
  );
}

export default Dashboard;
