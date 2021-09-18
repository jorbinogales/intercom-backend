import { ApiBody } from '@nestjs/swagger';

export const UploadFileNestjs = (
    image?: string,
    icon?: string,
    screenshots?: string): MethodDecorator => (
    target: any,
    propertyKey,
    descritor: PropertyDescriptor,
) => {
        ApiBody({
        schema: {
            type: 'Object',
            properties: {
                [image]: {
                    type: 'string',
                    format: 'binary',
                },
                [icon]: {
                    type: 'string',
                    format: 'binary',
                },
                [screenshots]: {
                    type: 'string',
                    format: 'binary',
                }
            },
        },
    })(target, propertyKey, descritor);
};
