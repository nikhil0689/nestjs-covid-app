import { Last7Days } from './last7days.model';
import { Meta } from './meta.model';
import { Today } from './today.model';

export class Total {
  confirmed: number;
  deceased: number;
  other: number;
  recovered: number;
  tested: number;
  vaccinated: number;
  metaData: Meta;
  today: Today;
  last7Days: Last7Days;
}
