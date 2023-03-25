## 将联合类型转为交叉类型

> ```ts
> type UnionTo<T> = 
> 	(T extends T ? (x: T) => unknow : never ) extends
>         (x: infer R) => unknow
>         ? R : never
> ```
>
> ```ts
> type a = UnionTo<{a: string} | {b: string}> = { a: string } & { b: string };
> 
> // 等同于
> [(x: {a: string}) => unknow | (x: {b: string}) => unknow] extends (x: infer R) => unknow
> = (a: {a: string} | {b: string}) => unknow extends (x: infer R) extends unknow
> // 又因为函数参数是逆变的，右边是父级，因此，R作为父应该是 {a: string} & {b: string}
> ```
>
> - `(T extends T ? (x: T) => unknow : never ) => type Functions= ((x: { a: string }) => any)    | ((x: { b: number }) => any)`
>
> - 解开后便是 
>
>   ```ts
>   (( (x: { a: string }) => any) | ( (x: { b: number }) => any) ) extends (x: infer P) => any ? P : never 
>   ```
>
> - 根据此[PR](https://github.com/Microsoft/TypeScript/pull/21496)，在协变位置同一位置有多个可选参数的，会被推断为联合类型，在逆变位置有多个可选参数的，会被推断为交叉类型
>
> - 又因为`( (x: { a: string }) => any) | ( (x: { b: number }) => any)  => (x: {a: string} | {b: string}) => any` ，此例是属于逆变条件，因此 `infer U` 将被推断为交叉类型
>
>   ```ts
>   {a: stirng} & {b: string}
>   ```
>
> [参考](https://juejin.cn/post/7089343822794227748)





## 在一个类型上扩展属性

```ts
type deepRecord<Obj extends Record<string, any>> = {
    [K in keyof Obj]: Obj[K] extends Record<string, any>
    	? deepRecord<Obj[K]> & Record<string, any>
    	: Obj[K]
} & Record<string, any>
```

## 只能有一个属性为特殊值

- 如只能有一个属性为`desc | asc`，其他为`false`

> **实现**
>
> ```ts
> type GenerateType<Keys extends keyof any> = {
>     [K in Keys]: {
>         [K2 in K]: 'desc' | 'asc'
>     } & {
>         [K3 in Exclude<Keys, K]: false
>     }
> }[Keys]
> 
> // 使用
> type res = GenerateType<'aaa', 'bbb>
> 
> // res 将构成如下类型
> type res = {
>     aaa: {
>         aaa: 'desc' | 'asc'
>         bbb: false
>     }
>     bbb: {
>         aaa: false,
>         bbb: 'desc' | 'asc'
>     }
> }  
> ```
>
> <img src="https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303231624107.png" alt="image-20230323162354859" style="zoom:67%;" />
>
> **解释**
>
> - <font color="orange">与类型系统相反，对于联合类型（集合系统）而言，在数量上类型少的为子，因此 `Keys extends keyof any` 说明`Keys`是任何联合类型子集。</font>
>
> - 最后的`[Keys]` 是使用了`typescripts`的索引类型查询，如下
>
>   ```ts
>   // 上面生成的res通过索引查询
>   res[Keys] = res['aaa' | 'bbb'] = res['aaa'] | res['bbb']
>   ```
>
> **更多例子**
>
> ```ts
> interface Person {
>   name: string;
>   age: number;
>   address: string;
> }
> 
> type DefaultPerson = Record<'name' | 'age' | 'address', string>;
> // DefaultPerson type is { name: string, age: string, address: string }
> ```
>
> ```ts
> // 将一个对象类型的属性值转为目的类型
> // Key extends keyof T 告诉TS属性值来自传入的对象
> type EnsurePropertyIsType<T, Key extends keyof T, Type> = T & 
> 	Record<Key, Type extends T[Key] ? Type : T[Key]>;
> 
> // Example usage:
> interface Person {
>   name: string;
>   age: number;
> }
> 
> type NewPerson = EnsurePropertyIsType<Person, 'age', string>;
> // NewPerson type is { name: string, age: string }
> ```

- 
- 

```ts
type  GenerateType<T extends keyof any> = {
    [K in keyof T]: {
        [K1 in keyof K]: 'desc' | 'Asc'
    } & {
        [K2 in Exclude<T, K1>]: false
    }
}[T]
```

 