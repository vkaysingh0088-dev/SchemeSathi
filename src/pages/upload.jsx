
import { useState } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [schemeUrl, setSchemeUrl] = useState("");
  const [documents, setDocuments] = useState([]);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  function handleFileUpload() {
    if (!selectedFile) {
      alert("Please select a PDF first.");
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: selectedFile.name,
      type: "PDF",
    };

    setDocuments((previous) => [...previous, newDocument]);
    setSelectedFile(null);
  }

  function handleUrlSubmit(event) {
    event.preventDefault();

    if (!schemeUrl.trim()) return;

    const newDocument = {
      id: Date.now(),
      name: schemeUrl,
      type: "URL",
    };

    setDocuments((previous) => [...previous, newDocument]);
    setSchemeUrl("");
  }

  function handleDelete(id) {
    setDocuments((previous) =>
      previous.filter((document) => document.id !== id)
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            Upload Scheme Documents
          </h1>

          <p className="mt-2 text-slate-600">
            Upload government scheme PDFs or provide official
            website links to get AI-powered assistance.
          </p>
        </div>

        {/* PDF Upload */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Upload PDF Document
          </h2>

          <div className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center">
            <div className="mb-3 text-4xl">📄</div>

            <p className="font-medium text-slate-700">
              Select a government scheme PDF
            </p>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="mt-4 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-800"
            />

            {selectedFile && (
              <p className="mt-3 text-sm text-green-700">
                Selected: {selectedFile.name}
              </p>
            )}

            <button
              onClick={handleFileUpload}
              className="mt-5 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Add PDF
            </button>
          </div>
        </div>

        {/* URL Upload */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Add Government Website URL
          </h2>

          <form onSubmit={handleUrlSubmit}>
            <input
              type="url"
              value={schemeUrl}
              onChange={(event) => setSchemeUrl(event.target.value)}
              placeholder="https://example.gov.in/scheme"
              required
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Add Website
            </button>
          </form>
        </div>

        {/* Document List */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Added Documents ({documents.length})
          </h2>

          {documents.length === 0 ? (
            <p className="text-slate-500">
              No documents added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800">
                      {document.name}
                    </p>

                    <span className="text-sm text-slate-500">
                      {document.type}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(document.id)}
                    className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          Demo mode: documents are currently stored only in frontend state.
          Backend processing will be connected later.
        </p>

      </div>
    </div>
  );
}

export default Upload;
