import { forwardRef, Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEntity } from './../../role/entities/role.entity';
import { UserEntity } from './../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Roles } from '../enum/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{

    const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
      }
      
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    const microservice: string = request.user.microservice;

    return this.authService.profile(user.id, microservice).then((user: UserEntity) => {
        let hasPermission: boolean = false;
        let role: RoleEntity[] = user.roles;
        role.forEach((userRole) => {
            const hasRole = roles.indexOf(userRole.role);
            if (hasRole != -1) {
                hasPermission = true;
            }
        })
        return user && hasPermission;
    });
  }
}