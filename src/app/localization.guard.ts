import { inject } from '@angular/core';
import { CanActivateFn, GuardResult } from '@angular/router';
import { map } from 'rxjs';
import { LocalizationService } from 'src/app/pages/shared/localization.service';

export const localizationGuard: CanActivateFn = (route, state) => {
  const localizationService = inject(LocalizationService);

  return localizationService.getRedirectPath().pipe(
    map<string | null, GuardResult>((redirectPath) => {
      if (redirectPath) {
        localizationService.redirectToPath(redirectPath);
        return false;
      }
      return true;
    }),
  );
};
