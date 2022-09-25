import { useEffect, useState } from "react";
import { RegistrationStep } from "../../types";

const STEPS: RegistrationStep[] = [1, 2, 3];

const useStepGuard = (step: RegistrationStep) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    if (!STEPS.includes(step)) {
      setShouldRedirect(true);
    }
  }, []);

  return shouldRedirect;
};
export default useStepGuard;
