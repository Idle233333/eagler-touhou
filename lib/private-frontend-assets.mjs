import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const project = resolve(fileURLToPath(new URL("..", import.meta.url)));

// Quick-chat voice clips are host-recorded wav files. Wavs are forbidden in the
// published tree (.gitignore and scripts/audit-publication.mjs both reject the
// extension), so they ship through this private channel and appear at
// assets/quick-chat/<phrase>.wav only when the host provides them. When a clip
// is absent the Launcher stays silent instead of failing.
const QUICK_CHAT_VOICE_CLIPS = Object.freeze([
  "1",
  "request-life",
  "request-power",
  "share-resources",
  "follow-me",
  "spread-out",
  "stop-fire",
  "bomb-me",
  "bomb-you",
  "leaving",
  "last-game",
  "last",
  "thanks",
  "xxzj",
]);

// Host-private frontend resources are intentionally absent from Git. When
// present, local preview and server assembly publish them at stable URLs; when
// absent, the Launcher hides the corresponding optional control.
export const PRIVATE_FRONTEND_ASSETS = Object.freeze([
  Object.freeze({ source: "private-assets/donation.webp", target: "assets/donation.webp" }),
  ...QUICK_CHAT_VOICE_CLIPS.map(id => Object.freeze({
    source: `private-assets/quick-chat/${id}.wav`,
    target: `assets/quick-chat/${id}.wav`,
  })),
]);

export function privateFrontendAssetSource(target) {
  const entry = PRIVATE_FRONTEND_ASSETS.find(asset => asset.target === target);
  return entry ? resolve(project, entry.source) : null;
}
