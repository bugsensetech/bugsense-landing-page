"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-p-900 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-extrabold text-white mb-4">
          Something went wrong
        </h2>
        <p className="text-sm text-white/50 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-p-600 text-white text-sm font-semibold hover:bg-p-400 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
