import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../context/AuthContext.jsx'

function AuthModal({ onClose }) {
  const { error, signInWithGoogle } = useAuth()
  const [busy, setBusy] = useState(false)

  const handleGoogle = async () => {
    setBusy(true)
    try {
      await signInWithGoogle()
      onClose()
    } catch {
      // error shown via context
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-head">
          <span className="auth-modal-title">Sign In</span>
          <button className="auth-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="auth-error-box">{error}</div>}

        <button className="auth-google-btn" onClick={handleGoogle} disabled={busy}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#e8e8e8"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#b0b0b0"
              d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#9a9a9a"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#d0d0d0"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          {busy ? '...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  )
}

export default function AuthButton() {
  const { user, loading, signOutUser } = useAuth()
  const [open, setOpen] = useState(false)

  if (loading) {
    return <div className="auth-btn muted">...</div>
  }

  if (user) {
    return (
      <div className="auth-chip">
        <button className="profile-btn" onClick={() => setOpen((o) => !o)} title="Profile">
          {user.photoURL ? (
            <img className="profile-avatar" src={user.photoURL} alt="avatar" />
          ) : (
            <span className="profile-initial">
              {user.displayName?.[0] || user.email?.[0] || '?'}
            </span>
          )}
          <span className="profile-caret">▾</span>
        </button>

        {open && (
          <>
            <div className="profile-backdrop" onClick={() => setOpen(false)} />
            <div className="profile-menu">
              <div className="profile-head">
                {user.photoURL ? (
                  <img className="profile-avatar big" src={user.photoURL} alt="avatar" />
                ) : (
                  <span className="profile-initial big">
                    {user.displayName?.[0] || user.email?.[0] || '?'}
                  </span>
                )}
                <div className="profile-id">
                  <div className="profile-name">{user.displayName || 'User'}</div>
                  <div className="profile-email">{user.email}</div>
                </div>
              </div>
              <button
                className="profile-signout"
                onClick={() => {
                  setOpen(false)
                  signOutUser()
                }}
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="auth-chip">
      <button className="auth-btn google" onClick={() => setOpen(true)}>
        Sign In
      </button>
      {open && createPortal(<AuthModal onClose={() => setOpen(false)} />, document.body)}
    </div>
  )
}
