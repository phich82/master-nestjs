export interface JsonResponse<T, E> {
  success: boolean;
  code: number;
  data?: T;
  errors?: E;
}
