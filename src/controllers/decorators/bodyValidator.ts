import 'reflect-metadata';
import { metadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(metadataKeys.validator, keys, target, key);
    };
}
