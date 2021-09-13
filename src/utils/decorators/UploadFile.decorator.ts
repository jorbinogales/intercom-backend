import { ApiBody } from '@nestjs/swagger';

export const UploadFileNestjs = (
    image: string = 'image',
    icon: string = 'icon',
    screenshots: string = 'screenshots'): MethodDecorator => (
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
