/**
 * 从T中抽取除P列表之外的key。包括如下约束：
 *  1. 当P为缺省时，抽取所有索引签名类型之外的key，这种情况下结果应该是全部的字面类型key。
 *
 * @typeParam T - 要抽取key的类型
 * @typeParam P - 要排除的key的类型，默认为PropertyKey
 * @returns 从T中抽取除P列表之外的key
 */
type Keys<T, P = PropertyKey> = keyof {
    /**
     * @internal
     * @remarks
     * 使用条件类型和映射类型，根据P是否为T的key，来决定是否排除该key。
     */
    [k in keyof T as
        true extends (P extends k ? true : never) ? never : k]: any
};

/**
 * 从T中抽取索引签名key
 *
 * @typeParam T - 要抽取索引签名key的类型
 * @returns 从T中抽取索引签名key
 */
type Signs<T> = Exclude<keyof T, Keys<T>>;


