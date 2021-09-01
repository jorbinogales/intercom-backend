import { ClientsModuleOptions, Transport } from "@nestjs/microservices"

export const GatewayOptions: ClientsModuleOptions = [
    {
        name: 'MICRO-ADMIN',
        transport: Transport.TCP,
        options: {
            host: '127.20.20.2',
            port: 4000,
        },
    },
    {
        name: 'MICRO-DEV',
        transport: Transport.TCP,
        options: {
            host: '127.30.30.3',
            port: 5000,
        },
    },
];