import { Last7Days } from './models/last7days.model';
import { Meta } from './models/meta.model';
import { Today } from './models/today.model';

export class StateDTO {
  readonly confirmed: number;
  readonly deceased: number;
  readonly other: number;
  readonly recovered: number;
  readonly tested: number;
  readonly vaccinated: number;
  readonly metaData: Meta;
  readonly today: Today;
  readonly last7Days: Last7Days;
}
