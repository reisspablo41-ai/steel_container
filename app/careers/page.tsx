export default function CareersPage() {
  return (
    <div className="container-safe py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4">Join Our Team</h1>
        <p className="text-slate-600 text-lg">
          We are always looking for talented individuals to help us revolutionize the container industry.
          Build your career with a company that values innovation, durability, and growth.
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {/* Job Card 1 */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 hover:border-brand-orange transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Sales Representative</h3>
              <p className="text-slate-500 mt-1">Remote / Hybrid • Full-time</p>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">Sales</span>
          </div>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            We are looking for a motivated sales professional to manage inbound leads and close deals with industrial clients. Experience in logistics or construction preferred.
          </p>
          <button className="mt-4 text-brand-orange font-bold text-sm hover:underline">Apply Now &rarr;</button>
        </div>

        {/* Job Card 2 */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 hover:border-brand-orange transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Welder / Fabricator</h3>
              <p className="text-slate-500 mt-1">Port City, CA • On-site</p>
            </div>
             <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">Operations</span>
          </div>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            Join our modification team. Responsible for cutting, welding, and installing modifications on shipping containers. AWS certification required.
          </p>
          <button className="mt-4 text-brand-orange font-bold text-sm hover:underline">Apply Now &rarr;</button>
        </div>
      </div>

      <div className="text-center mt-12 bg-slate-50 p-8 rounded-lg">
        <h3 className="font-bold text-slate-900 mb-2">Don't see your role?</h3>
        <p className="text-slate-600 mb-4">We are growing fast. Send your resume to careers@containersales.com</p>
      </div>
    </div>
  );
}
