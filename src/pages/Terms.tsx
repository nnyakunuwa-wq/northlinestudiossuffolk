export function Terms() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-brand-bg text-brand-dark flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Terms of Service</h1>
        <div className="prose prose-slate max-w-none font-medium text-brand-dark/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>Services</h2>
          <p>We provide custom web design and development services as outlined in our package agreements.</p>
          <h2>Payment Terms</h2>
          <p>We require a 50% upfront deposit to commence work, with the remaining 50% due upon final delivery.</p>
        </div>
      </div>
    </div>
  );
}
