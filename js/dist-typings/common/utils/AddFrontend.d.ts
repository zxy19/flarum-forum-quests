export declare function addCondition(key: string, name: string): void;
export declare function addReward(key: string, name: string): void;
export declare function rewardValueConvert(key: string, callback: (value: string) => string): void;
export declare function addRewardSelection(key: string, callback: () => Promise<string>): void;
