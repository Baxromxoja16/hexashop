import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@UseGuards(AdminGuard)
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
