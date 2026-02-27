// =====================
// MicroDSI · Tracks
// =====================
const TRACKS = [
  { id: "itsm", name: "ITSM Triage" },
  { id: "hr",   name: "HR" },
  { id: "proc", name: "Procurement" },
];

function getTrackFromURL() {
  const u = new URL(window.location.href);
  const t = u.searchParams.get("track");
  return TRACKS.some(x => x.id === t) ? t : null;
}
function getTrack() {
  return