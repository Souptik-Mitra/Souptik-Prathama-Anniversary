import React, { useState } from 'react';
import type { FutureMemory } from '../types/scrapbook';
import { Compass, Sparkles, Plus } from 'lucide-react';

interface FutureMemoriesProps {
  initialMemories: FutureMemory[];
}

export const FutureMemories: React.FC<FutureMemoriesProps> = ({ initialMemories }) => {
  const [memories, setMemories] = useState<FutureMemory[]>(initialMemories);
  const [newWish, setNewWish] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    const added: FutureMemory = {
      id: `wish-${Date.now()}`,
      title: newWish.trim(),
      category: 'Our Dreams',
      iconName: 'sparkles',
      isUserAdded: true,
    };

    setMemories((prev) => [...prev, added]);
    setNewWish('');
    setShowInput(false);
  };

  return (
    <section
      id="future"
      aria-label="Future Memories and Next Chapter"
      style={{
        padding: '90px 20px',
        backgroundColor: 'rgba(255, 253, 249, 0.7)',
        borderTop: '1px solid rgba(220, 208, 195, 0.5)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="section-badge">
            <Compass size={14} />
            <span>The Next Chapter</span>
          </div>
          <h2 className="section-title">More Memories Yet to Come</h2>
          <p className="section-subtitle">
            Year one was just the prologue. Here is to all the adventures, quiet Sunday mornings, and cozy memories waiting for us in the years ahead.
          </p>
        </div>

        {/* Wishes / Bucket List Grid */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {memories.map((item) => (
            <div
              key={item.id}
              className="scrapbook-card"
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                backgroundColor: item.isUserAdded ? '#FFFDF4' : '#FFFDF9',
                borderLeft: item.isUserAdded
                  ? '4px solid var(--rose-main)'
                  : '4px solid var(--gold-antique)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    color: item.isUserAdded ? 'var(--rose-main)' : 'var(--gold-antique)',
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '1.05rem',
                      color: 'var(--ink-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      color: 'var(--ink-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginTop: '2px',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '1.5px dashed var(--ink-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--rose-soft)',
                }}
              >
                ♥
              </div>
            </div>
          ))}

          {/* Add a Wish Trigger / Form */}
          {showInput ? (
            <form
              onSubmit={handleAddWish}
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '10px',
              }}
            >
              <input
                type="text"
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Add a future dream or trip..."
                autoFocus
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '12px',
                  border: '1px solid rgba(138, 114, 98, 0.35)',
                  backgroundColor: '#FFFDF9',
                  fontSize: '0.95rem',
                  color: 'var(--ink-primary)',
                }}
              />
              <button type="submit" className="btn-scrapbook-primary" style={{ padding: '0 22px' }}>
                Save Wish
              </button>
              <button
                type="button"
                onClick={() => setShowInput(false)}
                className="btn-scrapbook-secondary"
                style={{ padding: '0 16px' }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <button
                onClick={() => setShowInput(true)}
                className="btn-scrapbook-secondary"
                style={{ fontSize: '0.9rem' }}
              >
                <Plus size={16} />
                <span>Write a wish for Year 2</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
