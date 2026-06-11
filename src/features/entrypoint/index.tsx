import { EntrypointScreen as EntrypointScreenV1 } from "./v1/entrypoint-screen";
import { LandingPageV2 } from "./v2/landing-page";

/* Flip this off to fall back to the previous landing page (v1). */
const USE_V2_LANDING_PAGE = true;

export function EntrypointScreen() {
  return USE_V2_LANDING_PAGE ? <LandingPageV2 /> : <EntrypointScreenV1 />;
}
