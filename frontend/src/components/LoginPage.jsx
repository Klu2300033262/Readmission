import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            return;
        }

        setLoading(true);

        // Simulate a brief auth delay for UX polish
        setTimeout(() => {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                onLogin();
            } else {
                setError('Invalid credentials. Please try again.');
                setLoading(false);
            }
        }, 700);
    };

    const inputBase = (name) =>
        `w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium bg-white/70 placeholder-slate-400 text-slate-700 transition-all duration-300 ${focused === name
            ? 'border-blue-500 shadow-[0_0_0_3px_rgba(37,99,235,0.15)]'
            : 'border-slate-200 hover:border-slate-300'
        }`;

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
        >
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
            <div className="absolute top-[40%] right-[20%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 40L40 0M0 0h1M40 40h-1' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")",
                }}
            />

            <motion.div
                className="relative z-10 w-full max-w-md mx-4"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <motion.div
                        className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
                    >
                        🏥
                    </motion.div>
                    <h1 className="text-white text-2xl font-extrabold tracking-tight">
                        AI Readmission Platform
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Admin Portal · Secure Access</p>
                </div>

                {/* Login Card */}
                <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8">
                    <h2 className="text-white text-xl font-bold mb-1">Welcome back</h2>
                    <p className="text-slate-400 text-sm mb-7">Sign in to access the dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                👤 Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                                onFocus={() => setFocused('username')}
                                onBlur={() => setFocused(null)}
                                placeholder="Enter username"
                                autoComplete="username"
                                className={inputBase('username')}
                                style={{ outline: 'none' }}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                🔒 Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Enter password"
                                    autoComplete="current-password"
                                    className={`${inputBase('password')} pr-12`}
                                    style={{ outline: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-lg"
                                    tabIndex={-1}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-medium"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <span>⚠️</span> {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02, boxShadow: '0 12px 40px rgba(37,99,235,0.5)' } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 mt-2"
                            style={{
                                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                boxShadow: '0 8px 30px rgba(37,99,235,0.4)',
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                '🔐 Sign In'
                            )}
                        </motion.button>
                    </form>
                </div>

                <p className="text-center text-slate-600 text-xs mt-6">
                    © 2024 AI Hospital Readmission Platform · HIPAA Compliant
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
