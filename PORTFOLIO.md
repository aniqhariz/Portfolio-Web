# Interactive Vinyl Portfolio

## 1. Project Overview

Build a personal portfolio website as a **single-page, section-based interactive experience inspired by a physical vinyl record player and a modern music player interface**.

The website must feel like navigating through the tracks of a personal album. Each section reveals a different part of the developer's identity, skills, projects, experiments, and contact information.

This is NOT a conventional developer landing page.

### Core Experience

* One persistent page layout.
* A minimal navigation bar at the top.
* Portfolio information positioned on the center-left.
* A realistic 3D turntable positioned on the center-right.
* A functional custom music player directly beneath the turntable.
* Previous and Next navigation for moving between portfolio sections.
* Modal dialogs for expanded information.
* Smooth transitions between sections without full-page reloads or long vertical scrolling.

The central idea is:

**"A portfolio you can listen to."**

The turntable and music player must remain visually consistent while the active portfolio content changes.

## 2. Visual Design System

### Color Palette

The primary interface is white, with near-black text and subtle translucent surfaces.

* Primary background: `#FFFFFF`
* Primary text: `#1E1E1E`
* Secondary text: `#707070`
* Primary border: `#E7E7E7`
* Secondary surface: `#F7F7F7`
* Glass surface: `rgba(255, 255, 255, 0.72)`
* Glass border: `rgba(30, 30, 30, 0.10)`
* Modal backdrop: `rgba(20, 20, 20, 0.28)`

Use black and white as the dominant colors. Do not introduce unnecessary accent colors.

### Glassmorphism

Use restrained glass effects on selected interface elements, such as the player, navigation overlays, and modal surfaces.

* Semi-transparent white surfaces.
* Subtle backdrop blur.
* Thin, low-contrast borders.
* Soft shadows.
* Clear text contrast.
* Minimal corner rounding.

Do not apply glass effects to every component. The interface should feel refined, not like a collection of frosted windows.

### Typography

Use Geist, Inter, or another clean modern sans-serif typeface.

* Strong editorial headlines.
* Compact uppercase metadata.
* Readable body text.
* Generous whitespace.
* Consistent type hierarchy.

Avoid oversized typography that overwhelms the main layout.

## 3. Main Page Layout

The website must use one persistent application shell.

### A. Top Navigation

Create a minimal navbar at the top containing:

* Personal name or wordmark.
* Navigation access to About, Skills, Selected Works, Experiments, and Contact.
* An optional availability indicator.
* A compact menu or modal access point when appropriate.

Navigation must update the active portfolio section without navigating to separate routes or creating a long scrolling page.

### B. Main Content: Center-Left

Display the active section's content on the left side of the main viewport.

Each section should contain:

* Section number and label.
* A distinctive headline.
* A concise description.
* Optional metadata.
* A contextual action that opens a modal with additional details.

Only the active section's primary content should be visible in the main layout.

Use short, intentional text. The main interface is an introduction, not a place to display an entire résumé.

### C. Turntable: Center-Right

Display the supplied 3D turntable model on the right side.

The model should remain the primary visual centerpiece across all portfolio sections.

Requirements:

* Realistic proportions and materials.
* White-background-compatible studio lighting.
* Subtle shadows and reflections.
* Responsive camera framing.
* Smooth vinyl rotation during playback.
* A resting vinyl state when playback is paused.
* Tonearm animation only if the model supports it reliably.

Do not replace the supplied 3D asset with a static image or an unrelated model.

### D. Music Player: Beneath the Turntable

Place the custom music player directly beneath the 3D turntable.

Include:

* Current track title.
* Artist name.
* Track number or playlist context.
* Previous track.
* Play and pause.
* Next track.
* Seekable progress bar.
* Current time and total duration.
* Volume control.
* Optional mute control.

Use a restrained Spotify-inspired interaction pattern, but create an original visual design consistent with this portfolio.

The player should look like part of the website rather than an embedded third-party widget.

### E. Section Navigation: Bottom of the Main Layout

Provide Previous and Next controls for navigating between portfolio sections.

Display the current section number and total section count.

Navigation order:

1. About Me
2. Skills
3. Selected Works
4. Experiments
5. Contact

Previous and Next must navigate between these sections without changing the page route or resetting the shared player.

The section navigation and music player controls are separate systems. Do not confuse their responsibilities.

## 4. Modal-Based Content

Use modal dialogs to present detailed information without overcrowding the main interface.

### About Me Modal

Can include a longer introduction, creative interests, background, and personal approach to development.

### Skills Modal

Can display skill categories, technologies, design tools, and relevant examples.

### Selected Works Modal

Can present project descriptions, screenshots, technology stacks, outcomes, and available project links.

### Experiments Modal

Can showcase prototypes, creative coding, visual experiments, and unfinished explorations.

### Contact Modal

Can include email, GitHub, LinkedIn, and other supplied links.

### Modal Behavior

* Open the correct modal from the active section.
* Provide a visible close button.
* Close using Escape.
* Close on backdrop click.
* Prevent clicks inside the modal from accidentally closing it.
* Keep modal content scrollable when necessary.
* Support keyboard navigation and visible focus indicators.
* Lock background scrolling while an appropriate modal is open.
* Restore focus to the control that opened the modal.

Use real supplied information wherever available. Use clearly marked placeholders for missing content. Never invent employment history, clients, awards, project metrics, or contact details.

## 5. Section Navigation and State

Implement the website as a single-page application with one persistent layout.

Use centralized section configuration and a shared navigation state.

### Navigation Rules

* Next advances to the next section.
* Previous returns to the previous section.
* Navbar links jump directly to the corresponding section.
* The active section's content updates smoothly.
* The turntable and player remain mounted where practical.
* The active section number updates immediately and accurately.
* Section transitions must not cause a full-page reload.
* Avoid long vertical scrolling as the primary navigation mechanism.

Use a predictable transition system with restrained motion. Support reduced-motion preferences.

Do not let automatic soundtrack changes interrupt an active user interaction with the player.

## 6. Music Player and Soundtrack Mapping

Implement a genuinely functional custom audio player using the HTML Audio API.

Use one shared audio instance or centralized audio controller across the application.

### Section Soundtracks

| Section        | Track                        | Artist       |
| -------------- | ---------------------------- | ------------ |
| About Me       | Want U                       | Clara La San |
| Skills         | The Less I Know the Better   | Tame Impala  |
| Selected Works | Midnight City                | M83          |
| Experiments    | Times Like These             | EDEN         |
| Contact        | Nothing Can Change This Love | Sam Cooke    |

These assignments are configurable defaults. Keep the actual local filenames and audio paths editable in a centralized configuration file.

### Local Audio Configuration

Store authorized audio files in `public/audio/`.

Support `.mp3` files as the primary playback format. Allow other browser-supported formats when needed.

Example configuration:

```ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  sectionId: string;
}

export const tracks: Track[] = [
  {
    id: "about",
    title: "Want U",
    artist: "Clara La San",
    src: "/audio/want-u.mp3",
    sectionId: "about",
  },
];
```

The example is illustrative. Populate the actual configuration with all five soundtrack assignments.

Do not assume the example file exists. Do not silently convert, rename, or overwrite user-owned audio files.

The developer will supply and manage the final MP3 files manually.

### Playback Requirements

* Play and pause work correctly.
* Previous and Next change tracks.
* Seeking updates the actual audio playback position.
* Volume changes the actual audio volume.
* Playback time and duration reflect the audio element.
* Track metadata updates when the selected track changes.
* Audio errors are handled without breaking the interface.
* Missing audio files display a clear, non-disruptive error state.
* Playback must never start automatically on initial page load.
* The vinyl rotates only while audio is playing.
* The vinyl stops when playback is paused or ended.

### Section-to-Track Synchronization

When the active portfolio section changes:

1. Find its assigned soundtrack.
2. Update the selected track and displayed metadata.
3. If playback is paused, remain paused.
4. If playback is active, change tracks in a controlled manner.
5. Use a short crossfade only if it can be implemented without creating competing audio streams or state inconsistencies.
6. Avoid repeatedly restarting a track during transitions or rerenders.

Manual player controls must remain reliable even when the user navigates between sections.

The active soundtrack is determined by the selected portfolio section, not by the modal currently open.

Do not download, scrape, or embed unauthorized commercial audio streams. Use local audio files supplied by the developer or otherwise authorized sources.

## 7. 3D Turntable Integration

The developer has supplied a turntable model in OBJ format with an accompanying MTL file.

### Asset Inspection

Before implementing animations:

* Locate the provided model and its dependencies.
* Inspect the OBJ and MTL files.
* Verify material and texture references.
* Determine model scale and orientation.
* Identify whether the vinyl, platter, tonearm, and base are separate meshes.
* Check whether the model contains suitable pivot points.

Convert to GLB/glTF when beneficial for packaging and performance, preserving the model's appearance.

### Animation Rules

* Rotate only the appropriate vinyl or platter mesh during playback.
* Stop the rotation when playback stops.
* Animate the tonearm only if it can be controlled without damaging the model's appearance.
* Never rotate the entire turntable to simulate vinyl playback.
* If independent vinyl rotation is impossible with the supplied geometry, explain the limitation and use a technically sound alternative.

Keep the 3D rendering independent from the audio controller so a rendering failure cannot break music playback.

## 8. Responsive Design

### Desktop

* Navbar at the top.
* Information panel on the left.
* Large 3D turntable on the right.
* Player immediately beneath the turntable.
* Section navigation near the bottom of the viewport.

### Tablet

* Preserve the two-column composition when space allows.
* Adjust typography and model scale.
* Prevent the player from becoming cramped.

### Mobile

* Stack the information, turntable, and player vertically.
* Keep all essential controls accessible.
* Use appropriate touch-target sizes.
* Avoid horizontal overflow.
* Simplify 3D rendering when necessary.
* Keep section navigation easy to reach.
* Use a scrollable modal when content exceeds the viewport.

Do not rely on hover to expose essential functionality.

## 9. Technical Stack

Preferred stack:

* Next.js with App Router.
* TypeScript.
* Tailwind CSS.
* Motion for React.
* Three.js.
* React Three Fiber.
* Drei.
* HTML Audio API.
* Lucide React.

Inspect the existing repository before changing dependencies or project structure.

Reuse existing working components and the supplied assets.

Use client components only where browser interactions, state, or 3D rendering require them.

## 10. Suggested Architecture

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      Navbar.tsx
      SectionNavigation.tsx

    portfolio/
      PortfolioShell.tsx
      SectionContent.tsx
      ContentModal.tsx

    turntable/
      TurntableScene.tsx
      TurntableModel.tsx
      VinylRecord.tsx
      Tonearm.tsx
      TurntableFallback.tsx

    player/
      AudioPlayer.tsx
      PlayerControls.tsx
      ProgressBar.tsx
      TrackInfo.tsx
      VolumeControl.tsx

  hooks/
    useAudioPlayer.ts

  data/
    sections.ts
    tracks.ts
    projects.ts

  types/
    audio.ts
    portfolio.ts

public/
  models/
  textures/
  audio/
  images/
```

Adapt this structure to the existing project rather than restructuring everything without a reason.

## 11. Accessibility and Reliability

* Use semantic HTML.
* Add accessible names to icon-only buttons.
* Maintain readable text contrast.
* Provide visible keyboard focus states.
* Respect reduced-motion preferences.
* Support Escape to close modals.
* Handle missing audio files.
* Handle 3D loading failures.
* Keep the website usable without WebGL.
* Ensure player controls do not depend on successful model loading.
* Prevent accidental playback interruptions.
* Avoid nonfunctional buttons and fake controls.

## 12. Implementation Order

### Phase 1: Inspect and Plan

Inspect the repository, dependencies, and provided 3D assets. Identify existing code that can be reused.

### Phase 2: Build the Interface

Implement the white visual system, navbar, two-column composition, section navigation, player shell, and modal infrastructure.

### Phase 3: Implement Section Navigation

Build the five section states and their transitions. Keep the main layout persistent.

### Phase 4: Implement the Audio Player

Build functional playback controls and editable soundtrack configuration. Test playback, seeking, volume, track changes, and missing-file behavior.

### Phase 5: Integrate the Turntable

Load the supplied model, inspect its meshes, configure camera and lighting, and synchronize vinyl rotation with playback.

### Phase 6: Add Content and Polish

Populate editable portfolio data, modal content, responsive layouts, and subtle transitions.

### Phase 7: Validate

Verify that:

* The project builds successfully.
* The website uses one persistent page layout.
* Navigation changes content without a full-page reload.
* Previous and Next section controls work correctly.
* The player controls work independently.
* Section soundtrack mappings are accurate.
* No audio autoplay occurs.
* Vinyl animation follows playback state.
* Modal interactions work correctly.
* Local audio paths are configurable.
* The website remains usable on mobile and when 3D rendering fails.

Do not claim successful tests unless they have actually been run.

## 13. Final Quality Standard

The final result should feel like an interactive personal album with a professional portfolio embedded inside it.

Priorities:

1. Faithful implementation of the single-page concept.
2. White, editorial, restrained glassmorphism design.
3. Clear left-content/right-turntable composition.
4. Functional music playback and section navigation.
5. Useful modal-based content.
6. Smooth but restrained interactions.
7. Responsive design and maintainable code.

**The turntable is the visual centerpiece. The player provides the musical identity. The section navigation turns the portfolio into an experience.**
