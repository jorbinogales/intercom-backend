import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientsModuleAsyncOptions, Transport } from "@nestjs/microservices"

export const GatewayOptions: ClientsModuleAsyncOptions = [
    {
        name: 'MICRO-ADMIN',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            console.log(configService.get<string>('MICRO_ADMIN_HOST'))
            return {
                name: 'MICRO-ADMIN',
                transport: Transport.TCP,
                options: {
                    host: configService.get<string>('MICRO_ADMIN_HOST'),
                    port: configService.get<number>('MICRO_ADMIN_PORT'),
                },
            }
        }
    },
    {
        name: 'MICRO-DEV',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
             console.log(configService.get<string>('MICRO_DEV_HOST'))
            return {
                name: 'MICRO-DEV',
                transport: Transport.TCP,
                options: {
                    host: configService.get<string>('MICRO_DEV_HOST'),
                    port: configService.get<number>('MICRO_DEV_PORT'),
                },
            }
        }
    }
];