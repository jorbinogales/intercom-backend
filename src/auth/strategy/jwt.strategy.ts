import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hkjlghaskjghaskjhgaka',
            idField: 'id',
            usernameField: 'email',
            passwordField: 'password',
        })
    }
    
    async validate(payload: any) {
        console.log(payload);
        return {
            id: payload.id,
            email: payload.email,
            password: payload.password,
        }
    }
}