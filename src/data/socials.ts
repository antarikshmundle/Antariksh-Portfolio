/**
 * Where to find Antariksh elsewhere. Edit this file to add or change links —
 * the Connect section renders whatever is here.
 *
 * `href: null` means the real URL has not been supplied yet. Such entries
 * render as clearly-marked pending rows, never as guessed links.
 */

export type SocialLink = {
  id: string;
  label: string;
  description: string;
  /** Verified destination, or null until supplied. */
  href: string | null;
  /** Opens in a new tab (off for mailto). */
  external?: boolean;
  /** Optional visible handle or address shown under the description. */
  display?: string;
};

const email = "antarikshmundle01@gmail.com";

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    description: "Code, projects and experiments",
    href: "https://github.com/antarikshmundle",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Professional profile",
    href: "https://www.linkedin.com/in/antariksh-mundle",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Visuals, design and updates",
    href: "https://www.instagram.com/am.zero5/",
    external: true,
  },
  {
    id: "spotify",
    label: "Spotify",
    description: "Music and listening",
    href: "https://open.spotify.com/user/31odqtzqldl3vyfpctz4jdjvwc2m",
    external: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    description: "Personal profile",
    href: "https://www.facebook.com/antariksh.mundle/",
    external: true,
  },
  {
    id: "pinterest",
    label: "Pinterest",
    description: "Saved references and inspiration",
    href: "https://pin.it/7hd1yVGhQ",
    external: true,
  },
  {
    id: "x",
    label: "X / Twitter",
    description: "Posts and short updates",
    href: "https://x.com/Antariksh2505",
    external: true,
  },
  {
    id: "reddit",
    label: "Reddit",
    description: "Discussions and communities",
    href: "https://www.reddit.com/user/Plane-Sherbert2431/",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    description: "Direct contact",
    href: `mailto:${email}`,
    display: email,
  },
];
