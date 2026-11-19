/**
 * Avatars come from DiceBear's free HTTP API (https://www.dicebear.com): a picture is just a URL
 * built from a style and a seed, so nothing is uploaded and the profile only stores that short
 * pair. No account or key is needed, and the API caches every image for a year.
 *
 * Only CC0 styles are offered, so the pictures need no attribution. The public API is free for
 * non-commercial use; if the app ever goes commercial, point AVATAR_API at a self-hosted DiceBear
 * instance - the stored values stay valid.
 */
export const AVATAR_API = "https://api.dicebear.com/10.x";

export const AVATAR_STYLES = [
  { id: "voxel-art", label: "People" },
  { id: "voxel-bot", label: "Robots" },
  { id: "critters", label: "Critters" },
  { id: "clay", label: "Clay" },
  { id: "moods", label: "Moods" },
  { id: "thumbs", label: "Blobs" },
  { id: "sprouts", label: "Sprouts" },
  { id: "pixel-art", label: "Pixel" },
] as const;

export type AvatarStyle = (typeof AVATAR_STYLES)[number]["id"];

/** Extra query options per style. Pixel art is the only one without its own background. */
const STYLE_PARAMS: Partial<Record<AvatarStyle, string>> = {
  "pixel-art": "backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
};

export interface AvatarChoice {
  style: AvatarStyle;
  seed: string;
}

const MAX_SEED_LENGTH = 64;

/** The profile stores an avatar as "style:seed", e.g. "voxel-bot:Atlas". */
export const formatAvatar = ({ style, seed }: AvatarChoice): string => `${style}:${seed}`;

/** Reads a stored avatar back; anything unknown or malformed means "no avatar", never an error. */
export const parseAvatar = (value?: string | null): AvatarChoice | null => {
  if (typeof value !== "string") return null;
  const separator = value.indexOf(":");
  const style = value.slice(0, separator);
  const seed = value.slice(separator + 1);
  if (separator < 1 || !seed || seed.length > MAX_SEED_LENGTH) return null;
  return AVATAR_STYLES.some((item) => item.id === style) ? { style: style as AvatarStyle, seed } : null;
};

export const avatarUrl = ({ style, seed }: AvatarChoice): string => {
  const extra = STYLE_PARAMS[style];
  return `${AVATAR_API}/${style}/svg?seed=${encodeURIComponent(seed)}${extra ? `&${extra}` : ""}`;
};

/** The first batch for every style. Fixed, so the picker opens on the same faces every time. */
export const STARTER_SEEDS = [
  "Atlas", "Bolt", "Flex", "Rocky", "Titan", "Nova",
  "Blaze", "Turbo", "Comet", "Echo", "Zen", "Sprint",
];

/** A fresh batch for the shuffle button. Seeds are random strings, never anything about the user. */
export const randomSeeds = (count = STARTER_SEEDS.length): string[] =>
  Array.from({ length: count }, () => Math.random().toString(36).slice(2, 10));
