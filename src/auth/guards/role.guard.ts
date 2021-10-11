import { forwardRef, Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from './../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Roles } from '../enum/roles';
import { RoleEntity } from 'src/role/entities/role.entity';

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
    return this.authService.profile(user.id).then((user: UserEntity) => {
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