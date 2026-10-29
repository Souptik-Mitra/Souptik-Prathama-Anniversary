# PRD: Our First Anniversary — Digital Scrapbook

**Project type:** Personal, romantic, photo-led website  
**Build environment:** Google Antigravity  
**Primary user:** My girlfriend, the recipient of the anniversary gift  
**Owner/editor:** Me  
**Project status:** Phase 1 — visual outlet first; wait for my photos before final personalization

---

## 1. Product vision

Create a beautiful, intimate, scrapbook-style website celebrating our first anniversary. It should feel like opening a handmade memory book: warm paper textures, taped polaroids, handwritten notes, little doodles, dates, captions, and gentle animations. Our real photos and personal memories should be the emotional focus.

The website should feel personal and carefully crafted—not like a generic template or a corporate landing page.

## 2. Core build rule: use a two-phase workflow

### Phase 1 — Build the visual outlet only

1. Build the complete visual layout and responsive structure using clearly identified placeholder photos and sample copy.
2. Include the scrapbook sections, navigation, interactions, photo-upload interface, and responsive behavior.
3. Use placeholder content only. Do not invent relationship facts, dates, names, locations, or stories.
4. Once the first visual version is ready, **stop and ask me to upload/send the photos and personal details needed to personalize it**.
5. Do not claim the final website is complete at this stage. Do not replace the placeholders with invented photos of us.

### Phase 2 — Personalize and finish

After I provide photos and any details:
1. Review the supplied photos and choose suitable placements, while keeping the original files intact.
2. Replace placeholders with our actual photos and write captions only from details I provide.
3. Ask a concise follow-up only if a necessary detail is missing; otherwise proceed with sensible design defaults.
4. Check image crops, mobile layout, accessibility, broken links, upload behavior, and all interactions.
5. Deliver the finished website and clear run/deployment instructions.

**Important:** Complete Phase 1 first, then pause for my photos. Do not skip ahead to Phase 2.

## 3. Goals

- Make a romantic, memorable first-anniversary gift.
- Present our photos in a scrapbook that feels handmade and personal.
- Let me add more photos later through an upload feature.
- Make the experience work smoothly on mobile and desktop.
- Keep the website easy for me to update without manually editing every scrapbook page.

## 4. Intended audience and tone

The website is primarily for my girlfriend. The tone should be loving, warm, playful, nostalgic, sincere, and personal. Avoid overly dramatic or cheesy copy. Use short romantic notes and leave room for real memories and inside jokes that I will supply.

## 5. Visual direction

**Art direction:** Modern handmade scrapbook / journal / polaroid album.

- Warm cream, ivory, blush pink, muted rose, soft brown, and a restrained accent color.
- Paper grain, torn-paper edges, washi tape, paper clips, stickers, tiny hearts, stars, doodles, and handwritten annotations.
- Polaroid-style photo frames with subtle shadows and slightly varied rotations.
- A mix of elegant serif headings and readable body text, with a handwritten font used sparingly for notes.
- Soft, smooth transitions and small hover effects; avoid excessive motion.
- Generous whitespace and clear visual hierarchy.
- Use tasteful details rather than cluttering every section.
- Use the actual supplied photos as the visual centerpiece.

Avoid: generic SaaS layouts, neon gradients, excessive glassmorphism, too many animations, tiny unreadable text, and autoplay audio.

## 6. Information architecture and sections

### A. Opening / cover page
- A scrapbook-cover hero with a title such as **“Our Little Book of Us”** or **“One Year, A Thousand Memories.”**
- A small subtitle such as “A little collection of moments that mean everything.”
- A prominent “Open our scrapbook” button.
- Space for our names and anniversary date, to be filled in only after I provide them.
- Optional subtle floating hearts or paper details, with reduced-motion support.

### B. Our story / timeline
- A chronological timeline made from scrapbook cards.
- Each card can contain a date, photo, short title, and a note.
- Start with placeholder milestones in Phase 1; do not invent actual events.
- In Phase 2, use only milestones and dates I confirm.

### C. Photo scrapbook
- A responsive grid or masonry-inspired layout of polaroid cards.
- Each photo card supports a short caption and optional date.
- Tapping a photo opens a larger lightbox view with caption and next/previous controls.
- Include a mix of photo sizes and rotations while maintaining readable layout and accessible controls.
- On mobile, use a clean single- or two-column layout without awkward cropping.

### D. Little notes / love letters
- A few paper-note cards with sample placeholder copy during Phase 1.
- Replace them with my words or details I approve in Phase 2.
- Optional “Open this note” interaction for a letter-style panel.
- Do not generate personal promises, intimate details, or relationship history as if they are true.

### E. “Reasons I love you” / favorite things
- An optional section with small cards or handwritten notes.
- Keep sample content clearly marked as placeholder until I supply the actual reasons.
- Make the section easy to remove or edit.

### F. Future memories
- A small “More memories to come” area to symbolize the next chapter.
- Keep it gentle and optimistic rather than making specific promises.

### G. Closing page
- A final anniversary message and a simple “Back to the beginning” control.
- Include a subtle visual flourish, such as a heart stamp or folded-note motif.
- The final message must be editable and must not invent personal details.

## 7. Photo upload feature

### User experience
- Add a clearly visible “Add a memory” or “Upload photos” control.
- Allow selecting one or multiple image files.
- Support common image formats: JPG/JPEG, PNG, and WebP.
- Show a preview before saving, with the option to cancel or remove a selected file.
- Allow an optional caption and date.
- After a successful upload, automatically add the photo to the scrapbook gallery without requiring me to edit code or manually place it.
- Show useful loading, success, and error states.
- Provide a way to delete a photo, with confirmation before permanent deletion.
- Keep the existing scrapbook layout intact when new photos are added.

### Persistence and technical behavior
- New photos should persist across refreshes and future visits; do not rely only on browser memory or temporary component state.
- Choose a simple, maintainable storage/database approach suitable for the selected stack (for example, Supabase Storage with a database table, or Firebase Storage with Firestore).
- If credentials or a backend service are required, build the integration safely using environment variables and provide a `.env.example`. Never expose secret service keys in frontend code or commit real credentials.
- If the storage service has not been configured yet, make the upload interface usable in a clearly labelled demo mode and explain what setup is needed for persistent uploads. Do not pretend that a photo has been permanently saved when it has not.
- Validate file type and size, handle upload failures, and show a helpful message.
- Use sensible limits (for example, 10 MB per image) and make them configurable.
- Use secure access rules appropriate to a private personal website. Do not assume the site is private just because it is unlisted.
- If the site is publicly accessible, explain the implications before enabling public uploads. Prefer owner-only upload controls or a simple authenticated admin mode so visitors cannot add unwanted content.
- Preserve the original photo; create optimized display versions or thumbnails if appropriate.

### Acceptance criteria
- I can select multiple photos and preview them before saving.
- A successful upload appears in the scrapbook automatically.
- Uploaded photos remain visible after refreshing and reopening the site once persistent storage is configured.
- Failed uploads display a clear error and do not create broken gallery cards.
- Delete actions require confirmation.
- Upload controls are keyboard accessible and usable on mobile.

## 8. Privacy and personal content

- Treat our photos and personal notes as private personal content.
- Do not send photos to third-party AI image services or external APIs unless I explicitly approve that behavior.
- Do not add analytics, tracking pixels, or unnecessary third-party scripts.
- Do not expose storage credentials or private keys in client-side code.
- Explain whether the deployed gallery and uploaded photos are publicly accessible.
- If privacy is important, recommend access protection and restricted upload permissions before deployment.
- Use only assets that I provide or assets that are safe to use; do not use random real people's photos as if they were us.

## 9. Functional requirements

1. Navigation between sections works.
2. “Open our scrapbook” scrolls or transitions to the scrapbook.
3. Gallery images open in a lightbox and can be closed with a visible control and Escape key.
4. Photo upload supports multiple selections and clear validation.
5. Successful uploads appear automatically in the gallery.
6. Captions and dates can be added or edited.
7. Photo deletion is protected by a confirmation step.
8. Layout adapts to desktop, tablet, and mobile.
9. Buttons, links, focus states, and form controls are accessible.
10. Reduced-motion preferences are respected.
11. No console errors, broken image paths, or dead controls in the final build.
12. All personal names, dates, captions, and relationship milestones are easy to update.

## 10. Non-functional requirements

- Responsive and mobile-first.
- Fast initial load; optimize large images and use lazy loading where appropriate.
- Semantic HTML and accessible labels/alt text.
- Good contrast and readable type.
- Maintainable component structure and clear setup instructions.
- No secrets committed to source control.
- Graceful error and empty states.
- Respect `prefers-reduced-motion`.

## 11. Suggested implementation approach

Use the stack that Antigravity can implement reliably in the existing project. If starting from scratch, prefer:
- React with TypeScript and a modern build tool such as Vite.
- CSS modules, plain CSS, or the project's existing styling system.
- A lightweight icon library only where useful.
- Supabase or Firebase for persistent photo storage if needed.

Keep components modular, for example:
- `CoverHero`
- `StoryTimeline`
- `ScrapbookGallery`
- `PhotoCard`
- `PhotoLightbox`
- `PhotoUploader`
- `LoveNotes`
- `FutureMemories`
- `ClosingMessage`

Keep scrapbook entries in a structured data model rather than hard-coding each card into the page. Each entry should support an ID, image path/URL, caption, optional date, creation timestamp, and optional timeline grouping.

Do not add a backend/database just for appearance. If persistent uploads are required, implement the integration end-to-end and document its setup.

## 12. Phase 1 placeholder content

Use neutral sample entries such as:
- “A favorite memory goes here”
- “Add our story here”
- “A note for you”
- “Photo placeholder”

Clearly distinguish placeholder images and copy from real content. Do not fabricate names, anniversaries, dates, locations, or events.

## 13. Phase 2 personalization checklist

After the first layout is ready, ask me for:
- Photos of us (I can send them in batches).
- Our names or the names/nicknames I want displayed.
- The anniversary date, if it should appear on the site.
- Any dates or milestones I want on the timeline.
- Captions, inside jokes, favorite memories, and the final message (optional).
- Whether the website should be public, unlisted, or access-protected.
- Whether uploads should be owner-only or available to anyone with access.

Do not make all details mandatory. If I provide only photos, continue with a beautiful photo-first scrapbook and editable placeholders for anything missing.

## 14. Definition of done

The project is complete when:
- The real photos and approved details replace the placeholders.
- The scrapbook feels cohesive, romantic, and handmade.
- The upload flow adds photos to the gallery automatically and persistence works after configuration.
- The website is responsive, accessible, and free of obvious runtime errors.
- Privacy and deployment behavior are explained.
- I receive clear instructions to run, configure, and deploy the website.

---

## Antigravity's first instruction

**Start Phase 1 now. Build the visual outlet and functional front-end structure with placeholders. When that preview is ready, stop and ask me to send the photos and personal details. Do not finalize the personalized website until I provide them.**
