export default function Spinner() {
  return (
    // FIX: role="status" and aria-label for screen readers
    <div
      role="status"
      aria-label="Loading..."
      className="flex items-center justify-center w-full py-12"
    >
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      {/* FIX: visually hidden text for screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );
}