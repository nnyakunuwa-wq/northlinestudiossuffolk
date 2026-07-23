export function Privacy() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-brand-bg text-brand-dark flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none font-medium text-brand-dark/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>Information We Collect</h2>
          <p>We only collect information you provide directly to us through our contact forms or email.</p>
          <h2>How We Use Your Information</h2>
          <p>We use your information solely to communicate with you regarding your project enquiries.</p>
        </div>
      </div>
    </div>
  );
}
