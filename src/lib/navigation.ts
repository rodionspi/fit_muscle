/** Primary site navigation, shared by the header, the phone menu and the footer. */
export interface NavItem {
  name: string;
  href: string;
  /** Short line shown under the name in the phone menu. */
  hint?: string;
}

export const MAIN_NAV: NavItem[] = [
  { name: "Muscles", href: "/", hint: "Grid, list and 3D views" },
  { name: "Exercises", href: "/exercises", hint: "Every movement in the library" },
  { name: "Beginner guide", href: "/beginnerGuide", hint: "A weekly plan from five answers" },
  { name: "About", href: "/about", hint: "What the app is for" },
];

/**
 * Whether a nav link points at the current page. The home link also owns the
 * muscle detail pages, since they are reached from the chart.
 */
export const isActivePath = (pathname: string | null | undefined, href: string): boolean => {
  if (!pathname) return false;
  if (href === "/") return pathname === "/" || pathname.startsWith("/muscles");
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const GITHUB_REPO_URL = "https://github.com/rodionspi/fit_muscle";
export const AUTHOR_URL = "https://github.com/rodionspi";
