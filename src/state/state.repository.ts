import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StateRepository {
  async getStateTotalData(): Promise<any> {
    let response = null;
    try {
      response = await axios.get(
        `https://api.covid19india.org/v4/min/data.min.json`,
      );
    } catch (e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
    }
    const { data } = response;
    return data ?? null;
  }
}
