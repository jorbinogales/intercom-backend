import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './../../user/entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req);
    return req.user.id;
  },
);
