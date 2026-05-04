import { describe, expect, it, vi } from "vitest";
import { isValidSlug, normalizeSlug } from "./slug";

describe("normalizeSlug", () => {
  it("keeps valid slugs", () => {
    expect(normalizeSlug("lg-leads-anti-drug-padyatra")).toBe(
      "lg-leads-anti-drug-padyatra",
    );
    expect(isValidSlug("lg-leads-anti-drug-padyatra")).toBe(true);
  });

  it("normalizes invalid slugs and warns", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(normalizeSlug("Bad Slug: HERE")).toBe("bad-slug-here");
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
