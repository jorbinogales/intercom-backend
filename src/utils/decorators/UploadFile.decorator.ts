import { ApiBody } from '@nestjs/swagger';

export const UploadFileNestjs = (image: string = 'image', icon: string = 'icon'): MethodDecorator => (
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
                }
            },
        },
    })(target, propertyKey, descritor);
};
