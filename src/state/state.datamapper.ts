import { Total } from './models/total.model';
import { StateDTO } from './state.response.dto';

export class StateMap {
  static toStateDTO(entity: Total): StateDTO {
    if (entity === null) {
      return null;
    }
    console.log('entityL ', entity);
    const {
      confirmed,
      deceased,
      other,
      recovered,
      tested,
      vaccinated,
      metaData,
      today,
      last7Days,
    } = entity;
    return {
      confirmed,
      deceased,
      other,
      recovered,
      tested,
      vaccinated,
      metaData,
      today,
      last7Days,
    };
  }
}
