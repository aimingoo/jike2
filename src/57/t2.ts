type ObjectDescriptor<D, M> = {
    data: D,
    methods: M & ThisType<D&M>
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>) {
    return { ...desc.data, ...desc.methods };
}

// Q1: 如何使makeObject中的返回类型与data和methods相关？
// Q2: 如何使print中的上下文与data强相关？
// Q3: 如何限制methods中所有方法返回的结果必须是this类型？
let obj = makeObject({
    data: { x: 0, y: 0, T: '' },
    methods: {
        print() {
            console.log(this.x, this.y);  // WARNNING: z 未定义
            return this
        }
    },
});

// case 1
obj.print();

// case 2
console.log(obj);
