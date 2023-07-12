import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserName } from './model/user.schema';
import { TelegramModule } from 'nestjs-telegram';
import { ConfigService } from '@nestjs/config';
import { AdminName, AdminSchema } from './model/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserName, schema: UserSchema, collection: UserName },
      { name: AdminName, schema: AdminSchema, collection: AdminName },
    ]),
    TelegramModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        botKey: configService.get('BOT_TOKEN')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
