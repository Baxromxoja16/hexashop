import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get("goods/count")
  findAll() {
    return this.statisticsService.countGoods();
  }

  @Get('goods/last')
  findOne() {
    return this.statisticsService.findLastWeekGoods();
  }

}
