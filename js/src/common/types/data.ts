export enum OPERATOR {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GREATER_THAN = '>',
    LESS_THAN = '<',
    GREATER_THAN_OR_EQUAL = '>=',
    LESS_THAN_OR_EQUAL = '<='
};
export type ConditionEvent = {
    name: string;
    value: number;
}
export type ConditionData = {
    name: string;
    operator: OPERATOR;
    value: number;
    span?: number;
}
export type RewardData = {
    name: string;
    value: string;
}
export type ConditionAccumulation = {
    all: number,
    rest: number,
    [key: string]: number;
}