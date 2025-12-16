export default function AffiliatePage() {
    return (
        <div className="container-safe py-16 text-center max-w-3xl mx-auto">
             <h1 className="text-3xl font-heading font-bold text-slate-900 mb-6">Join Our Affiliate Program</h1>
             <p className="text-slate-600 mb-8">
                Partner with us and earn commissions by referring customers to the leading container provider. 
                Perfect for logistics consultants, construction managers, and industry influencers.
             </p>
             <div className="bg-slate-50 p-8 rounded-lg border-2 border-dashed border-slate-300">
                <p className="font-bold text-slate-700">Program Launching Soon</p>
                <p className="text-sm text-slate-500 mt-2">
                    We are currently finalizing our affiliate portal. Contact us to get early access.
                </p>
                <button className="mt-6 bg-slate-900 text-white px-6 py-2 rounded font-bold hover:bg-slate-800 transition-colors">
                    Join Waiting List
                </button>
             </div>
        </div>
    );
}
