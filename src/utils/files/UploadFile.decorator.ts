import { ApiBody } from '@nestjs/swagger';

export const uploadFile = (picture: string = 'file', icon: string = 'file'): MethodDecorator => (
    target: any,
    propertyKey,
    descritor: PropertyDescriptor,
) => {
    ApiBody({
        schema: {
            type: 'Object',
            properties: {
                [picture]: {
                    type: 'string',
                    format: 'binary',
                }
            },
        },
    })(target, propertyKey, descritor);
};
