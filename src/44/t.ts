/**
 * 从T中抽取除P列表之外的key。包括如下约束：
 *  1. 当P为缺省时，抽取所有索引签名类型之外的key，这种情况下结果应该是全部的字面类型key。
 * @template T - 目标类型
 * @template P - 排除的key列表，缺省时为PropertyKey
 * @typedef {keyof T} Keys
 */
type Keys<T, P = PropertyKey> = keyof {
    [k in keyof T as
        true extends (P extends k ? true : never) ? never : k]: any
};

/**
 * 从T中抽取索引签名key
 * @template T - 目标类型
 * @typedef {Exclude<keyof T, Keys<T>>} Signs
 */
type Signs<T> = Exclude<keyof T, Keys<T>>;
