
import { useState } from "react";

function Eligibility() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    annualIncome: "",
    state: "",
    occupation: "",
    category: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            Eligibility Checker
          </h1>

          <p className="mt-2 text-slate-600">
            Enter your details to check which government schemes
            may be suitable for you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-md"
        >
          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="1"
                max="120"
                required
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Annual Family Income (₹)
              </label>

              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                placeholder="e.g. 200000"
                min="0"
                required
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              State
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"
            >
              <option value="">Select your state</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Bihar">Bihar</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Odisha">Odisha</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Occupation
              </label>

              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"
              >
                <option value="">Select occupation</option>
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Salaried">Salaried</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Check Eligibility
          </button>
        </form>

        {/* Result */}
        {submitted && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-blue-900">
              Details submitted successfully!
            </h2>

            <p className="mt-2 text-slate-700">
              Your details are ready for assessment by the
              SchemeSathi eligibility agent.
            </p>

            <div className="mt-4 space-y-1 text-sm text-slate-700">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Annual income:</strong> ₹{formData.annualIncome}</p>
              <p><strong>State:</strong> {formData.state}</p>
              <p><strong>Occupation:</strong> {formData.occupation}</p>
              <p><strong>Category:</strong> {formData.category}</p>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Demo only: this page does not determine actual eligibility.
              The backend eligibility agent will evaluate your details
              against the rules of each scheme.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Eligibility;
