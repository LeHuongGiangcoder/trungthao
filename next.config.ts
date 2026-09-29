import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist; anything else is coerced to the
    // nearest entry. 88 is for the engraved invitation card, where the fine
    // line work shows compression artefacts at the default.
    qualities: [75, 88],
  },
};

export default nextConfig;
