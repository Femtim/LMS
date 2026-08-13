import { useState } from "react"; 
import { BookOpenIcon, EnvelopeIcon, LockIcon, GoogleIcon, CheckBadgeIcon } from "../../utils/Icon";
import supabase from '../../utils/supabase'; 

export default function LoginPage() { 
  const [showPassword] = useState(false); 
  const [form, setForm] = useState({ email: "", password: "" }); 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })); 
  }; 

  
 
  return ( 
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans 
relative"> 
 
      {/* Card */} 
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden flex"> 
 
        {/* Left panel */} 
        <div 
          className="w-80 flex-shrink-0 p-8 flex flex-col justify-between relative overflow-hidden" 
          style={{ 
            background: "linear-gradient(160deg, #c7d7fd 0%, #a5b4fc 20%, #818cf8 50%, #6366f1 75%, #4f46e5 100%)", 
          }} 
        > 
          {/* Decorative blobs */} 
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white 
opacity-10" /> 
          <div className="absolute top-1/2 -right-8 w-24 h-24 rounded-full bg-white opacity-10" /> 
 
          {/* Logo */} 
          <div className="flex items-center gap-2 relative z-10"> 
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center 
justify-center"> 
              <BookOpenIcon /> 
            </div> 
            <span className="text-white font-semibold text-sm">EduStream Pro</span> 
          </div> 
 
          {/* Tagline */} 
          <div className="relative z-10"> 
            <h2 className="text-white font-bold text-2xl leading-tight mb-3"> 
              Master new skills with expert-led courses. 
            </h2> 
            <p className="text-blue-100 text-sm leading-relaxed"> 
              Join over 2 million learners and start your journey towards professional excellence 
today. 
            </p> 
          </div> 
 
          {/* Trusted badge */} 
          <div className="flex items-center gap-2 relative z-10"> 
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center 
justify-center"> 
              <CheckBadgeIcon /> 
            </div> 
            <span className="text-blue-100 text-xs">Trusted by world's best students</span> 
          </div> 
        </div> 
 
        {/* Right panel */} 
        <div className="flex-1 p-8 flex flex-col justify-center"> 
          {/* Heading */} 
          <div className="mb-6"> 
            <h1 className="text-2xl font-bold text-gray-900">Professional Login</h1> 
            <p className="text-sm text-gray-500 mt-1">Welcome back! Please enter your 
details.</p> 
          </div> 
 
          {/* Form */} 
          <div className="space-y-4"> 
            {/* Email */} 
            <div> 
              <label className="block text-sm font-medium text-gray-700 mb-1">Email 
Address</label> 
              <div className="relative"> 
                <span className="absolute left-3 top-1/2 -translate-y-1/2"> 
                  <EnvelopeIcon /> 
                </span> 
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="name@company.com" 
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
placeholder-gray-300 text-gray-800" 
                /> 
              </div> 
            </div> 
 
            {/* Password */} 
            <div> 
              <div className="flex items-center justify-between mb-1"> 
                <label className="text-sm font-medium text-gray-700">Password</label> 
                <a href="#" className="text-xs text-blue-500 hover:underline">Forgot 
Password?</a> 
              </div> 
              <div className="relative"> 
                <span className="absolute left-3 top-1/2 -translate-y-1/2"> 
                  <LockIcon /> 
                </span> 
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
placeholder-gray-400 text-gray-800" 
                /> 
              </div> 
            </div> 
 
            {/* Sign In */} 
            <button 
              type="button" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold 
py-2.5 rounded-lg transition-colors" 
            > 
              Sign In 
            </button> 
 
            {/* Divider */} 
            <div className="flex items-center gap-3"> 
              <div className="flex-1 h-px bg-gray-200" /> 
              <span className="text-xs text-gray-400">Or continue with</span> 
              <div className="flex-1 h-px bg-gray-200" /> 
            </div> 
 
            {/* Google */} 
            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-2 border border-gray-300 
rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors" 
            > 
              <GoogleIcon /> 
              Sign in with Google 
            </button> 
          </div> 
 
          {/* Footer links */} 
          <div className="flex items-center justify-center gap-4 mt-6"> 
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 
transition-colors">Terms of Service</a> 
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 
transition-colors">Privacy Policy</a> 
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 
transition-colors">Help Center</a> 
          </div> 
</div> 
</div> 
</div> 
); 
}