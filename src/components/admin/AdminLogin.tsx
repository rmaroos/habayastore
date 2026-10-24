import React, { useState } from 'react';
import {
  LockIcon,
  MailIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { signInAdmin } from '../../lib/supabase';

interface AdminLoginProps {
  onSuccess: (user?: any) => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signInAdmin(cleanEmail, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Invalid email or password. Please check your credentials or contact the administrator.');
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMsg('This account email has not been confirmed yet in Supabase.');
        } else {
          setErrorMsg(error.message);
        }
        return;
      }

      if (data?.user) {
        sessionStorage.setItem('habaya_admin_auth', 'true');
        sessionStorage.setItem('habaya_admin_user', JSON.stringify({ email: data.user.email, id: data.user.id }));
        onSuccess(data.user);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Unable to connect to authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-burgundy mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Return to Habaya Store</span>
        </Link>
        <span className="eyebrow block tracking-[0.25em] text-burgundy">Staff Portal</span>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Habaya Atelier Admin
        </h1>
        <p className="mt-2 text-xs text-ink-soft">
          Authorized personnel only. Sign in with your assigned staff credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg border border-rule bg-warm p-8 shadow-xl">
          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded bg-rose-50 border border-rose-200 p-3 text-xs text-danger">
              <AlertCircleIcon className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="field-label text-xs">Staff Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  autoFocus
                  required
                  placeholder="admin@habaya.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="field-input h-11 text-sm pl-10"
                />
                <MailIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-taupe" />
              </div>
            </div>

            <div>
              <label className="field-label text-xs">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="field-input h-11 text-sm pl-10 pr-10"
                />
                <LockIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-taupe" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-taupe hover:text-ink transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-11 text-xs uppercase tracking-wider font-bold mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <LockIcon className="h-3.5 w-3.5" />
                  <span>Sign In to Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 border-t border-rule pt-4 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-ink-soft">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-brass shrink-0" />
              <span>Protected portal. Staff accounts are provisioned via Supabase console.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
