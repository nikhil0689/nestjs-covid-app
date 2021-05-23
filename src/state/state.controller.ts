import { Controller, Get, Param } from '@nestjs/common';
import { StateMap } from './state.datamapper';
import { StateDTO } from './state.response.dto';
import { StateService } from './state.service';

@Controller('india/states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':state')
  async getstateData(
    @Param('state') state: string,
  ): Promise<StateDTO | string> {
    const val = await this.stateService.getStateData(state);
    const data = StateMap.toStateDTO(val);
    if (data === null) {
      return 'Data not available';
    }
    return data;
  }

  @Get(':state/:district')
  async getDistrictData(
    @Param('state') state: string,
    @Param('district') district: string,
  ): Promise<StateDTO | string> {
    const val = await this.stateService.getDistrictData(state, district);
    const data = StateMap.toStateDTO(val);
    if (data === null) {
      return 'Data not available';
    }
    return data;
  }
}
