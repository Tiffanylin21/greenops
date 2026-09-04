// v1 serves a single implicit Building (ADR-0002) — no Building management UI yet.
export const BUILDING_ID = "default";

// Per ADR-0003: a fixed UTC offset, not a DST-observing timezone. Uploaded
// timestamps already arrive as this Building's naive local wall-clock time,
// so this value is descriptive metadata only — no conversion is performed
// against it in this ticket.
export const BUILDING_UTC_OFFSET_MINUTES = -300;
