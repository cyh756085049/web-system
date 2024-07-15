### typescript 有哪些数据类型？
在 TypeScript 中，基础数据类型包括以下几种：

1. **Boolean（布尔类型）**：表示逻辑值，只能是 `true` 或 `false`。

2. **Number（数值类型）**：表示所有数字，包括整数和浮点数。

3. **String（字符串类型）**：表示文本数据，使用单引号 `'` 或双引号 `"` 包裹起来的字符序列。

4. **Array（数组类型）**：表示一个元素类型的有序集合。可以通过在元素类型后面添加 `[]` 来表示数组，例如 `number[]` 表示由数字组成的数组。

5. **Tuple（元组类型）**：表示固定长度的数组，每个元素的类型可以是不同的。例如 `[string, number]` 表示一个由一个字符串和一个数字组成的元组。

6. **Enum（枚举类型）**：表示一组数值，默认情况下从 0 开始为元素编号。例如：
   ```typescript
   enum Color {Red, Green, Blue};
   let c: Color = Color.Green;
   ```

7. **Any（任意类型）**：表示任何类型的值，允许在编译时可选择地包含或排除类型检查。适合在编程阶段不清楚类型的情况下使用。

8. **Void（空类型）**：表示没有任何类型。通常用于函数没有返回值时的返回类型。

9. **Null 和 Undefined**：在 TypeScript 中，`null` 和 `undefined` 是所有类型的子类型，可以赋值给其它类型的变量。默认情况下，`null` 和 `undefined` 是所有类型的有效值。

10. **Never**：表示那些永不存在的值的类型。例如，抛出异常或者没有返回值的函数表达式的返回类型就是 `never`。

这些基础数据类型提供了 TypeScript 中数据的基本表示方式和操作方法。

### 常用的内置工具类型有哪些？
TypeScript 中有许多内置的工具类型（Utility Types），它们提供了强大的工具来操作和转换现有的类型。以下是一些常用的内置工具类型：

1. **Partial\<T\>**:
    - 将类型 `T` 中的所有属性转换为可选属性。即，使所有属性在类型定义时都变为可选的。
   ```typescript
   interface Todo {
       title: string;
       description: string;
   }
   
   const partialTodo: Partial<Todo> = {
       title: 'Learn TypeScript'
   };
   ```

2. **Required\<T\>**:
    - 将类型 `T` 中的所有属性转换为必选属性。即，使所有属性在类型定义时都变为必须的。
   ```typescript
   interface Props {
       a?: number;
       b?: string;
   }
   
   const obj: Required<Props> = {
       a: 5,
       b: 'hello'
   };
   ```

3. **Readonly\<T\>**:
    - 将类型 `T` 中的所有属性转换为只读属性。即，使所有属性在类型定义时都变为只能读取，不能修改。
   ```typescript
   interface Point {
       x: number;
       y: number;
   }
   
   const readOnlyPoint: Readonly<Point> = { x: 10, y: 20 };
   ```

4. **Record\<K, T\>**:
    - 创建一个由类型 `K` 中的所有键（key）所指定的类型 `T` 的对象类型。常用于将一个类型的键映射到另一个类型。
   ```typescript
   type PageInfo = {
       title: string;
   };

   const page: Record<string, PageInfo> = {
       'home': { title: 'Home Page' },
       'about': { title: 'About Page' },
   };
   ```

5. **Pick\<T, K\>**:
    - 从类型 `T` 中挑选出部分属性，并组成一个新的类型，这些属性由类型 `K` 中指定。
   ```typescript
   interface Todo {
       title: string;
       description: string;
       completed: boolean;
   }
   
   type TodoPreview = Pick<Todo, 'title' | 'completed'>;
   
   const todo: TodoPreview = {
       title: 'Clean room',
       completed: false,
   };
   ```

6. **Omit\<T, K\>**:
    - 从类型 `T` 中删除指定的属性，并生成一个新的类型。
   ```typescript
   interface Todo {
       title: string;
       description: string;
       completed: boolean;
   }
   
   type TodoWithoutDescription = Omit<Todo, 'description'>;
   
   const todo: TodoWithoutDescription = {
       title: 'Clean room',
       completed: false,
   };
   ```

7. **Exclude\<T, U\>**:
    - 从类型 `T` 中剔除可以赋值给 `U` 的类型。
   ```typescript
   type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
   ```

8. **Extract\<T, U\>**:
    - 从类型 `T` 中提取可以赋值给 `U` 的类型。
   ```typescript
   type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
   ```

9. **NonNullable\<T\>**:
    - 从类型 `T` 中剔除 `null` 和 `undefined`。
   ```typescript
   type T0 = NonNullable<string | number | undefined>;  // string | number
   ```

10. **ReturnType\<T\>**:
    - 获取函数类型 `T` 的返回值类型。
    ```typescript
    type T0 = ReturnType<() => string>;  // string
    ```

这些工具类型可以大大简化复杂类型操作的编写，提高代码的可读性和可维护性。

### ts中常用的两个关键字 类型别名 type 和 interface 区别是什么?
在 TypeScript 中，`type` 和 `interface` 都用于定义自定义类型，但它们之间有一些区别：

1. **type**：

    - `type` 关键字用于创建类型别名，可以给现有的类型起一个新的名字。
    - `type` 可以用来定义任意类型，包括基本类型、联合类型、交叉类型、函数类型等。
    - `type` 可以使用泛型来创建参数化类型。
    - `type` 可以使用 `extends` 关键字来扩展现有类型。

   示例：

   ```typescript
   type Point = {
       x: number;
       y: number;
   };
   
   type Coordinates = [number, number];
   
   type Action<T> = (value: T) => void;
   
   type ExtendedPoint = Point & { z: number };
   ```

2. **interface**：

    - `interface` 关键字用于创建接口，可以用来描述对象的形状。
    - `interface` 主要用于定义对象的结构，不能定义基本类型、联合类型等。
    - `interface` 可以被类实现（implements），用于约束类的结构。
    - `interface` 可以使用 extends 关键字来继承其他接口。

   示例：

   ```typescript
   interface Point {
       x: number;
       y: number;
   }
   
   interface Shape {
       color: string;
       area(): number;
   }
   
   interface NamedPoint extends Point {
       name: string;
   }
   ```

总的来说，`type` 主要用于创建类型别名，可以用于定义任意类型；而 `interface` 主要用于定义对象的结构，可以被类实现，并且支持继承其他接口。在实际使用中，可以根据需求选择合适的方式来定义自定义类型。