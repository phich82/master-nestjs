import { HttpStatus, Injectable } from '@nestjs/common';
import { JsonResponse } from './JsonResponse';

@Injectable()
export class ApiResponse<T, E> {
  success(data?: T, code: number = HttpStatus.OK): JsonResponse<T, E> {
    return {
      success: true,
      code,
      data,
    };
  }
  error(errors?: E, code: number = HttpStatus.BAD_REQUEST): JsonResponse<T, E> {
    return {
      success: false,
      code,
      errors,
    };
  }
}
