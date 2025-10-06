
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  body: string;
  category?: string;
  readTime?: string;
};

export const posts: Post[] = [
  {
    "slug": "rigging-rituals-skyfox",
    "title": "Rigging Rituals Playbook",
    "date": "2025-09-20",
    "excerpt": "Prep your anchors, straps, and mindset with our five-minute ritual before anyone takes flight.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <p>A SkyFox scene starts long before anyone leaves the floor. Use this ritual to slow down, breathe, and make sure every bolt, strap, and body is ready for lift off.</p>\n      <h2>Anchor Audit</h2>\n      <ul>\n        <li>Trace every anchor point with your fingers and confirm hardware is seated, tightened, and redundant.</li>\n        <li>Listen for creaks or flex while applying body weight; retighten or swap hardware if anything shifts.</li>\n      </ul>\n      <h2>Strap & Hardware Warm-Up</h2>\n      <ul>\n        <li>Run your palms along each strap to feel for frays, heat, or sticky residue.</li>\n        <li>Click carabiners open and closed three times—they should snap back like a metronome.</li>\n      </ul>\n      <h2>Consent Breath</h2>\n      <p>Stand in the swing together, lock eyes, and exchange three slow breaths. Ask for the scene intention, safe word, and what “green” feels like tonight.</p>\n    ",
    "category": "Rigging",
    "readTime": "5 min read"
  },
  {
    "slug": "scene-styling-skyfox-suite",
    "title": "Suite Styling Starter: Dressing a SkyFox Swing",
    "date": "2025-08-28",
    "excerpt": "Layer textiles, lighting, and scent so your suspension suite feels like a private hideaway.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <p>Use these styling pillars to turn any room into a SkyFox cocoon.</p>\n      <h2>Texture Layers</h2>\n      <ul>\n        <li>Base layer: washable velvet cradle cover.</li>\n        <li>Accent layer: faux fur throw + satin bolster.</li>\n        <li>Touch layer: leather or neoprene straps for contrast.</li>\n      </ul>\n      <h2>Lighting Spine</h2>\n      <p>Anchor the scene with a dimmable floor lamp, add clip-on halo lights to highlight bodies, and keep a low amber glow at floor level for safety.</p>\n      <h2>Scent & Sound</h2>\n      <p>Mist linen with cedar and vanilla, then queue our SkyFox “After Dark Flow” playlist at 60 BPM.</p>\n    ",
    "category": "Styling",
    "readTime": "5 min read"
  },
  {
    "slug": "afterglow-care-skyfox",
    "title": "Afterglow Care Ritual",
    "date": "2025-07-28",
    "excerpt": "Cool down bodies, reset textiles, and capture feedback in under ten minutes.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Body Reset</h2>\n      <ul>\n        <li>Serve mineral water with citrus to replenish electrolytes.</li>\n        <li>Massage shoulders with magnesium lotion while discussing highlights.</li>\n      </ul>\n      <h2>Swing Refresh</h2>\n      <p>Swap cradle cover for a fresh one, spritz straps with toy-safe cleaner, and hang textiles to air dry.</p>\n      <h2>Feedback Loop</h2>\n      <p>Log strap settings, favorite positions, and new ideas in your SkyFox concierge journal.</p>\n    ",
    "category": "Care",
    "readTime": "4 min read"
  },
  {
    "slug": "concierge-sos-skyfox",
    "title": "Concierge SOS Toolkit",
    "date": "2025-06-30",
    "excerpt": "What to do (and say) when a scene needs a quick pivot, plus the hotline hours and emergency form.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Immediate Actions</h2>\n      <ul>\n        <li>Land your partner slowly, keep them wrapped in the cradle, and check for pain or dizziness.</li>\n        <li>Call 1-800-SKYFOX and choose option 1 for live rigging support.</li>\n      </ul>\n      <h2>Information to Share</h2>\n      <p>Have your order number, install type, and anchor photos ready. The concierge will walk you through diagnostics in real time.</p>\n      <h2>Emergency Form</h2>\n      <p>Download our emergency recap form to document what happened and schedule a follow-up inspection.</p>\n    ",
    "category": "Concierge",
    "readTime": "4 min read"
  },
  {
    "slug": "skyfox-mount-comparison",
    "title": "Ceiling vs. Stand Installs: Choosing Your SkyFox Mount",
    "date": "2025-09-15",
    "excerpt": "Compare ceiling anchors, freestanding frames, and traveler kits so every space gets the right suspension vibe.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <p>The anchor you choose shapes the entire SkyFox experience. We break down the feel, footprint, and concierge notes for each option.</p>\n      <h2>Ceiling Mount Magic</h2>\n      <p>Permanent installs disappear into architecture and let you spin without boundaries. Ideal for owners who crave a studio that is always ready.</p>\n      <h2>Nebula Freestanding Frames</h2>\n      <p>Our frames pack down for travel, allow mid-room placement, and include weighted feet for vigorous play.</p>\n      <h2>Doorway Escape Kit</h2>\n      <p>Perfect for hotel adventures and discreet play. Use the included pressure pads and remember to secure the secondary safety strap before lift.</p>\n    ",
    "category": "Rigging",
    "readTime": "6 min read"
  },
  {
    "slug": "doorway-suspension-safety",
    "title": "Doorframe Safeguards for Hotel Suspensions",
    "date": "2025-09-10",
    "excerpt": "Travel-friendly installs need extra love. Follow these safeguards before swinging in a borrowed doorway.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <p>Doorway rigs are iconic for their stealth, but they demand careful prep to stay body-safe.</p>\n      <h2>Check the Frame</h2>\n      <ul>\n        <li>Skip hollow-core frames and anything with visible cracks or flex.</li>\n        <li>Use the included torque strap to hug both sides of the jamb.</li>\n      </ul>\n      <h2>Load Distribution</h2>\n      <p>Add our foam pressure pads between the hardware and wood to spread the load. Keep the secondary safety strap clipped to an overhead hinge or weight-bearing beam when possible.</p>\n      <h2>Micro Aftercare</h2>\n      <p>Wipe surfaces with a hotel towel spritzed in toy cleaner so you leave the space as pristine as you found it.</p>\n    ",
    "category": "Rigging",
    "readTime": "4 min read"
  },
  {
    "slug": "pre-scene-suspension-check",
    "title": "Pre-Scene Suspension Checklist",
    "date": "2025-09-05",
    "excerpt": "A printable checklist for lighting, hardware, and body-ready cues before you glide into position.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Room Readiness</h2>\n      <ul>\n        <li>Dim lighting to soft amber, switch on your SkyFox halo strip, and queue the scene playlist.</li>\n        <li>Lay out clean towels, swabs, and hydration within reach.</li>\n      </ul>\n      <h2>Hardware Pulse Check</h2>\n      <ul>\n        <li>Cinch straps to their color-coded hash marks and confirm equal tension.</li>\n        <li>Clip safety line to backup anchor and tug with two hands.</li>\n      </ul>\n      <h2>Body Prep</h2>\n      <p>Warm up hips and shoulders with resistance bands, review safe words, and verify the “land now” cue.</p>\n    ",
    "category": "Rigging",
    "readTime": "3 min read"
  },
  {
    "slug": "skyfox-playlist-lighting",
    "title": "Playlist & Lighting Pairings for Suspension Flow",
    "date": "2025-08-20",
    "excerpt": "Curated BPM arcs and lighting presets to guide your session from tease to afterglow.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <p>Blend audio and lighting cues to usher partners through a seamless suspension arc.</p>\n      <h2>Warm-Up (0-5 minutes)</h2>\n      <p>Music: downtempo R&B at 70 BPM. Lighting: soft blush halo with deep-blue accent.</p>\n      <h2>Lift & Play (5-20 minutes)</h2>\n      <p>Music: house tracks at 105 BPM with deep bass. Lighting: rotate between magenta and amber using the SkyFox remote.</p>\n      <h2>Landing (20-25 minutes)</h2>\n      <p>Music: ambient pads at 60 BPM. Lighting: fade to candlelight amber, then switch to warm white for aftercare.</p>\n    ",
    "category": "Styling",
    "readTime": "4 min read"
  },
  {
    "slug": "suspension-flow-guide",
    "title": "Suspension Flow Guide: Choreographing 30 Minutes Aloft",
    "date": "2025-08-12",
    "excerpt": "A scene map with three signature SkyFox positions and how to transition between them.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <p>Combine these positions to keep energy moving while bodies feel supported.</p>\n      <h2>Position 1: Cradle Cradle</h2>\n      <p>Full-body recline with lumbar bolster. Great for warm-up touch and breath.</p>\n      <h2>Transition</h2>\n      <p>Lock the swivel, raise straps two notches, guide partner to kneeling hover.</p>\n      <h2>Position 2: Nebula Kneel</h2>\n      <p>Knees tucked into cradle, hips suspended. Offers sensational access while keeping core engaged.</p>\n      <h2>Position 3: Orbit Wrap</h2>\n      <p>Wrap straps around thighs and rotate slowly for a mesmerizing finish. Always land back in Cradle Cradle for aftercare.</p>\n    ",
    "category": "Styling",
    "readTime": "6 min read"
  },
  {
    "slug": "consent-scripts-skyfox",
    "title": "Consent Scripts & Safe Words for Floating Scenes",
    "date": "2025-08-05",
    "excerpt": "Steal these ready-made scripts to set intentions, boundaries, and safe cues before you clip in.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Pre-Scene Script</h2>\n      <p>“Tonight I’m craving slow suspension with focus on hips and shoulders. My green light is eye contact and moans. Yellow means adjust the angle. Red means land me now.”</p>\n      <h2>Safe Word Palette</h2>\n      <ul>\n        <li><strong>Green:</strong> Keep gliding.</li>\n        <li><strong>Gold:</strong> Hold this position.</li>\n        <li><strong>Purple:</strong> Pivot to aftercare.</li>\n      </ul>\n      <h2>Aftercare Prompt</h2>\n      <p>“What do you need right now—water, blankets, or a slow rub?” Keep a tray ready so the answer is easy.</p>\n    ",
    "category": "Styling",
    "readTime": "3 min read"
  },
  {
    "slug": "skyfox-textile-care",
    "title": "SkyFox Textile Laundry Guide",
    "date": "2025-07-21",
    "excerpt": "Wash velvet, faux fur, and satin accessories without losing that indulgent hand feel.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Sorting & Pre-Treat</h2>\n      <p>Separate velvets, faux furs, and neoprene. Spot treat with diluted toy cleaner and blot dry before washing.</p>\n      <h2>Washer Settings</h2>\n      <p>Use cold delicate cycle with mild detergent. Skip fabric softener—our textiles have built-in softness.</p>\n      <h2>Dry & Fluff</h2>\n      <p>Air dry on padded hangers, then fluff faux fur with a cool hairdryer for a fresh cloud effect.</p>\n    ",
    "category": "Care",
    "readTime": "5 min read"
  },
  {
    "slug": "hardware-polish-guide",
    "title": "Hardware Polishing 101",
    "date": "2025-07-14",
    "excerpt": "Keep your swivels, carabiners, and anchors showroom-ready with these quick polish hacks.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Weekly Wipe Down</h2>\n      <p>Use a microfiber cloth with isopropyl-free cleaner to remove fingerprints and lube residue.</p>\n      <h2>Deep Polish</h2>\n      <p>Every month, disassemble hardware, soak in warm water with mild soap, rinse, and dry thoroughly before lubricating moving parts with silicone-safe spray.</p>\n      <h2>Storage</h2>\n      <p>Store components in the SkyFox velvet pouches to prevent scratches and tangles.</p>\n    ",
    "category": "Care",
    "readTime": "3 min read"
  },
  {
    "slug": "when-to-retire-swing-gear",
    "title": "Retire & Refresh: When to Replace Swing Gear",
    "date": "2025-07-07",
    "excerpt": "Know when to swap straps, anchors, and covers before they dim the magic.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Strap Lifespan</h2>\n      <p>Replace straps after 18 months of weekly play or sooner if you notice fraying, discoloration, or stiffness.</p>\n      <h2>Anchor Check</h2>\n      <p>Inspect anchors quarterly. Replace if threads show rust, galling, or reduced bite.</p>\n      <h2>Textile Refresh</h2>\n      <p>Rotate cradle covers every 12 months and keep a second set ready so your suite always feels new.</p>\n    ",
    "category": "Care",
    "readTime": "4 min read"
  },
  {
    "slug": "service-request-roadmap",
    "title": "Service Request Roadmap",
    "date": "2025-06-23",
    "excerpt": "A behind-the-curtain look at how SkyFox handles repairs, replacements, and concierge visits.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Submit</h2>\n      <p>Use the concierge form or call the hotline with photos and a summary. We respond within one business day.</p>\n      <h2>Assess</h2>\n      <p>Our rigging team reviews your footage, then sends a repair kit, schedules a virtual walkthrough, or dispatches an installer.</p>\n      <h2>Follow-Up</h2>\n      <p>Expect a check-in 72 hours after service plus a satisfaction survey to keep your suite in perfect shape.</p>\n    ",
    "category": "Concierge",
    "readTime": "3 min read"
  },
  {
    "slug": "warranty-magic-skyfox",
    "title": "Warranty Magic 101",
    "date": "2025-06-16",
    "excerpt": "Understand what our pleasure warranty covers, how to file, and tips for fastest resolution.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>What We Cover</h2>\n      <p>Manufacturer defects, hardware fatigue, and textile stitching failures within two years of purchase.</p>\n      <h2>What We Need</h2>\n      <p>Proof of purchase, photos or video, and notes on usage cadence. The more detail you share, the faster we can help.</p>\n      <h2>Concierge Tip</h2>\n      <p>Register your swing within 30 days so warranty claims route through our VIP lane with priority shipping.</p>\n    ",
    "category": "Concierge",
    "readTime": "4 min read"
  },
  {
    "slug": "returns-refresh-skyfox",
    "title": "Returns & Refresh",
    "date": "2025-06-09",
    "excerpt": "How to rotate inventory, gift gently-used swings, or recycle components without breaking the vibe.",
    "image": "/images/skyfox-placeholder.png",
    "body": "\n      <h2>Return Window</h2>\n      <p>Unused swings can be returned within 30 days. Keep original packaging for easiest processing.</p>\n      <h2>Refresh Program</h2>\n      <p>Trade in gently-loved gear for concierge credit. We sanitize, certify, and donate to community partners.</p>\n      <h2>Recycle</h2>\n      <p>Metal hardware can be recycled locally; textiles can be repurposed into sensory accessories. Contact us for a prepaid shipping label.</p>\n    ",
    "category": "Concierge",
    "readTime": "3 min read"
  }
];
