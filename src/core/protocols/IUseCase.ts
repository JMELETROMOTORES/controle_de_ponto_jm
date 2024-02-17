export interface IUseCase<T_PARAMS, T_ENTITY> {
    execute: (data: T_PARAMS) => Promise<T_ENTITY>;
}
