---
title: 深入理解Typescript
author: ccy
date: '2023-04-12'
showAccessNumber: true
categories:
  - Typescript
tags:
  - Typescript
  - 类型编程
---

# 概念

- <font color="orange">因为 TS 是鸭子类型系统，只要两个对象结构一致，就认为是同一种类型，而不需要两者的实际类型有显式的继承关系。</font>

- 父子类型

  > - 在类型系统中，属性更多的类型是子类型。
  >
  >   ```ts
  >   type A = {
  >       fn1() {}
  >   }
  >   type B extends A {
  >   	fn2() {}
  >   }
  >   type C = B extends A ? true : false; // true B的属性更多，因此为子类
  >   ```
  >
  > - 在集合论中，属性更少的集合是子集。
  >
  >   ```ts
  >   type A = 1 | 2 | 3
  >   type B = 1 | 2 | 3 | 4
  >   type C = A extends B ? true : false // true A、B是联合类型，看似B的属性更多,但按集合论，B的范围更广，因此是父类，A的范围更具体
  >   ```
  >
  > **小结**
  >
  > - 父类型比子类型更宽泛，涵盖的范围更广，而**子类型比父类型更具体**
  >
  > - 子类型一定可以赋值给父类型
  >
  >   ```ts
  >   /* 
  >   	如联合类型,父类范围更广，如果是一个具体的类型且是子类没有的，那么子类就不一定可以赋值给父类
  >   */
  >   ```
  >
  > [参考](https://zhuanlan.zhihu.com/p/422196078)

## 分布式条件类型

**前提：** 了解父子类型，区分好集合上和类型上的区别

当使用了`extends`结合三元运算符时，就会变为分布式条件类型，如下

```ts
type A = 'a' | 'b';
type tool<T> = T extends 'b' ? 'b' : 'c';
// 第一个不符合返回c，
type C = tool<A> = ('a' extends 'b' ? 'b' : 'c') | ('b' extends 'b' ? 'b' : 'c') = 'c' | 'b';
```

## 协变与逆变

```ts
class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

type DogFactory = (dog: Dog) => Dog

function makeAnimalBark(fn: DogFactory) {
  const dog = DogFactory(new Dog())
  dog.bark()
}
```

- 考虑`Corgi/Animal` -> `Corgi/Animal` 这样的类型，排列组合一下几种情况：

- `makeAnimalBark`的`DogFactory`要求传入一个函数，返回类型和参数都是`Dog`，因此`makeAnimalBark`内部如果调用这个函数参数可能会将其当成`Dog`类使用

- 如果实际传入 `Corgi -> Corgi`类型的函数，调用这个函数时，传入符合`Dog`的参数，返回值是`Dog`类型，不会出错，但这个函数参数内部可能使用的逻辑是符合`Dog`类，但并不属于柯基类的，因此不安全。（`makeAnimalBark`函数内部逻辑固定，调用函数参数传入`Dog`类）

- 如果实际传入`Animal -> Animal`类型的函数，调用时传入`Dog`类没问题，但返回值时`Animal`类，不一定拥有`Dog`的方法，不安全

- 如果实际传入`Corgi -> Animal`类型的函数，实际调用时传入`Dog`类，返回`Animal`，此时函数参数内部和返回值调用都可能出问题。

- 如果实际传入`Animal-> Corgi`类型的函数，实际调用时传入`Dog`类，返回`Corgi`，是没问题的。

- <font color="orange">按照正确的检查逻辑（上面的四种情况检查），函数的参数类型应该使用逆变的方式来进行检查，而返回值类型则是协变。</font>

  ```ts
  (Animal → Corgi) ≼ (Dog → Dog)
  ```

> **函数声名方式**
>
> <font color="orange">以下两种声名方式推荐第二章，通过开启`strictFunctionTypes`得到更加严格的类型校验</font>
>
> ```ts
> interface BseMethod {
>   func(args: any): number
> }
>
> interface BaseProperty {
>   func: (args: any) => number
> }
> ```

### <font color="orange">函数逆变例子</font>

```ts
// 对于非函数
let animals: Animal = []
let dogs: Dog = []
animals = dogs //是安全的
```

```ts
// 对于函数
let visitAnimal = (animal: Animal) => void;
let visitDog = (dog: Dog) => void;
visitDog = visitAnimal;		// 安全的，visitDog需要狗为参数，执行的逻辑却只需要包含动物的属性就行
visitAnimal = visitDog		// 不安全的，visitAnimal需要animals为参数，执行的逻辑却需要包含狗
```

## 为什么函数参数是默认是双向可变的

[官方说明](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant)

> 我们希望在编写 TS 代码时，以下代码 TS 会提示报错，而不是运行时才报错。但实际上 TS 并没有报错。这是由于类型系统中缺少明确的协变/逆变注释而导致的不可靠。
>
> ```ts
> function trainDog(d: Dog) { ... }
> function cloneAnimal(source: Animal, done: (result: Animal) => void): void { ... }
> let c = new Cat();
>
> // Runtime error here occurs because we end up invoking 'trainDog' with a 'Cat'
> cloneAnimal(c, trainDog);
> ```
>
> **以数组为例说明为什么要双向可变**
>
> ```ts
> function checkIfAnimalsAreAwake(arr: Animal[]) { ... }
>
> let myPets: Dog[] = [spot, fido];
>
> // Error? Can't substitute Dog[] for Animal[]?
> // 函数对动物进行操作，狗属性多于动物，因此没问题
> checkIfAnimalsAreAwake(myPets);
> ```
>
> ```yaml
> Back to the first question. When the type system decides whether or not Dog[] is a subtype of Animal[], it does the following computation (written here as if the compiler took no optimizations), among many others:
> ```
>
> <img src="https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303121730211.png" alt="image-20230312173017052" style="zoom:80%;" />
>
> [图源](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant)
>
> <font color="orange">函数参数协变出现在推到过程中，得出结论可以</font>
>
> - 以上代码应该不会报错，因为狗是属于动物的。
> - 由此推出 `Dog -> T ≤ Animal -> Dog` 再推 `[].push(Dog) ≤ [].push[Animal]` 再推 `Dog -> T ≤ Animal -> T`
> - 但实际上函数参数需要是逆变的，如果 TS 强制逆变，就反推出 `Animal [] = Dog[]` 不成立

### 为什么函数参数是逆变的才安全

如下一个函数，接收一个函数作为参数，这个函数接收两个参数，但实际调用时，即使传入的函数只接受一个参数，TS 也不会提示报错。

```ts
function handler(arg: string) {
  // ....
}

function doSomething(callback: (arg1: string, arg2: number) => void) {
  callback('hello', 42)
}

// Expected error because 'doSomething' wants a callback of
// 2 parameters, but 'handler' only accepts 1
doSomething(handler)
```

# FAQ

### Why are functions with fewer parameters assignable to functions that take more parameters?

为什么`(arg1) => void` 可分配给 `(arg1, arg2) => void`

> ```ts
> function handler(arg: string) {
>   // ....
> }
>
> function doSomething(callback: (arg1: string, arg2: number) => void) {
>   callback('hello', 42)
> }
>
> // Expected error because 'doSomething' wants a callback of
> // 2 parameters, but 'handler' only accepts 1
> doSomething(handler)
> ```
>
> 以上代码不会报错，这符合可替换性原则。因为函数参数调用时，尽管会接收多个参数，但实际使用的函数参数内部逻辑仍是按他原本逻辑调用的，可以忽略额外的参数。

### Why are functions returning non-`void` assignable to function returning `void`?

为什么 `() => any` 可分配给 `() => void`

> ```ts
> function doSomething(): number {
>   return 42
> }
>
> function callMeMaybe(callback: () => void) {
>   callback()
> }
>
> // Expected an error because 'doSomething' returns number, but 'callMeMaybe'
> // expects void-returning function
> callMeMaybe(doSomething)
> ```
>
> 实际上以上代码不会出错，根据可替换性原则，这是个有效替换。另外即使有返回值，不去处理也不会产生安全问题。-也符合函数返回值协变。

# 通过类实现接口

## 不在接口内使用 new 关键字

```ts
interface IHuman {
  name: string
  age: number
  walk(): void
}
```

```ts
class Human implements IHuman {
  // 使用public修饰会自动执行赋值操作 this.name = name;
  public constructor(public name: string, public age: number) {}

  walk(): void {
    console.log('I am walking')
  }
}
```

## 直接在接口使用关键字

```ts
interface HumanConstructor {
  new (name: string, age: number): void
}
```

```ts
// 以下直接继承实现会报错
class Human implements HumanConstructor {
  public constructor(public name: string, public age: number) {
    this.name = name
    this.age = age
  }

  walk(): void {
    console.log('I am walking...')
  }
}
```

<font color="orange">这是因为当一个类实现接口时，指挥对实例部分进行编译检查，类的静态部分不会被编译，因此需要通过实现类的静态部分</font>

```ts
interface IHuman {
  name: string
  age: number
  walk(): void
}

class Human implements IHuman {
  public constructor(public name: string, public age: number) {
    this.name = name
    this.age = age
  }

  walk(): void {
    console.log('I am walking...')
  }
}
// 当需要以传入整个类时，才会用到HumanConstructor
function createHuman(
  constructor: HumanConstructor,
  name: string,
  age: number
): IHuman {
  return new constructor(name, age)
}

const man = createHuman(Human, 'tom', 18)
```

# 注释

TS 注释类型分为三种

TypeScript classifies comments into three different types:

- Leading comment : a comment before a node followed by newline.
- Trailing comment : a comment after a node and in the same line as the node.
- Detached comment : a comment that is not part of any node such as copyright comment.

```
/*! Top-of-file copyright comment is a detached comment */

/* Leading comments of the function AST node */
function foo /* trailing comments of the function name, "foo", AST node */ () {
  /* Detached comment */

  let x = 10;
}
```

# 关键字

## keyof

> ```ts
> // 修饰一个数组，会拿到索引联合类型
> const arr = ['a', 'b', 'c'];
> type TArr = keyof; 			// 0 | 1 | 2
> ```

## infer extends

```

```
