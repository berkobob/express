import 'reflect-metadata';
import { Methods } from './Methods';
import { metadataKeys } from './MetadataKeys';

function routeBinder(method: string) {
    return function (path: String) {
        return function (target: any, key: string, desc: PropertyDescriptor) {
            Reflect.defineMetadata(metadataKeys.path, path, target, key);
            Reflect.defineMetadata(metadataKeys.method, method, target, key);
        };
    };
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
