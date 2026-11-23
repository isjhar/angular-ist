import { ActiveStatus } from 'src/app/domain/entities/active-status';
import { SelectOption } from 'src/app/pages/shared/view-models/select-option.view-model';

export const ACTIVE_STATUS_LABELS: Record<ActiveStatus, string> = {
  [ActiveStatus.Active]: $localize`:present:Hadir`,
  [ActiveStatus.Inactive]: $localize`:late:Terlambat`,
};

export const ACTIVE_STATUS_OPTIONS: SelectOption<ActiveStatus>[] = [
  {
    value: ActiveStatus.Active,
    label: ACTIVE_STATUS_LABELS[ActiveStatus.Active],
  },
  {
    value: ActiveStatus.Inactive,
    label: ACTIVE_STATUS_LABELS[ActiveStatus.Inactive],
  },
];
