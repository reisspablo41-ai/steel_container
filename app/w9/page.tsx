import { FileText, Download } from "lucide-react";

export default function W9Page() {
  return (
    <div className="container-safe py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="text-brand-orange" size={32} />
        </div>
        <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">Request Our W-9</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Need our W-9 for your accounting records? You can download the latest version of our W-9 form directly below. 
          If you need any other vendor setup forms, please contact our support team.
        </p>
        
        <button className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3.5 rounded font-bold hover:bg-orange-600 transition-colors shadow-md">
          <Download size={20} /> Download W-9 PDF
        </button>
        
        <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-2">Company Information</h3>
          <p className="text-sm text-slate-500">
            Steel Container Store, Inc.<br/>
            1251 Taney St<br/>
            North Kansas City, MO 64116<br/>
            EIN: 12-3456789
          </p>
        </div>
      </div>
    </div>
  );
}
