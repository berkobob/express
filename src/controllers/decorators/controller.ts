import express, { NextFunction, Request, Response } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { metadataKeys } from './MetadataKeys';

function bodyValidator(keys: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }

        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(
                metadataKeys.path,
                target.prototype,
                key
            );
            const method: Methods = Reflect.getMetadata(
                metadataKeys.method,
                target.prototype,
                key
            );

            const middlewares =
                Reflect.getMetadata(
                    metadataKeys.middleware,
                    target.prototype,
                    key
                ) || [];

            const requiredBodyProps =
                Reflect.getMetadata(
                    metadataKeys.validator,
                    target.prototype,
                    key
                ) || [];

            const validator = bodyValidator(requiredBodyProps);

            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    validator,
                    routeHandler
                );
            }
        }
    };
}
