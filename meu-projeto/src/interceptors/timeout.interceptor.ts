import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler) {

        const response = context.switchToHttp().getResponse();

        const ms = this.reflector.get<number>('request-timeout', context.getHandler() || context.getClass());

        response.setTimeout(ms || 60000);

        return next.handle();

    }

}