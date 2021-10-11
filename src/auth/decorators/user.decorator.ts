import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserEntity } from './../../user/entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.id;
  },
);
