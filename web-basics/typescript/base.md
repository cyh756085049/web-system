## TypeScript

## 理解

TypeScript = JavaScript + 类型 + Babel

## 工具的配置和使用

### vsCode 工具使用配置

* Ctrl(Command) + Shift + P 打开命令面板，找到「打开工作区设置（Open Workspace Settings）」这一项。
* 在打开的设置中输入 typescript，筛选出所有 TypeScript 有关的配置，点击左侧的"TypeScript"，这里才是官方内置的配置。
* 补全搜索词，使用“typescript inlay hints”。
* 推荐开启的配置项主要是这几个：
    - Function Like Return Types，显示推导得到的函数返回值类型；
    - Parameter Names，显示函数入参的名称；
    - Parameter Types，显示函数入参的类型；
    - Variable Types，显示变量的类型。

### 线上代码工具

TypeScript 官方提供的 [TypeScript Playground](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fplay)

## 原始类型与对象类型

### 原始类型

对于原始类型的类型标注使用 `: 类型` 的语法来实现，这里的类型其实也就是 string / number / boolean：

```ts
const name: string = 'ramona';
const age: number = 18;
const flag: boolean = true;
```

### 对象类型

* #### 数组类型

在 TypeScript 中有两种方式可以描述一个数组类型，`Array<数组类型>` 或 `数组类型[]`，这两种方式没有明显的区别，获得的类型提示都是完全一致的，仅仅取决于你想把数组成员的类型写在前还是后

```ts
const names1: string[] = [];
const names2: Array<string> = [];
```

* #### 对象类型

对于对象类型，我们需要首先使用 TypeScript 的语法，先编写一个 interface，即接口，然后再使用这个接口来作为对象类型变量的类型标注。(类型java中类属性的定义和赋值使用)。

> 可选标识：interfance 中的属性加 ? 可表示被标记成了一个可选的属性，也就是说变量即使不具有该属性，也可以认为是符合了接口类型的。

```ts
interface User {
  name: string,
  age: number,
  isLogin?: boolean,
}

const user: User = {
  name: 'ramona',
  age: 18,
  isLogin: true,
}
```

**接口的属性类型可以是任意有效的类型**，它当然也还可以又是一个接口；当接口加上数组类型，就可以描述一个成员是对象的数组类型：

```ts
// 接口类型
interface JobModel {
  // ...
}

interface Job {
  currentModel: JobModel;
}

// 对象数组类型
const userList: User[] = [
  {
    name: 'ramona',
    age: 18,
    isLogin: true,
  },
  {
    name: 'raymond',
    age: 20,
    isLogin: false,
  },
]
```

#### 常量定义-枚举

```ts
function generate() {
  return Math.random();
}

enum UserLevelCode {
  Visitor = 10001,
  NonVIPUser, // 可自动累加值，值为 10002
  VIPUser, // 10003
  Admin = 10010,
  Mixed = 'Mixed',
  Random = generate(),
  // ... 
}
```

* 枚举相比于使用对象，枚举能够提供清晰的提示，甚至可以看到这个枚举成员的值。对于这种数字类型的值，枚举能够自动累加值。

* 枚举中可以同时支持数字、字符串、函数计算等成员。

## 函数类型

在 JavaScript 中，函数有函数表达式与函数声明两种写法：

```js
const handler = function (args) {}; // 普通函数表达式
const handler = (args) => {}; //  箭头函数表达式

function handler(args) { }; // 函数声明
```

函数声明与函数表达式的一个重要区别在于，函数声明是允许调用写在声明之前的，从这个角度看，函数表达式就像是声明了一个变量，在执行到这里时才完成了函数的创建，然后在下面的代码里才能够调用。而函数声明则是向当前作用域做了广播：这里有一个 handler 函数，欢迎你随时随地调用我。

**我们是如何使用函数的？**

传递给函数需要的入参-函数进行计算-使用函数的返回值，这个过程我们作为外部调用方，真正关注的也就只有入参与返回值。也就是说，其实我们只需要对这两个地方进行类型描述即可。

### Typerscript 中的函数类型

* 参数后使用 `:类型` 语法标注这个参数的类型
* 参数块和函数体之间使用 `:类型` 语法标注函数的返回值类型。

#### 有返回值的函数

```ts
// 函数声明
function sum(a: number, b: number): number {
  return a + b;
}

// 函数表达式
const sum = function(a: number, b: number) { // 普通函数表达式
  return a + b;
}
const sum = (a: number, b: number) => { // 箭头函数表达式
  return a + b;
}
```

对于函数表达式的写法，还可以使用 `const sum:函数类型=` 的方式进行类型标注，标识像变量类型标注的语法一样。

```ts
// 类型别名
type Sum = (a: number, b: number) => number; // 函数
type name = string; // 变量
```

需要注意的是，使用类型别名保存函数类型时，我们的写法是 `(a: number, b: number) => number;`而不是 `(a: number, b: number): number;`。现在我们就可以使用这个类型来作为函数表达式类型了：

```ts
type Sum = (a: number, b: number) => number;

const sum: Sum = function(a, b) {
  return a + b;
}
```

上述写法无需再为表达式中的参数和返回值标注类型，TypeScript 会自动地将类型 Sum 中的参数类型与返回值类型和后面的函数表达式匹配起来。

#### 无返回值的函数

在 JavaScript 的函数中，如果没有显式的 return 语句，那么这个函数的执行结果实际会是 undefined，但在 TypeScript 中，我们需要将这个函数的返回值类型标注为 void 而不是 undefined。因为在 TypeScript 中，undefined 也被视为一个有意义的类型。因此如果你希望将返回值类型标注为 undefined，就需要有显式的 return 语句：

```ts
function handler(): void: {}
function hanflerUndefined(): undefined {
  return;
}
```

> 在 5.1 版本中，TS 对这个不符直觉的问题进行了修正，即允许了 undefined 作为无显式 return 语句函数的返回值类型，但考虑到发布时间较晚，因此还是有必要了解这个问题的。

### Typerscript 中的函数重载[？]

在 JavaScript 中，如果一个函数可能存在多种入参组合，比如我们有一个 sum 函数，它接受两个参数，基于参数类型的不同，它会执行不同的逻辑并返回不同的值，如下示例：

```js
function sum(x, y) {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else if (Array.isArray(x) && typeof y === 'number') {
    return x.map((num) => num + y);
  } else if (typeof x === 'number' && Array.isArray(y)) {
    return y.map((num) => num + x);
  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) {
      throw new Error('Arrays must have the same length');
    }
    return x.map((num, index) => num + y[index]);
  } else {
    throw new Error('Invalid arguments');
  }
}

console.log(sum(2, 3)); // 5
console.log(sum([1, 2, 3], 4)); // [5, 6, 7]
console.log(sum(5, [1, 2, 3])); // [6, 7, 8]
console.log(sum([1, 2, 3], [4, 5, 6])); // [5, 7, 9]
console.log(sum('a', 'b')); // Error: Invalid arguments
console.log(sum([1, 2, 3], [4, 5])); // Error: Arrays must have the same length
```

这就是函数重载的概念，它指的就是根据不同的入参匹配不同的实际逻辑，实现一个函数名走天下。但对于调用方就不明白这些参数到底接受啥类型？排列组合是怎样的？

为了解决这个问题，TypeScript 支持了类型层面的重载，比如上面的例子可以这么写：

```ts
function sum(base: number, incre: number): number;
function sum(baseArray: number[], incre: number): number[];
function sum(incre: number, baseArray: number[]): number[];
function sum(baseArray: number[], increArray: number[]): number[];
function sum(x: number | number[], y: number | number[]): number | number[] { }
```

## Class 类

### 面向过程和面向对象

* 面向对象强调对象的封装、组合与交互。
* 面向过程强调程序的执行流程。

下面通过一个代码示例来观察一下面向对象和面向过程的编写方式，如下计算一个圆形的面积和周长。

```js
// 面向对象的方式---------------------
class Circle {
  constructor(radius) {
    // 要描述圆形，最重要的一个属性就是半径
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
  
  getCircumference() {
    return 2 * Math.PI * this.radius;
  }
}

const circle = new Circle(5);

console.log(`面积为：${circle.getArea()}， 周长为：${circle.getCircumference()}.`);

// 面向过程的方式---------------------
function getArea(radius) {
  return Math.PI * radius ** 2;
}

function getCircumference(radius) {
  return 2 * Math.PI * radius;
}

const radius = 5;
console.log(`面积为：${getArea(radius)}， 周长为：${getCircumference(radius)}.`);
```

### class 类回顾

js中ES6引入的 class 类是基于原型继承机制实现，本质是function构造函数，可以看做一个语法糖，让对象原型的写法更加清晰、更像面向对象编程语法。

#### 类基本结构

* **constructor（构造器）**：类的默认方法，也被称为构造方法、构造函数，创建类对象时被调用，一个类中有且只有一个构造方法，在 new 类() 时执行。
* **原型方法**：不需要使用 function 关键字，直接在类中编写方法即可，通过【对象.原型方法】调用。
* **静态方法**：使用 static 修饰，调用时不需要创建对象，直接通过【类名.静态方法】调用，不能通过类的实例来调用。非静态方法中，不能直接通过 this 关键字来访问静态方法，需要用类名来调用，或者用构造函数的属性来调用该方法。

```js
class Person {
  constructor(name) {
    this.name = name;
    console.log('构造方法，使用new创建对象时调用');
  }
  
  say(word) {
    console.log(`${this.name} say ${word}`);
  }
  
  static sum(num1, num2) {
    console.log(num1 + num2);
  }
}

const person = new Person('jack'); // 构造方法，使用new创建对象时调用
person.say('hello world'); // jack say hello world
Person.sum(1, 2); // 3
person.sum(1, 2); // 报错 Uncaught TypeError: person.sum is not a function
```

#### ES5 构造函数和ES6类的区别

```js
// 构造函数实现
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.eat = function(food) {
  console.log(`${this.name}喜欢吃${food}`);
}

Person.say = function(word) {
  console.log(word);
}

var person = new Person('jack', 18);
person.eat('烤串'); // jack喜欢吃烤串
Person.say('hello world'); // hello world
person.say('hello'); // 报错 Uncaught TypeError: person.say is not a function

// 类实现
class Person {
  constructor(name， age) {
    this.name = name;
    this.age = age;
  }
  
  eat(food) {
    console.log(`${this.name}喜欢吃${food}`);
  }
  
  static say(word) {
    console.log(word);
  }
}

const person = new Person('jack', 18);
person.eat('烤串'); // jack喜欢吃烤串
Person.say('hello world'); // hello world
person.say('hello'); // 报错 Uncaught TypeError: person.say is not a function
```

类和构造函数输出结果一致，如下：

![image-20240428144159078](/Users/ramonachen/Library/Application Support/typora-user-images/image-20240428144159078.png)

类本质就是一个构造函数，类可以看做是一个语法糖，让对象原型的写法更加清晰、更像面向对象编程语法。

#### 类的继承

* 使用 extends 关键字实现继承
* 子类可以继承父类中的所有方法和属性，如静态方法和原型方法
* 子类的构造方法中必须有 super() 来置顶调用父类的构造方法，并且位于子类构造方法中的第一行。
* 子类如果有与父类相同的方法和属性，将会优先使用子类的。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    console.log('父类构造器');
  }
  
  getDesc() {
    return `${this.name} at ${this.age} years old`;
  }
  
  static say(word) {
    console.log('say' + word);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类构造器，必须存在，且位于类构造器的第一行位置
    this.grade = grade;
    console.log('子类构造器');
  }
  
  getStudentInfo() {
    console.log(`${this.name}处于${this.grade}年级`);
  }
}

const student = new Student('jack', 13, 3);
student.getDesc(); // jack at 13 years old
student.getStudentInfo(); // jack处于3年级
Student.say('hello world'); // say hello world
```

#### class类优势

* **封装**，它将一个对象相关的所有属性和方法封装在 Class 内部，供外界进行交互。
* **继承**，通过对已知对象的一层层扩展，我们能够构建出清晰的关系链，大大减少重复属性的编写，获得更简洁与易于维护的代码。

### Typescript 中的 class 类

```ts
class Person {
  private name: string; // 私有属性，只能在类的内部访问
  private age: number;

  constructor(personName: string, personAge: number) {
    this.name = personName;
    this.age = personAge;
  }

  public getDesc(): string {
    return `${this.name} at ${this.age} years old`;
  }
  
  public getName(): string {
    return this.name;
  }

  public getUpperCaseName(): string {
    return this.name.toLocaleUpperCase();
  }
}

const person = new Person("ramona", 18);
console.log(person.getDesc()); // ramona at 18 years old
console.log(person.getName()); // ramona
console.log(person.getUpperCaseName()); // RAMONA
```

在上述代码示例中，使用private将属性标记为私有，只能在类内部访问，使用 public 关键字提供公共方法，可以让外界获取。

类似于函数，Class 中的方法也支持重载，语法也完全一致。

```ts
class Person {
  feedPet(catFood: CatFood): void;
  feedPet(dogFood: DogFood): void;
  feedPet(rabbitFood: RabbitFood): void;
  feedPet(food: CatFood | DogFood | RabbitFood): void {}
}
```

此外，还可以通过 **class  + static  静态方法** 作为公共方法引用的使用方式，将一批功能类似的方法收拢到一个 class 内部：

```ts
// 创建
export class DateUtils {
  static isSameDate(){ ... }
  static diffDate(){ ... }
}
                      
// 使用
import { DateUtils } from './utils';
DateUtils.isSameDate();
```

## 万能类型

### any 类型

在我们不知道对一个变量提供何种类型时，就可以使用 any 类型来作为临时性的过渡方案，用法和其他类型一致。但这样设置相当于放弃类型检查，想做什么就做什么。

any 类型 = 万能类型 + 放弃类型检查

```ts
const arr: any[] = [1, 'hello', true];
const x: any;
const obj: any = {
  prop1: 'string',
  prop2: false,
}
function test(param: any): any { ... }
```

但有时我们不想要放弃类型检查，因此，typescript 提供了一个类似的类型: unKnown

### unKnown 类型

unknown 类型，用于表示万能类型的同时，保留类型检查。

```ts
function handler(param: unknown) {
	params.forEach(item => {
    // ...
  })
}

handler({});
handler([]);
handler(true);
```

但这样处理后，当我们要在函数中使用 unknown 定义的参数进行一些操作时，类型检查系统会阻止我们，它会要求我们提供一个具体的类型后才操作，此时就要用到**类型断言**，如下示例：

```ts
function handler(param: unknown) {
  (param as unknown[]).map(item => item = (item as number) + 1;)
}

function handler(param: unknown) {
  (param as number[]).map(item => item = item + 1;)
}
```

这两种方式使用起来并没有明显的差异，但第二种一步步断言的方式更能体现类型断言的意义：一个变量最开始是未知的类型，但随着后续的一步步使用，我们通过类型断言慢慢地完善这个类型的轮廓，最后完成对初始类型的定义。

### 总结

* 使用 any 类型会丧失类型检查的保护，可以对变量进行任意操作，虽然可以通过类型断言保障，但缺少了类型告警。
* 使用 unknown 类型，虽然我们每进行一次操作都需要进行类型断言，断言到当前我们预期的类型，但这却能实现类型信息反向补全的功能。

### 断言

我们知道，初始提供 any / unknown 类型，然后通过类型断言将其断言到预期类型的操作。实际上，还可以将拥有具体类型的变量断言到 any / unknown 类型。因为很多时候，你面临的项目中并不会是完全没有类型定义的，这些变量可能最开始也是被维护者精心设计了类型的，但随着项目的不断迭代和维护者的更替，它们才日渐年久失修，导致你在使用这些变量时需要面对大量的类型报错。所以这个时候我们就可以请出类型断言，先将其断言到一个万能类型，然后就重复我们上面学习的，随着一步步调用不断完善类型，然后最后回头补全的过程。

如下面示例：

```ts
interface IUser {
  name: string;
  job?: IJob;
}

interface IJob {
  title: string;
}

const user: IUser = {
  name: 'foo',
  job: {
    title: 'bar',
  },
};

const { name, job = {} } = user;
const { title } = job; // 类型“{}”上不存在属性“title”。
```

由于我们在第一次解构赋值时，为 job 提供了一个空对象作为默认值，TypeScript 会认为此时 job 的类型就是一个空对象，所以我们在第二次解构赋值时，就无法从 job 上获得 title 属性了。要解决这个问题，我们可以在第一次解构赋值时将这个空对象断言到预期的类型：

```ts
const { name, job = {} as IJob } = user;
const { title } = job;
```

## 类型别名/联合类型/交叉类型

### 类型别名 type

在 TypeScript 中，类型别名可以存储一个类型，后续你可以直接引用它即可。比如使用类型别名可以存储一个函数类型，也可以使用类型别名替换interface接口，实现对对象类型的复用，如下代码示例：

```ts
// 函数类型别名
type Handler = () => void;
type Sum = (a: number, b: number) => number;

const handler: Handler = () => {};
const sum: Sum = (a, b) => {
  return a + b;
}

// 对象类型别名
type User = {
  name: string;
  age: number;
  job?: string;
}
const user: User = {  /* ... */  }

type Params = {
  id: number,
  name?: string,
}

function async(params: Params): any {
  ...
}
```

### 联合类型（或逻辑 |）

```ts
const id = number | string;
```

它所表示的或逻辑，只要你的变量满足其中一个类型成员，就可以被认为满足这个类型，因此你的变量可以在后续被赋值为其它的类型成员。联合类型对其中的类型成员并没有限制，你可以混合原始类型，字面量类型，函数类型，对象类型等等等等

#### 使用场景

* 字面量类型

```ts
type Status = 'success' | 'failure';
type Code = 200 | 404 | 502;
```

类比到原始类型 string，我们知道被标记为 string 类型的变量只能被赋值为字符串，换句话说，所有的字符串值都属于 string 类型。那么这就显得过于宽泛了，如果我们希望将变量类型约束在几个特定的字符串值之间呢？就比如上面的类型别名 Status，就能表达“这个变量是字符串类型”和“这个变量只能是'success'和'failure'两个字符串”这两个概念。而组成 Status 的这两个“值”，其实就是字面量类型，比如你也可以用字面量类型来作为类型标注，能够为我们提供更精确的类型信息与类型提示。

```ts
const status: Status = 'success';
```

* 接口组合的联合类型

```ts
interface VisitorUser {}
interface CommonUser {}
interface VIPUser {}
interface AdminUser {}

type User = VisitorUser | CommonUser | VIPUser | AdminUser;

const user: User = {
  // ...任意实现一个组成的对象类型
}
```

### 交叉类型（与逻辑 &）

交叉类型的本质就是表示一个同时满足列出的类型，所以如果你交叉两个对象类型，可以理解为是一个新的类型内部合并了这两个对象类型。

```ts
interface UserBasicInfo {}
interface UserJobInfo {}
interface UserFamilyInfo {}

type UserInfo = UserBasicInfo & UserJobInfo & UserFamilyInfo;
```

联合类型与交叉类型也可以一起使用。

### 【QA】类型别名 type 和 interface 区别是什么?

在定义对象类型时，两者并没有什么不同。type 可以用来定义所有类型，interface 只能用来定义对象类型，type 和interface在使用场景上二者应该是包含与被包含的关系。

## 泛型

TypeScript 在 JavaScript 对值进行编程的能力之上，又给予了你对类型进行编程的能力。

在绝大部分编程语言中，函数都是一个非常重要的概念，如果缺少了函数，我们的代码可能会变得冗长晦涩，到处夹杂着重复的片段。而**在函数中，最重要的概念则是参数**，参数是一个函数向外界开放的唯一入口，随着入参的差异，函数可能也会表现出各不相同的行为。这一节我们要学习的概念**「泛型」，其实本质就是类型世界中的参数**。

我们知道类型别名能够充当一个变量，存档一组存在关联的类型，除此之外，类型别名还能充当函数的作用：

```ts
type Status<T> = 'pending' | 'success' | 'failure' | T;
type CompleteStatus = Status<'offline'>;
//等价于
type CompleteStatus = 'pending' | 'success' | 'failure' | 'offline';
```

Status 就像一个函数，它声明了自己有一个参数 T，即泛型，并会将这个参数 T 合并到自己内部的联合类型中。

在 TypeScript 中，变量与函数都由类型别名来承担，而一个类型别名一旦声明了泛型，就会化身成为函数，此时严格来说我们应该称它为「工具类型」。

### 使用场景

我们先回到 JavaScript 中的函数，想象我们有一个这样的函数，它的出参与入参类型是完全一致的，比如给我个字符串，我就返回字符串类型，如果是数字，就返回数字类型，此时如何对这个函数进行精确地类型标注呢？

```ts
function factory(input: string | number): string | number {
  // ...
}
```

如上如果使用联合类型，会导致你丢失「出参与入参类型完全一致」这个信息，在你使用这个函数时，它只会提醒你返回值可能有字符串和数字，而不会根据你当前的入参给出唯一匹配的那个出参，其次，假设随着需求变更，可能的入参又会多出很多类型。

此时，这种场景，我们就需要使用泛型T：

```ts
function factory<T>(input: T): T {
  // ...
}
```

`<T>`是声明了一个泛型，而参数类型与返回值类型标注中的 T 就是普通的类型标注。这里的整体意思是：factory 函数有一个泛型 T，当你的函数获得一个入参时，会**根据这个入参的类型自动来给 T 赋值，然后同时作为入参与返回值的实际类型**！

## 类型声明

类型声明这个概念在 TypeScript 中，需要专门的 `.d.ts` 文件来进行书写，这里的 d 即是 declaration 声明之意。

概括地说，类型声明文件就是一种不包括任何实际逻辑，仅仅包含类型信息，并且无需导入操作，就能够被 TypeScript 自动加载的文件。也就是说，如果定义了类型声明文件，即使你都不知道这个文件放在哪里了，其中的类型信息也能够被加载，然后成为你开发时的类型提示来源。

```ts
/ CSS modules
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
```

除了模块声明以外，还有一种常见的声明是对变量的声明。比如你在 TS 文件中写个 window，然后尝试访问这个 window 的类型：

```ts
declare var window: Window & typeof globalThis;

interface Window {
  // ...
}
```

会跳转到了 lib.dom.d.ts 文件，其中使用 declare var 这么个语法对 window 变量进行了类型声明。declare var 这个语法称为变量类型声明，而 `lib.xxx.d.ts` 文件称为内置类型声明文件，它们是由 TypeScript 官方维护并提供的，用于描述 JavaScript 这门语言内置的顶级对象、方法以及 DOM API 等等的类型声明文件。

总结来说：

* 类型声明文件 `.d.ts`：是一种不包括任何实际逻辑，仅仅包含类型信息，并且无需导入操作，就能够被 TypeScript 自动加载的文件。
* 内置类型声明文件 ` lib.xxx.d.ts`：由 TypeScript 官方维护并提供的，用于描述 JavaScript 这门语言内置的顶级对象、方法以及 DOM API 等等的类型声明文件。如 declare var 这个语法称为变量类型声明。

### tsc 编译

当我们使用 TypeScript 自带的编译器 tsc 编译一个 TS 文件时，它不仅仅会产生 JS 文件，还会产生一个 .d.ts 文件—也就是我们上面说到的类型声明文件。举例来说，这么一个 TS 文件：

```ts
export const name: string = 'ramona';
export function handler(input: string): void { };

export interface IUser {
    name: string;
    age: number;
}

export const users: IUser[] = [];
```

会被编译为一个 JS 文件和一个声明文件：

```ts
// xx.js
export const name = 'linbudu';
export function handler(input) { };
export const users = [];

// xx.d.ts
export declare const name: string;
export declare function handler(input: string): void;
export interface IUser {
    name: string;
    age: number;
}
export declare const users: IUser[];

```

也就是说，在从 TS 编译到 JS 的过程中，类型并不是真的全部消失了，而是被放到了专门的类型声明文件里。为什么要这么设计？当然是为了和上面 npm 包类型定义一样的效果，也就是在别人是使用 JS 代码调用你的编译产物时，既可以保证直接能够运行，又可以通过类型声明提供完整的类型信息。

## 内置工具类型

TypeScript 内置了一批简单的工具类型，它们就是类型别名的使用方式，同时在全局可用，无需导入。

### Partial[对象类型处理]

**它接收一个对象类型，并将这个对象类型的所有属性都标记为可选**，这样我们就不需要一个个将它们标记为可选属性了。

```ts
type User = {
  name: string;
  age: number;
  email: string;
};

type PartialUser = Partial<User>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

// 可以不实现全部的属性了！
const partialUser: PartialUser = {
  name: 'John Doe',
  age: 30
};

```

### Required[对象类型处理]

使用方式与 Partial 完全一致，但其是**将对象类型的所有属性都标记为必选。**

```ts
type User = {
  name?: string;
  age?: number;
  email?: string;
};

type RequiredUser = Required<User>;

const user: User = {
  name: 'John Doe'
};

// 现在你必须全部实现这些属性了
const requiredUser: RequiredUser = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};
```

### readonly[对象类型处理]

用于将属性标记为只读，类似于 Partial，TypeScript 中也内置了一个用于将对象类型所有属性标记为只读的工具类型 Readonly。

```ts
type User = {
  name: string;
  age: number;
  email: string;
};

type ReadonlyUser = Readonly<User>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

const readonlyUser: ReadonlyUser = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

// 修改 user 对象的属性
user.name = 'Jane Doe';
user.age = 25;
user.email = 'jane.doe@example.com';

// 修改 readonlyUser 对象的属性
// readonlyUser.name = 'Jane Doe';  // 报错
// readonlyUser.age = 25;  // 报错
// readonlyUser.email = 'jane.doe@example.com';  // 报错

```

需要注意的是，TypeScript 内置的工具类型中，并不包括与 Readonly 结对出现的版本，你可以认为，**只读通常是一个不可逆的行为**，如果能够随意将只读修饰移除，就可能破坏了只读带来的安全性。同时，不同于可选与必选，我们最开始获得的类型输入基本不会携带 readonly 修饰。

### Record[对象类型处理]

TypeScript 中基于索引签名类型提供了一个简化版本 Record，用于声明一个内部属性键类型一致、键值类型也一致的对象类型。

```ts
type UserProps = 'name' | 'job' | 'email';

// 等价于你一个个实现这些属性了
type User = Record<UserProps, string>;

const user: User = {
  name: 'John Doe',
  job: 'fe-developer',
  email: 'john.doe@example.com'
};
```

也可以使用 Record 类型来声明属性名还未确定的接口类型。

```ts
type User = Record<string, string>;

const user: User = {
  name: 'John Doe',
  job: 'fe-developer',
  email: 'john.doe@example.com',
  bio: 'Make more interesting things!',
  type: 'vip',
  // ...
};
```

### Pick[对象类型处理]

Pick 类型**接收一个对象类型，以及一个字面量类型组成的联合类型**，这个联合类型只能是由对象类型的属性名组成的。它会**对这个对象类型进行裁剪，只保留你传入的属性名组成的部分**。

```ts
type User = {
  name: string;
  age: number;
  email: string;
  phone: string;
};

// 只提取User中的 name、age
type UserBasicInfo = Pick<User, 'name' | 'age'>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  phone: '1234567890'
}

const userBasicInfo: UserBasicInfo: UserBasicInfo = {
  name: 'ramona',
  age: 18,
}
```

### Omit[对象类型处理]

入参和 Pick 类型一致，但效果却是相反的—它会**移除传入的属性名的部分，只保留剩下的部分作为新的对象类型**：

```ts
type User = {
  name: string;
  age: number;
  email: string;
  phone: string;
};

// 只移除 phone 属性
type UserWithoutPhone = Omit<User, 'phone'>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  phone: '1234567890'
};

const userWithoutPhone: UserWithoutPhone = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};
```

### Exclude【差集】

```ts
type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address';
type RequiredUserProps = 'name' | 'email';

// OptionalUserProps = UserProps - RequiredUserProps
type OptionalUserProps = Exclude<UserProps, RequiredUserProps>;

const optionalUserProps: OptionalUserProps = 'age'; // 'age' | 'phone' | 'address';
```

### Extract【交集】

```ts
type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address';
type RequiredUserProps = 'name' | 'email';

type RequiredUserPropsOnly = Extract<UserProps, RequiredUserProps>;

const requiredUserPropsOnly: RequiredUserPropsOnly = 'name'; // 'name' | 'email';
```

### 函数类型内置工具

Parameters：参数类型

ReturnType：返回值类型

```ts
type Add = (x: number, y: number) => number;

// 或者我们只有一个函数，而并没有这个函数类型，此时可以使用 TypeScript 提供的类型查询操作符 typeof 来获得一个函数的结构化类型，再配合工具类型
const addHandler = (x: number, y: number) => x + y;
type Add = typeof addHandler; // (x: number, y: number) => number;

type AddParams = Parameters<Add>; // [number, number] 类型
type AddResult = ReturnType<Add>; // number 类型

const addParams: AddParams = [1, 2];
const addResult: AddResult = 3;

// ahooks 的 useMemoizedFn 部分实现代码
type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;
```

Awaited：异步函数类型

```ts
const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello, World!");
  }, 1000);
});

type PromiseInput = Promise<string>;
type AwaitedPromiseInput = Awaited<PromiseInput>; // string

// 也可以直接嵌套在 ReturnType 内部使用
// 定义一个函数，该函数返回一个 Promise 对象
async function getPromise() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
}

type Result = Awaited<ReturnType<typeof getPromise>>; // string 类型
```

## 模版字符串类型

TS 中提供了“模板字符串类型”这么一个能力，类似于模板字符串，它可以实现对字面量类型的计算，以及批量生成字符串类型的能力。

首先，模板字符串类型的语法和模板字符串完全一致，包括定义与内部的计算插槽：

```ts
type Name = 'ramona';
type Greeting = `hello, ${Name}`; // "hello, ramona"
```

在类型检查方面，模板字符串类型可以提供更为精确的字符串类型结构描述，比如此前，我们无法检查一个字符串是否满足 `1.2.3` 这样结构的版本号格式，而使用模板字符串类型后，便可以精确检测：

```ts
type Version = string;
const v1: Version = '1.1.0';
const v2: Version = '1.0'; // 没有检查出不符合预期结构

// 模版字符串
type Version = `${number}.${number}.${number}`;
const v1: Version = '1.1.0';
const v2: Version = '1.0'; // 报错：类型 "1.0" 不能赋值给类型 `${number}.${number}.${number}`
const v3: Version = 'a.0.0'; // 报错：类型 "a.0" 不能赋值给类型 `${number}.${number}.${number}`
```

函数类型别名和模板字符串类型也可结合使用：

```ts
type SayHello<T extends string | number> = `Hello ${T}`;

type Greet1 = SayHello<"ramona">; // "Hello ramona"
type Greet2 = SayHello<10>; // "Hello 10"
```

与 JavaScript 中的模板字符串不同的是，模板字符串类型的诞生不仅是为了实现字面量类型的拼接，还有一个重要的能力是其**自动分发**的特性，即当一个模板字符串类型中的插槽传入了联合类型时，这个模板字符串类型会自动被扩展为使用所有联合类型的组合。

```ts
type Brand = 'iphone' | 'xiaomi' | 'honor';
type SKU = `${Brand}-latest`; // "iphone-latest" | "xiaomi-latest" | "honor-latest"
```

如上，我们在插槽中传入了一个联合类型，模板字符串类型自动地遍历所有可能的联合类型成员，进行计算后再重新合并回联合类型，因此我们得到了一个新的联合类型。

那如果说我们有多个插槽都被传入了联合类型呢？这个时候，我们就得到了一个由所有联合类型的可能分支进行排列组合。

```ts
type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

type SKU = `${Brand}-${Memory}-${ItemType}`;
```

![image-20240429113946335](/Users/ramonachen/Library/Application Support/typora-user-images/image-20240429113946335.png)

## Typescript 配置

ts配置按照配置的能力来划分，可以分为产物控制、输入与输出控制、类型声明、代码检查几大类。如下是一个配置文件：

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5", // 控制产物语法的 ES 版本
    "lib": ["ES2015"], // target 指定 ES5,但你又希望使用 es6 中才有的 Promise 语法，此时就需要在 lib 配置项中新增 'es2015.promise'，来告诉 TypeScript 你的目标环境中需要启用这个能力，否则就会得到一个错误
    "module": "CommonJs", // 使用的模块（CommonJs / ES Module）
    "include": ["src"], // 表示编译包括哪些文件
    "outdir": "dist", // 要存放输出文件的文件夹
    "declaration": true, // 控制是否生成 .d.ts 文件, 如果禁用的话你的编译产物将只包含 JS 文件，与之相对的是 emitDeclarationOnly，如果启用，则只会生成 .d.ts 文件，而不会生成 JS 文件,如果两个都不想要，可以使用 noEmit！启用后将不会输出 JS 文件与声明文件，但类型检查能力还是能保留的
    "moduleResolution": "node", 
    "jsx": "react",
    "noImplicitAny": false, // 当 TypeScript 无法推断出你这个变量或者参数到底是什么类型时，它只能默默给一个 any 类型,
    "noUnusedLocals": true, // 检查你的代码中是否有声明了但没有被使用的变量/函数
    "noUnusedParameters": true, // 检查你的代码中是否有声明了但没有被使用的变量/函数
    "noImplicitReturns": true, // 启用这个配置项会要求你的函数中所有分支代码块都必须有显示的 return 语句，
    "strictNullChecks": true,
    "esModuleInterop": true,
    "downlevelIteration": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@ahooksjs/use-url-state": ["./packages/use-url-state/src/index.ts"]
    },
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "declaration": false,
    "strictNullChecks": true,
    "importHelpers": true
  },
  "exclude": ["node_modules", "lib", "es", "dist", "example"] // 剔除掉不需要的文件
}
```

最后是检查相关的配置，即你看到的 no-XXX 格式的规则，我们简要介绍下其中主要的部分：

- noImplicitAny，当 TypeScript 无法推断出你这个变量或者参数到底是什么类型时，它只能默默给一个 any 类型。如果你的项目维护地还比较认真，可以启用这个配置，来检查看看代码里有没有什么地方是遗漏了类型标注的。
- noUnusedLocals 与 noUnusedParameters，类似于 ESLint 中的 `no-unused-var`，它会检查你的代码中是否有声明了但没有被使用的变量/函数。是否开启同样取决于你对项目质量的要求，毕竟正常情况下项目中其实不应该出现定义了但没有消费的变量，这可能就意味着哪里的逻辑出错了。
- noImplicitReturns，启用这个配置项会要求你的函数中所有分支代码块都必须有显示的 return 语句，我们知道 JavaScript 中不写 return （即这里的 Implicit Returns）和只写一个简单的 return 的效果是完全一致的，但从类型层面来说却不一致，它标志着你到底是没有返回值还是返回了一个 undefined 类型的值。因此，启用这个配置项可以让你确保函数中所有的分支都有一个有效的 return 语句，在那些分支层层嵌套的情况下尤其好用。













































