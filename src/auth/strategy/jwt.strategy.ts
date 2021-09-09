import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'yoursecret'
        })
    }
    
    async validate(payload: any) {
        return {
            'id': payload.id,
            'id_azure': payload.id_azure,
            'microservice': payload.microservice,
        }
    }
}