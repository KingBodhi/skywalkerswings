"use client";
import Section from "../../components/Section";
import { useState } from "react";

export default function Page(){
  const [sent,setSent]=useState(false); 
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:React.FormEvent<HTMLFormElement>){ 
    e.preventDefault(); 
    setErr(""); 
    setSent(false);
    setLoading(true);

    try{
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        company: formData.get("company") as string,
        message: formData.get("message") as string,
      };
      const res=await fetch("/api/contact",{ 
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if(!res.ok) throw new Error(await res.text());
      setSent(true);
      e.currentTarget.reset();
    }catch(e:any){ 
      setErr(e.message || "Something went wrong"); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              Get Your Volume Quote
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Tell us about your safety program needs. Our experts will provide a custom quote within 2 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="card p-8">
              <form onSubmit={submit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Full Name *</label>
                    <input 
                      name="name" 
                      className="input-field w-full" 
                      placeholder="Enter your full name" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Email Address *</label>
                    <input 
                      name="email" 
                      type="email"
                      className="input-field w-full" 
                      placeholder="your.email@company.com" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-600 mb-2">Company / Organization</label>
                  <input 
                    name="company" 
                    className="input-field w-full" 
                    placeholder="Your company name" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-600 mb-2">Project Details *</label>
                  <textarea 
                    name="message" 
                    className="input-field w-full" 
                    placeholder="Please include: number of workers, industry type, timeline, specific requirements..." 
                    rows={6} 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-medium hover:scale-105 disabled:hover:scale-100"
                >
                  {loading ? "Sending..." : "Get My Custom Quote"}
                </button>

                {sent && (
                  <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="font-semibold text-success-800">Quote request sent!</div>
                        <div className="text-sm text-success-700">We'll respond within 2 hours with your custom pricing.</div>
                      </div>
                    </div>
                  </div>
                )}

                {err && (
                  <div className="bg-danger-50 border border-danger-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-danger-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div className="text-danger-800">{err}</div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Benefits */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="card p-6">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">Prefer to Talk?</h3>
                <div className="space-y-4">
                  <a href="tel:+1-800-SKYWALKER" className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-primary-600">1-800-SKYWALKER</div>
                      <div className="text-sm text-neutral-600">Mon-Fri 7AM-6PM EST</div>
                    </div>
                  </a>

                  <a href="mailto:sales@skywalker.com" className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-primary-600">sales@skywalker.com</div>
                      <div className="text-sm text-neutral-600">24/7 email support</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Volume Pricing Benefits */}
              <div className="card p-6">
                <h3 className="font-display text-xl font-bold text-primary-600 mb-4">Volume Pricing Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">Up to 30% off retail pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">Free shipping on orders over $2,500</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">Dedicated safety consultant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">Custom training programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">Priority technical support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}