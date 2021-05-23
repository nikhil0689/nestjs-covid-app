import { Injectable } from '@nestjs/common';
import { Last7Days } from './models/last7days.model';
import { Meta } from './models/meta.model';
import { Today } from './models/today.model';
import { Total } from './models/total.model';
import { StateRepository } from './state.repository';

@Injectable()
export class StateService {
  constructor(readonly stateRepo: StateRepository) {}

  async getStateData(state: string): Promise<Total> {
    const allStatesData = await this.stateRepo.getStateTotalData();
    if (allStatesData === null) {
      return null;
    }
    const stateEnumValue = States[state];
    console.log('state value from enum for ', state, 'is', stateEnumValue);
    const total: Total = allStatesData[stateEnumValue].total;
    const stateMeta: Meta = allStatesData[stateEnumValue].meta;
    console.log('stateMeta: ', stateMeta);
    const stateToday: Today = allStatesData[stateEnumValue].delta;
    console.log('stateToday: ', stateToday);
    const stateLast7Days: Last7Days = allStatesData[stateEnumValue].delta7;
    total.metaData = stateMeta;
    total.today = stateToday;
    total.last7Days = stateLast7Days;
    return total;
  }

  async getDistrictData(state: string, district: string): Promise<Total> {
    const allStatesData = await this.stateRepo.getStateTotalData();
    if (allStatesData === null) {
      return null;
    }
    const stateEnumValue = States[state];
    const districtEnumValue = Districts[district];
    const getDistrictData =
      allStatesData[stateEnumValue].districts[districtEnumValue];
    const stateMeta: Meta = getDistrictData.meta;
    const stateToday: Today = getDistrictData.delta;
    const stateLast7Days: Last7Days = getDistrictData.delta7;
    getDistrictData.metaData = stateMeta;
    getDistrictData.today = stateToday;
    getDistrictData.last7Days = stateLast7Days;
    return getDistrictData;
  }
}

export enum States {
  karnataka = 'KA',
  maharashtra = 'MH',
}

export enum Districts {
  bagalkote = 'Bagalkote',
  bengaluru = 'Bengaluru Urban',
}
