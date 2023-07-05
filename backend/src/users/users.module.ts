import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserName } from './model/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserName, schema: UserSchema, collection: UserName },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
