'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            A critical error occurred. We apologize for the inconvenience.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-black text-white rounded-xl text-sm hover:scale-105 transition font-medium"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
