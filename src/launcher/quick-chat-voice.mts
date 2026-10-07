// Voice playback for quick-chat phrases.
//
// The clips are host-recorded wav files served from assets/quick-chat/<id>.wav.
// They are not part of the published tree (the publication audit forbids .wav),
// so a missing clip is an expected state: playback must stay silent and never
// surface an error, and the same clip is fetched once per session.
const clips = new Map<string, HTMLAudioElement>();

export function quickChatVoiceUrl(phraseId: string): string {
  return `assets/quick-chat/${encodeURIComponent(phraseId)}.wav`;
}

export function playQuickChatVoice(phraseId: string): void {
  let clip = clips.get(phraseId);
  if(!clip) {
    clip = new Audio(quickChatVoiceUrl(phraseId));
    clip.preload = "auto";
    clips.set(phraseId, clip);
  }
  try { clip.currentTime = 0; } catch {}
  void clip.play().catch(() => {});
}
