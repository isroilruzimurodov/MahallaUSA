import { isMissing } from "@/content/site";

/** Placeholders are visible while developing and hidden on the live site. */
export const showPlaceholders = process.env.NODE_ENV !== "production";

/** True when a site fact should be shown: it is filled in, or we are developing. */
export function has(value: string) {
  return showPlaceholders || !isMissing(value);
}
