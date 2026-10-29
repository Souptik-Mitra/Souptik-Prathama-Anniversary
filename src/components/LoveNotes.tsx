import React, { useState } from 'react';
import type { LoveNote } from '../types/scrapbook';
import { Mail, Heart, X, Feather, Stamp } from 'lucide-react';

interface LoveNotesProps {
  notes: LoveNote[];
}

export const LoveNotes: React.FC<LoveNotesProps> = ({ notes }) => {
  const [activeNote, setActiveNote] = useState<LoveNote | null>(null);

  return (
    <section
      id="notes"
      aria-label="Love Notes and Letters"
      style={{
        padding: '100px 20px',
        backgroundColor: 'rgba(244, 236, 225, 0.45)',
        borderTop: '1px solid rgba(220, 208, 195, 0.5)',
        borderBottom: '1px solid rgba(220, 208, 195, 0.5)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-badge">
            <Mail size={14} />
            <span>Folded Letters</span>
          </div>
          <h2 className="section-title">Little Notes & Letters</h2>
          <p className="section-subtitle">
            Tucked into the pages of our scrapbook: quiet reflections, inside jokes, and heartfelt words.
          </p>
          <div
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(212, 122, 131, 0.12)',
              fontSize: '0.8rem',
              color: 'var(--rose-deep)',
              fontWeight: 600,
            }}
          >
            ✉️ Phase 1 Sample Notes • Tap any letter to open and preview
          </div>
        </div>

        {/* Envelope / Note Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            maxWidth: '1020px',
            margin: '0 auto',
          }}
        >
          {notes.map((note) => (
            <div
              key={note.id}
              className="scrapbook-card"
              style={{
                backgroundColor:
                  note.paperStyle === 'kraft'
                    ? '#F4EAE0'
                    : note.paperStyle === 'lined'
                    ? '#FAF7F0'
                    : '#FFFDF9',
                backgroundImage:
                  note.paperStyle === 'lined'
                    ? 'repeating-linear-gradient(transparent, transparent 27px, #E8DFD5 28px)'
                    : 'none',
                boxShadow: 'var(--shadow-envelope)',
                border: '1px solid rgba(200, 178, 155, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onClick={() => setActiveNote(note)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveNote(note);
                }
              }}
            >
              {/* Paperclip Motif at top left */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '28px',
                  width: '14px',
                  height: '32px',
                  borderRadius: '10px',
                  border: '3px solid #B09B88',
                  borderBottom: 'none',
                  zIndex: 2,
                }}
              />

              {/* Top Row: Date & Postage Stamp */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <span className="postage-stamp" style={{ fontSize: '0.72rem' }}>
                  {note.date}
                </span>

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--rose-blush)',
                    color: 'var(--rose-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--rose-main)',
                  }}
                >
                  <Heart size={14} fill="var(--rose-main)" />
                </div>
              </div>

              {/* Title & Preview */}
              <div style={{ marginBottom: '24px' }}>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    color: 'var(--ink-primary)',
                    marginBottom: '10px',
                  }}
                >
                  {note.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.25rem',
                    color: 'var(--ink-secondary)',
                    lineHeight: '1.4',
                  }}
                >
                  {note.preview}
                </p>
              </div>

              {/* Bottom Action: "Open this note" */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px dashed rgba(180, 160, 140, 0.4)',
                  paddingTop: '14px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--rose-deep)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Feather size={14} />
                  <span>Open & read letter →</span>
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.1rem',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {note.signOff}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Letter Modal */}
      {activeNote && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-note-title"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="modal-content scrapbook-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '40px',
              maxWidth: '640px',
              backgroundColor: '#FFFDF8',
              backgroundImage:
                'radial-gradient(#e0d2c2 0.75px, transparent 0.75px), linear-gradient(180deg, #FAF6EE 0%, #FFFDF9 100%)',
              backgroundSize: '24px 24px, 100% 100%',
              border: '2px solid #E4D5C5',
            }}
          >
            {/* Top Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <span className="postage-stamp">
                <Stamp size={13} style={{ color: 'var(--rose-main)' }} />
                <span>Letter • {activeNote.date}</span>
              </span>

              <button
                onClick={() => setActiveNote(null)}
                aria-label="Close letter"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Note Heading */}
            <h3
              id="active-note-title"
              style={{
                fontSize: '1.8rem',
                color: 'var(--ink-primary)',
                marginBottom: '16px',
              }}
            >
              {activeNote.title}
            </h3>

            {/* Full Handwritten Letter Body */}
            <div
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.45rem',
                lineHeight: '1.55',
                color: 'var(--ink-primary)',
                whiteSpace: 'pre-line',
                marginBottom: '26px',
              }}
            >
              {activeNote.fullLetter}
            </div>

            {/* Sign-off */}
            <div
              style={{
                textAlign: 'right',
                fontFamily: 'var(--font-hand)',
                fontSize: '1.6rem',
                color: 'var(--rose-deep)',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              {activeNote.signOff}
            </div>

            {/* Phase 2 Customization Notice */}
            <div
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(200, 155, 89, 0.12)',
                border: '1px solid rgba(200, 155, 89, 0.3)',
                fontSize: '0.82rem',
                color: '#7A5222',
                textAlign: 'center',
              }}
            >
              📌 <strong>Phase 1 Note:</strong> This letter text is sample copy. In Phase 2, it will be updated with your genuine words and private dedication.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
