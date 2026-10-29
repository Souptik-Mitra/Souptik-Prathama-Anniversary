import React from 'react';
import type { TimelineMilestone } from '../types/scrapbook';
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';

interface StoryTimelineProps {
  milestones: TimelineMilestone[];
  onOpenPhoto: (url: string, caption: string, date?: string) => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  milestones,
  onOpenPhoto,
}) => {
  return (
    <section
      id="story"
      aria-label="Our Story Timeline"
      style={{
        padding: '90px 20px',
        position: 'relative',
        backgroundColor: 'rgba(255, 253, 249, 0.65)',
        borderTop: '1px solid rgba(224, 210, 196, 0.45)',
        borderBottom: '1px solid rgba(224, 210, 196, 0.45)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Our Journey</span>
          </div>
          <h2 className="section-title">The Story of Us</h2>
          <p className="section-subtitle">
            A chronological memory trail of our first year together. Each chapter holds a special piece of our story.
          </p>
          <div
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(200, 155, 89, 0.15)',
              fontSize: '0.8rem',
              color: '#8A5818',
              fontWeight: 600,
            }}
          >
            🏷️ Milestones below are Phase 1 sample placeholders — ready for your real dates & memories in Phase 2
          </div>
        </div>

        {/* Timeline Spine & Cards */}
        <div
          style={{
            position: 'relative',
            maxWidth: '880px',
            margin: '0 auto',
            paddingLeft: '24px',
          }}
          className="timeline-wrapper"
        >
          {/* Vertical Timeline Track Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '24px',
              width: '3px',
              background: 'repeating-linear-gradient(to bottom, #D9C3AE 0, #D9C3AE 8px, transparent 8px, transparent 16px)',
              zIndex: 1,
            }}
          />

          {/* Milestone Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.id}
                  style={{
                    position: 'relative',
                    paddingLeft: '44px',
                    zIndex: 2,
                  }}
                >
                  {/* Spine Node / Heart Pin */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-8px',
                      top: '20px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-card-paper)',
                      border: '2px solid var(--rose-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--rose-deep)',
                      boxShadow: '0 2px 8px rgba(212, 122, 131, 0.3)',
                      zIndex: 3,
                    }}
                  >
                    <Heart size={14} fill="var(--rose-soft)" color="var(--rose-deep)" />
                  </div>

                  {/* Scrapbook Milestone Card */}
                  <div
                    className="scrapbook-card"
                    style={{
                      padding: '28px',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(200px, 260px) 1fr',
                      gap: '24px',
                      alignItems: 'center',
                      backgroundColor: '#FFFDF9',
                      borderRadius: '18px',
                    }}
                  >
                    {/* Washi Tape Strip */}
                    <div className={`washi-tape washi-${milestone.washiStyle}`} />

                    {/* Left: Polaroid Snapshot */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onOpenPhoto(milestone.photoUrl, milestone.title, milestone.date)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onOpenPhoto(milestone.photoUrl, milestone.title, milestone.date);
                        }
                      }}
                      className="polaroid-frame"
                      style={{
                        cursor: 'pointer',
                        padding: '10px 10px 16px 10px',
                        transform: isEven ? 'rotate(-1.5deg)' : 'rotate(1.8deg)',
                      }}
                      title="Click to view full photo"
                    >
                      <div className="polaroid-image-container" style={{ aspectRatio: '4/3' }}>
                        <img
                          src={milestone.photoUrl}
                          alt={`${milestone.title} milestone`}
                          loading="lazy"
                        />
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-hand)',
                          fontSize: '1.05rem',
                          color: 'var(--ink-secondary)',
                          textAlign: 'center',
                          marginTop: '8px',
                          fontWeight: 600,
                        }}
                      >
                        {milestone.tag}
                      </div>
                    </div>

                    {/* Right: Milestone Story Content */}
                    <div>
                      {/* Meta Pills: Date & Location */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span className="postage-stamp">
                          <Calendar size={12} style={{ color: 'var(--rose-main)' }} />
                          {milestone.date}
                        </span>

                        {milestone.location && (
                          <span
                            className="postage-stamp"
                            style={{ borderColor: 'rgba(200, 155, 89, 0.45)' }}
                          >
                            <MapPin size={12} style={{ color: 'var(--gold-antique)' }} />
                            {milestone.location}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: '1.45rem',
                          color: 'var(--ink-primary)',
                          marginBottom: '10px',
                        }}
                      >
                        {milestone.title}
                      </h3>

                      {/* Story Text */}
                      <p
                        style={{
                          color: 'var(--ink-secondary)',
                          fontSize: '0.96rem',
                          lineHeight: '1.6',
                        }}
                      >
                        {milestone.story}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .timeline-wrapper {
            padding-left: 10px !important;
          }
          .scrapbook-card {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};
