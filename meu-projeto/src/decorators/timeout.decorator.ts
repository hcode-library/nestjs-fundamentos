import {applyDecorators} from '@nestjs/common';
import { SetMetadata, UseInterceptors } from '@nestjs/common/decorators';
import { TimeoutInterceptor } from '../interceptors/timeout.interceptor';

const SetTimeout = (ms: number) => SetMetadata('request-timeout', ms);

export function Timeout(ms: number = 60000){
    return applyDecorators(
        SetTimeout(ms),
        UseInterceptors(TimeoutInterceptor)
    )
}