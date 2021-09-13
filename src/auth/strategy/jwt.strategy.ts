import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:'agjalifuqwiougqlgqwlhgqwlhsa'
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