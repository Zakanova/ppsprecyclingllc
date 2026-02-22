export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-4">
          We have received your request and will contact you within 2 hours.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Need immediate help? Call us directly:
        </p>
        <a 
          href="tel:916-381-8304"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Call 916-381-8304
        </a>
        <div className="mt-6">
          <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
