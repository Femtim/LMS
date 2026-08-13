import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockIcon,
  EyeIcon,
  ArrowRightIcon,
  GoogleIcon,
  FacebookIcon,
} from "../../utils/Icon";
import supabase from "../../utils/supabase";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function generateUUID() {
  return crypto.randomUUID();
}

  const handleSubmit = async () => {
    setLoading(true);
    
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Please fill in full name, email, and password.");
      return;
    }

    const { error } = await supabase.from("users").insert({
      id: generateUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      user_type: 'user'
    });

    if (error) {
      alert(error.message);
      return;
    }

    
    alert("Account created successfully!");
    setLoading(false);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-900">Create your account</h1>
            <p className="text-sm text-gray-500 mt-1">
              Join EduStream Pro and start your learning journey
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300 text-gray-800"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <EnvelopeIcon />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300 text-gray-800"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300 text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-600 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 accent-blue-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
                I agree to the <a href="#" className="text-blue-500 hover:underline">Terms</a> and{" "}
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              type="button"
              disabled={!agreed}
              className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
             {loading ? "Creating Account..." : " Create Account"}
              <ArrowRightIcon />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <GoogleIcon />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <FacebookIcon />
              Facebook
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-xs text-gray-500 mt-5">
            Already have an account? <a href="#" className="text-blue-500 font-medium hover:underline">Log in</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">© 2024 EduStream Pro. All rights reserved.</p>
        <nav className="flex items-center gap-5">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Help Center</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">About Us</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
