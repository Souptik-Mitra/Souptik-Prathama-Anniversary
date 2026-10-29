import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Heart, BookHeart, AlertCircle, Loader2 } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { username: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || 'Invalid username or password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Success: notify parent
      onLoginSuccess(data.user || { username: username.trim() });
    } catch {
      setErrorMessage('Unable to connect to server. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        position: 'relative',
        backgroundColor: 'var(--bg-cream)',
      }}
    >
      {/* Gentle Floating Scrapbook Hearts / Decorative Stars */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            color: 'var(--rose-soft)',
            opacity: 0.4,
            fontSize: '2rem',
            animation: 'floatGentle 6s infinite ease-in-out',
          }}
        >
          ♥
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '18%',
            right: '12%',
            color: 'var(--gold-antique)',
            opacity: 0.35,
            fontSize: '1.6rem',
            animation: 'floatGentle 8s infinite ease-in-out 1s',
          }}
        >
          ✦
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '14%',
            color: 'var(--rose-main)',
            opacity: 0.3,
            fontSize: '1.8rem',
            animation: 'floatGentle 7s infinite ease-in-out 2s',
          }}
        >
          ♥
        </span>
      </div>

      {/* Romantic Scrapbook Book Card */}
      <div
        className="scrapbook-card"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#FFFDF9',
          borderRadius: '24px',
          padding: '48px 36px',
          boxShadow: '0 25px 60px -15px rgba(65, 42, 32, 0.16)',
          border: '8px solid #F6EEE2',
          textAlign: 'center',
        }}
      >
        {/* Washi Tape Strip on Top */}
        <div className="washi-tape washi-blush" style={{ top: '-18px', width: '130px' }} />

        {/* Heart / Book Icon Emblem */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--rose-blush)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            color: 'var(--rose-main)',
            border: '2px solid rgba(212, 122, 131, 0.3)',
            boxShadow: '0 4px 12px rgba(212, 122, 131, 0.2)',
          }}
        >
          <BookHeart size={32} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            color: 'var(--ink-primary)',
            marginBottom: '8px',
            lineHeight: 1.2,
          }}
        >
          Our Little Book of Us
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1.25rem',
            color: 'var(--rose-deep)',
            marginBottom: '28px',
            fontWeight: 600,
          }}
        >
          Enter the secret key to open our anniversary album
        </p>

        {/* Error Alert Box */}
        {errorMessage && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 14px',
              backgroundColor: '#FDE8E8',
              color: '#9E1C1C',
              border: '1px solid #F8B4B4',
              borderRadius: '12px',
              fontSize: '0.88rem',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Username Field */}
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="login-username"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                marginBottom: '6px',
              }}
            >
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--ink-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                <User size={18} />
              </div>
              <input
                id="login-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 44px',
                  borderRadius: '12px',
                  border: '1px solid rgba(138, 114, 98, 0.3)',
                  backgroundColor: '#FFFDF9',
                  fontSize: '0.95rem',
                  color: 'var(--ink-primary)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div style={{ marginBottom: '26px' }}>
            <label
              htmlFor="login-password"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                marginBottom: '6px',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--ink-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                <Lock size={18} />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 44px',
                  borderRadius: '12px',
                  border: '1px solid rgba(138, 114, 98, 0.3)',
                  backgroundColor: '#FFFDF9',
                  fontSize: '0.95rem',
                  color: 'var(--ink-primary)',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-scrapbook-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.05rem',
              borderRadius: '12px',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s infinite linear' }} />
                <span>Opening scrapbook...</span>
              </>
            ) : (
              <>
                <Heart size={18} fill="#FFF" />
                <span>Open Scrapbook</span>
              </>
            )}
          </button>
        </form>

        {/* Wax Seal Badge in corner */}
        <div
          style={{
            position: 'absolute',
            bottom: '-22px',
            right: '28px',
            zIndex: 5,
          }}
        >
          <div className="wax-seal" title="Protected Anniversary Album">
            ♥
          </div>
        </div>
      </div>
    </div>
  );
};
