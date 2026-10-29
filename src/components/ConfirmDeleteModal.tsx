import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      onClick={onClose}
    >
      <div
        className="modal-content scrapbook-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '32px', maxWidth: '460px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
            }}
          >
            <AlertTriangle size={26} />
          </div>

          <h3
            id="confirm-delete-title"
            style={{ fontSize: '1.45rem', color: 'var(--ink-primary)', marginBottom: '8px' }}
          >
            Remove This Memory?
          </h3>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Are you sure you want to delete this photo from your scrapbook? This action cannot be undone.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            className="btn-scrapbook-secondary"
            style={{ padding: '10px 22px' }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#DC2626',
              color: '#FFF',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 22px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B91C1C')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#DC2626')}
          >
            <Trash2 size={16} />
            <span>Yes, Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
