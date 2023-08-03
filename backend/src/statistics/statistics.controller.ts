import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AdminGuard, PublicFromAdmin } from 'src/auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get('count')
  countAllCollections() {
    return this.statisticsService.allCount();
  }

  @Get('goods/last')
  findLastWeekGoods() {
    return this.statisticsService.findLastWeekGoods();
  }
}
