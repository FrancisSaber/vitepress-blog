# overview

## 执行顺序

中间件 - 守卫 - [拦截器](https://so.csdn.net/so/search?q=拦截器&spm=1001.2101.3001.7020) / 管道

中间件->守卫->拦截器->管道->控制器->拦截器-

![img](https://docs.nestjs.com/assets/Middlewares_1.png)

<font color="orange">守卫在所有中间件之后执行，但在所有管道和拦截器之前执行</font>

![img](https://docs.nestjs.com/assets/Guards_1.png)

![img](https://docs.nestjs.com/assets/Interceptors_1.png)

![img](https://docs.nestjs.com/assets/Pipe_1.png)

## Controller

### 启动并运行

​		<font color="orange">控制器属于模块，想要使用必须将其引入模块</font>

```ts
@Module({
    controllers: [AppController]
})
```

### Response

​		<font color="orange">当使用`nest`内置方法时，对于对象或数组，`nest`会尝试将其序列化为`json`对象再返回，对于原始数据类型（`string、number`）会直接返回</font>

​		<font color="orange">也可以用`express`库的方式处理返回信息，需要要@Res装饰器处理,当使用了@Res时，必须通过`res.json 或res.send`调用响应对象，否则请求将被挂起。</font>

### 异步

​		`nest`支持异步操作，支持返回`Observable`或`Promise`对象，也可以返回一个普通数据，`nest`可以自动解析 

### 请求头操作

```ts
@Get('rid')
@HttpCode(302)
@Header('Cache-control', 'none')
@Redirect('https://docs.nestjs.com', 302)
getHello(): string {
    return this.appService.getHello();
}
```

**请求方法装饰器填入数组**

```ts
@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) {}
    
    // 请求方法装饰器如果填了数组，用法如下
    // http://xxx/app/xx
    // http://xxx/app/yy
    @Get(['xx', 'yy'])
    getByID() {}
}
```

### 通过特定库操作

```ts
import { Res, Get } from '@nestjs/common';
import { Response } from 'express';

@Controller('cat')
export class {
    @Post()
    create(@Res res: Response) {
        res.status(HttpStatus.CREATED).send({});
    }
    @Post()
    // 使用了请求头装饰器要通过开启passthrough与nest框架兼容
    update(@Res({ passthrough: true }) res: Response) {
        // nest会自动返回响应体，无需手动发送
        res.status(HttpStatus.UPDATE).json({
            message: 'update'
        });
    }
    @Delete()
    delete(@Res res: Response) {
        res.status(HttpStatus.OK);
        // 可以直接return返回体信息
        return '删除成功'
    }
}
```



### 动态路由

```ts
@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}
    
    @Get('app/:id/:age/:name')
}
```

```ts
/*
 * 冒号后面就是动态路由值
 */
GET http://localhost:3000/api/apps:1/2/19 HTTP/1.1
content-type: application/json
```

![image-20230301223222562](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303012232702.png)

****

## module

>   @Module装饰器接受一个对象参数，在Nest源码中是ModuleMetadata接口，它有四个字段，且均是数组类型，分别是：
>
>   imports ：导入其他模块中导出的Providers，以实现共享
>   providers ：模块中所有用到的功能类，模块内共享实用；
>   controllers：控制器
>   exports：导出其他模块需要共享的Providers

### 模块调用

> <font color="orange">一个控制器想要调用其他模块服务</font>
>
> 方式一：将该模块的`service`直接导入自己模块的`providers`数组
>
> 方式二：导入该模块到自己模块的`imports`数组而且该模块的`exports`需要将他的服务导出
>
> <font color="orange">一个非`appModule`想要生效，或者是将自己导入一个非根模块的`imports`内，</font>
>
> 方式一：需要将自己模块导入`appModule`的`imports`数组
>
> 方式二：将自己导入一个非根模块的`imports`数组内，但这个非根模块自身已经导入到了根模块的`imports`数组内

### 模块共享

> 一个模块的服务想被多个模块调用，需要将服务填入装饰器的`exports`数组，其他模块想要使用时，直接将该模块导入
>
> ```ts
> // Cat.module.ts
> @Module({
>     controllers: [CatController],
>     provides: [CatService],
>     exports: [CatService]
> })
> export class CatModule{}
> ```
>
> ```ts
> // other.module.ts
> @Module({
>     imports: [CatModule]
> })
> ```

### 模块重新导出

> ​	一个模块可导入其他模块，也可以将其导入的模块再次导出，以供其他模块使用。
>
> ```ts
> // A.module.ts
> @Module({
>     imports: [CommonModule],
>     exports: [CommonModule]
> })
> export class Amodule {}
> ```
>
> B模块导入A模块之后，B模块也可以调用`CommonModule`的服务
>
> ```ts
> // B.module.ts
> @Module({
>     imports: [BModule],
> })
> export class Bmodule {}
> ```

### 模块类也可以使用provider

​		可能出于配置目的而使用，但模块自身不能作为`providers`，可能会导致循环依赖。

```ts
// xx.module.ts
@Module({
    providers: [XXService]
})
export class XXModule {
    constructor(private XXService: XXService)
}
```

### 全局模块

​		<font color="orange">`Nest`通过`Global`装饰器声名一个可以全局调用的模块</font>

```ts
@Global()
@Module({..})
```

### 动态模块

>  动态模块指模块是可注册配置的，如使用数据库模块。
>
>  ```ts
>  @Global()
>  @Module({})
>  export class ConfigModule {
>   static forRoot(options: string): DynamicModule { 
>       return {
>           module: ConfigModule,
>           providers: [{
>               provide: 'Config',
>               useValue: {shopName: 'test' + options}
>           }]
>       }
>   }
>  }
>  ```
>
>  ```ts
>  // app.module.ts
>  @Module({
>      imports: [
>          // 引入动态模块,引入时传参
>          ConfigModule.forRoot('动态模块')
>      ]
>  })
>  ```
>
>  ```ts
>  // app.controller.ts 使用动态模块
>  @Controller()
>  export class AppController {
>      constructor(
>        @Inject('Config') private config: Object
>      )
>  } 
>  ```
>
>  **例子二**
>
>  ```ts
>  @Module({
>      
>  })
>  export class DataModule {
>      static forRoot(entities = [], options？) {
>          const providers = createXX(options, entities);
>          return {
>              module: DataModule,
>              providers: providers,
>              exports: providers
>          }
>      }
>  }
>  ```
>
>  

​                            



## Providers

​		`Providers`是`nest`的一个基本概念，它是服务的提供者，可以作为依赖项注入。对象可以相互创建各种关系，实例的创建交由`nest`运行时处理。

​		`Injectable`用于表明这个类可被`IoC container`管理

```ts
import { Injectable } from '@nestjs/common';
@Injectable()
export class xxService {}
```

### Provider注册

​		想使用`Provider`需要注册这个服务

```ts
// app.module.ts
@Module({
    controllers: [controllerName]
    providers: [serviceName]
})
```

### 可选 provider

> - <font color="orange">默认情况下，如果依赖注入的对象不存在会提示错误，中断应用运行，此时可以使用`@Optional()`来指明选择性注入，但依赖注入的对象不存在时不会发生错误。</font>
> - 这种情况可能存在于依赖对象是可配置的，如需要判断是否是本地或线上环境，是线上的会返回依赖对象，是本地的不会返回依赖，需要使用后默认信息。
>
> ```ts
> // app.module.ts
> export const isDev = {
>   provide: false ? 'http' : 'local',
>   useValue: false ? 'http' : 'local',
> };
> @Module({
>     providers: [isDev]
> })
> ```
>
> ```ts
> // app.controller.ts
> @Controller()
> export class AppController {
>     constructor(
>     	// 当是本地环境时，不返回http token 此时会报错，因此需要加上optional处理避免报错
>     	@Optional() @Inject('http') private readonly http: string;
>     )
>     url () {
>         return this.http ?? 'local';
>     }
> }
> ```

### 基于属性的注入

> **直接在一个provider内通过inject装饰以属性的方式使用另一个provider**
>
> ```ts
> // unborn.service.ts
> @Injectable()
> export class UnbornService() {
>  private readonly value = 'UnbornService';
> }
> ```
>
> ```ts
> 
> // son.service.ts
> import { UnbornService } from './unborn.service.ts';
> 
> // son service调用了 unborn service的方法，这里也可以通过inject直接注入使用无需实例化
> @Injectable()
> export class SonService() {
>  @Inject(UnbornService)
>  private readonly unborn: UnbornService;
>  
>  method() {
>      return this.unborn.value;
>  }
> }
> ```
>
> ```ts
> @Controller()
> export class AppController {
>  constructor(
>  	private readonly sonService: SonService
>  )
>  test() {
>      return this.sonService.method();  // 输出UnbornService
>  }
> }
> ```
>
> [参考](https://github.com/befabry/caddie/tree/hash_id/packages/backend/src)
>
> **直接在controller内通过inject装饰器以属性方式使用provider**
>
> ```ts
> @Controller()
> export class AppController {
>     // 通过Inject装饰器以属性的方式使用，但服务也需要注入IoC容器
>     @Inject(SonService)
>     private readonly sonService: SonService;
>     
>     test() {
>         this.sonService.method();
>     }
> }
> ```
>
> 

### 自定义Provider令牌及使用

```特殊
@Module({
    providers: [{
    	provide: 'provideName',
    	useClass: serviceName
    }]
})
```

```ts
@Controller()
export class AppController {
    constructor(@Inject('provideName') private readonly p: serviceName) {}
}
```

### 工厂和异步模式

> **工厂模式**
>
> 当一个`provide`需要嵌套调用另一个服务时,如下面的`factory`需要用到其他两个服务，可以通过`inject`传入，届时会被`useFactory`接收
>
> ```ts
> const useFactoryProvide = {
>     provide: 'factory',
>     useFactory: (other1: otherService1，other2: otherService2) => {
>         
>     },
>     inject: [otherService1， otherService2]
> }
> ```
>
> **异步模式**
>
> ```ts
> providers: [{
>     provide: 'sync',
>     useFactory: async () => {
>         const res = await new Promise((resolve) => {
>             resolve(1);
>         })
>         return res;
>     }
> }]
> ```

###  导出自定义供应商

```ts
const connectionFactory = {
    provide: 'CONNECTION',
    useFactory: (optionsProvider: OptionsProvider) => {
        const options = optionsProvider.get();
        return new DatabaseConnection(options);
    },
    inject: [OptionsProvider],
}

@Module({
    providers: [connectionFactory],
    exports: ['CONNECTION'],
})
export class AppModule {}
```



### 手动实例化

- [动态模块引用](https://docs.nestjs.com/fundamentals/module-ref)
- [在bootstrap中获取](https://docs.nestjs.com/standalone-applications)

------



## middleware

### 实现中间件

```ts
import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export class Logger implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...:', req.body);

        // 如果中间件不是最后一个需要执行next方法，否则请求会被挂起
        next();
    }
```



### 使用

  - 需要在module文件使用, 继承`NestModule`类, 类使用`configure`方法

    ```ts
    import { Injectable, NestMiddleware } from '@nestjs/common';
    @Injectable()
    export class ClassName implements NestModule {
    	configure(consumer: MiddlewareConsumer) {
            consumer
              .apply(LoggerMiddleware)
              // 例子0
              .forRoutes('cat')		// 一个参数，路径名
              // 例子1
              .forRoutes(CatsController);
              // 例子2
              forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
        }
    }
    ```

    ```ts
    consumer
      .apply(LoggerMiddleware)
      // 排除某些路由
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
    ```

#### 同时使用多个中间件

```ts
export class XX implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(middleware1(), middleware2(), middleware3())
            .forRoutes(xxx)
    }
}
```

#### 全局中间件

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from 'xx';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(logger); 
    await app.listen(3000);
}
bootstrap();
```

## Exception  filter - 异常过滤器

`Nest comes with a built-in **exceptions layer** which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.`

- `Nest`提供·一个内建的异常层，负责处理程序中所有的未处理异常情况。当一个异常未被你的应用代码处理，会被这个层捕获到，然后自动发送一个恰当的用户友好型的反馈。
- 开箱即用，异常捕获会被`nest`内置异常过滤器，当一个异常既不属于``HttpException` 又不继承于这个类时，`Nest`会自动返回一个500的服务端错误。

### Nest自带过滤器

- `nest`内建了很多HTTP异常，都是继承于`HttpException`类
- `HttpException`
- The `HttpException` constructor takes two required arguments which determine the response: （接受两个参数）
  - The `response` argument defines the JSON response body. It can be a `string` or an `object` as described below.
  - The `status` argument defines the [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

### 定制化异常类

```ts
import { HttpException } from '@nestjs/common';
export class ForbiddenException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN);
    }
}
```

**使用**

```ts
// cat.controller.ts
@Get()
async findAll() {
    throw new ForbiddenException('你干嘛 哈哈哎呀', HttpStatus.FORBIDDEN);
}
```

![image-20230227170138559](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202302271701712.png)

### 自定义异常过滤器

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// 引入Request和Response可以提供类型提示
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        // 设置返回信息
        response
            .status(status)
            .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
```

### 使用过滤器

**方法过滤器**

```ts
// cat.controller.ts
@Get()
@useFilter(filterName)		//使用过滤器
async create(@Body() createCatDto: CreateCatDto) {
	throw new ForbiddenException();
}
```

**contoller过滤器**

```ts
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

**全局过滤器**

```ts
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
```

![image-20230227172850267](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202302271728370.png)

### 使用与平台无关的捕获任何错误

```ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
        exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
```

## Pipe 管道

- <font color="orange">用于对输入数据转化成特定格式</font>
- <font color="orange">验证输入数据</font>
- `nest`内置了多个开箱即用的管道
- 校验出错会被异常捕获器处理

### 使用

```ts
import { ParseIntPipe } from '@nestjs/common';
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
}
```

**传参**

```ts
@Get(':id')
async findOne(
    // 类型错误设置状态码
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
) {
    return this.catsService.findOne(id);
}
```

https://docs.nestjs.com/techniques/validation

### 自定义管道

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

export interface ArgumentMetadata {
    type: 'body' | 'query' | 'param' | 'custom'; // 表示管道用于哪个参数装饰器	
    metatype?: Type<unknown>;				   // 表示参数装饰器处理后最后返回的值类型
    data?: string;							  // 表示给参数装饰器参数值
}
@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}
/*
     @Post('filter')
     @UseFilters(HttpExceptionFilter)
     getFilrer(@Body('flush_num', new CustomPipe()) flush_numxx: boolean) {}
     ArgumentMetadata: {
     	type: Body,
     	metatype: [Function boolean],
     	data: flush_num
     }
 */
```

### 校验方式的两种写法

**基于模式校验**

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';

export class CreateUserDto {
    name: string;
    age: number;
    breed: string;
}

// 校验规则
export const CreateUserSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
});

@Injectable()
export class JoiSchemaPipe implements PipeTransform {
    constructor(private schema: Joi.ObjectSchema) {}
        transform(value: any, metadata: ArgumentMetadata) {
            const { error } = this.schema.validate(value);
            if (error) {
                throw new Error('Method not implemented.');
            }
            return value;
      }
}
```

<font color="orange">`UsePipes` 装饰器从 `@nestjs/common`包导入</font>

```ts
// user.controller.ts 使用基于模式校验管道 方法装饰器
@Controller()
export class User {
    @Post('find')
    @UsePipes(new JoiSchemaPipe(CreateUserSchema))
    findAll(@Body() user: CreateUserDto) {
        return this.loginService.findAll();
    }
}
```

**class validator**

```ts
// User.DTO.ts 规则定义
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
export class CreateLoginDto {
    @IsNotEmpty({
        message: '不允许为空',
    })
    @IsString()
    @Length(5, 10, {
        message: '长度大于5小于10',
    })
    name: string;
    @IsNumber()
    age: number;
}
```

```ts
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateLoginDto } from '../login/dto/create-login.dto';

@Injectable()
export class UserPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        
        // 注意看，这里想要转化的类型化对象可以通过直接外部传入，也可以使用元数据的类型
        const DTO = plainToInstance(metatype, value);
        const res = await validate(DTO);
        if (res.length) {
            throw new HttpException({
                message: res[0].constraints,
            }, HttpStatus.BAD_REQUEST,);
        }
        return value;
    }
}
```

```ts
// 使用
import { UserPipe } from './pipe/user.pipe';

@Controller()
export class User {
    @Get()
    // ArgumentMetadata.metatype = UserDto
    find(@Body(UserPipe) body: UserDto) {} // 参数装饰器
}
```

### 包方法

- `plainToInstance from 'class-transform'` 用于将传入的普通`js`对象转为类型化对象

- `validate from 'class-validator'` 用于校验DTO对象是否通过校验

- 有些校验是异步的

- 使用`plainToInstance`原因：当传入的`post`主体对象从网络请求反序列化时，它没有任何类型信息(这是底层平台(如Express)的工作方式)。类验证器需要使用我们前面为DTO定义的验证装饰器，因此我们需要执行此转换，将传入的主体视为适当装饰的对象，而不仅仅是普通的对象

  ```TS
  export class myPipe implements transformPipe {
      async transform(value: any, metadata: ArgumentMetadata) {
          if (!metatype || !this.toValidate(metatype)) {
              return value;
          }
          const DTO = plainToInstance(metatype, value);
          const error = await validate(DTO);
      }
      // 当前正在处理的参数是原生JavaScript类型时，它负责绕过验证步骤(这些参数不能附加验证装饰器，因此没有理由通过验证步骤运行它们)。
      private toValidate(metatype: Function): boolean {
          const types: Function[] = [String, Boolean, Number, Array, Object];
          return !types.includes(metatype);
      }
  } 
  ```

### 全局作用域管道

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

### 在任意一个模块注册全局管道

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
```

### 管道用于转换类型用例

```ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed');
        }
        return val;
    }
}
```

```ts
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
}
```

**通过管道给定一个默认值**

- `DefaultValuePipe`
- 在解析管道处理之前，通过内置的默认管道，设置了默认值

```ts
@Get()
async findAll(
  @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
  @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
) {
    return this.catsService.findAll({ activeOnly, page });
}
```

**内置管道校验**

[官方文档](https://docs.nestjs.com/techniques/validation)

- `ValidationPipe`

  > ```ts
  > import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
  > class UserInfoDto {
  >  @IsNotEmpty({
  >      message: '不允许为空',
  >  })
  >  @IsString()
  >  @Length(5, 10, {
  >      message: '长度大于5小于10',
  >  })
  >  name: string;
  > }
  > 
  > // 通用管道校验
  > @Get()
  > getById(@Body(ValidationPipe) id: UserInfoDto) {}
  > ```
  >
  > - <font color="orange">内部通过元数据 `ArgumentMetadata`对象的 `metatype` 获取类型化对象校验，这里对应是`UserInfoDto`</font>
  > - `ValidationPipe` 管类可以传入参数选项
  >
  > ```ts
  > import { ValidatorOptions, ValidationError } from 'class-validator';
  > export interface ValidationPipeOptions extends ValidatorOptions {
  >       transform?: boolean;
  >       disableErrorMessages?: boolean;
  >       exceptionFactory?: (errors: ValidationError[]) => any;
  > }
  > ```
  >
  > 例子
  >
  > ```ts
  > app.useGlobalPipes(
  >   new ValidationPipe({
  >     // 自动将纯js对象转为类型化对象
  >     transform: true,
  >     // 自动提出不存在于类型的属性
  >     whitelist: true
  >   }),
  > );
  > ```
  >
  > `nest` 提供了方法可以在同一类型上构建创建和更新变体
  >
  > ```ts
  > export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}
  > ```

  

- `ParseIntPipe` : 整数校验

- `ParseBoolPipe`：布尔校验

- `ParseUUIDPipe`：UUID校验

## Guard 守卫

### 定义

​		管道可决定一个请求是否交由路由处理程序处理，作用于中间件之后，拦截器，管道之前。中间件不知道下个请求将会交由哪个程序处理。

​		守卫可以访问ExecutionContext实例，因此确切地知道接下来要执行什么。它们的设计就像异常过滤器、管道和拦截器一样，让您能够在请求/响应周期的正确位置插入处理逻辑，并且以声明的方式这样做。这有助于保持代码的DRY和声明性。

​		守卫通过实现`canActivate`函数实现，方法要返回一个布尔类型，表示是否要处理当前的请求。

```ts
export interface CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
```

### 用法

​		守卫同过滤器，管道一样，有全局范围、控制器范围、方法范围作用域。

```ts
// 全局
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard(new Reflector()));
```

```ts
@Controller()
@Controller('cats')
@UseGuards(new RolesGuard(new Reflector()))
export class CatsController {}
```

### 定制化管道

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const target = context.getHandler();
        const metadata = this.reflector.get('roles', target);
        const request = context.switchToHttp().getRequest<Request>();
        const respose = context.switchToHttp().getResponse<Response>();
        return true;
    }
}

```

## Interceptors拦截器

### 定义拦截器

```ts
export interface CallHandler {
    // Returns an `Observable` representing the response stream from the route
    handle(): Observable<T>;
}
```

<font color="orange">`CallHandler.handle`返回一个来自路由的`Observale`对象，通过`rxjs`操作</font>

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

@Injectable()
export class TestInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
        return next
          .handle()
          // pipe 可接收任意数量回调函数，再返回之前对数据进行拦截处理
          .pipe()
    }
}
```

### 用法

```ts
@useInterceptors(TestInterceptor);

// 全局
app.useGlobalInterceptors(TestInterceptor);
```



### 超时拦截器

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            // 通过管道在将数据返回去之前进行处理
            timeout(5000),
            
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }),
        );
    };
};
```

## 定制化装饰器

### 定制参数装饰器

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// 如果给装装饰器传参，会被data接收
export const User = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.body.user;
})
```

```ts
@Controller()
export class xx {
    @Get()
    getByUser(@User() user: any) {}
}
```

**自定义装饰器可结合管道**

- `validateCustomDecorators` 需要置为`true`

```ts
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}
```



### <font color=:orange>混合装饰器</font>

通过`applyDecorators`方法一次性使用多个装饰器

```ts
import { applyDecorators } from '@nestjs/common';

export function Auth(...args: string[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
```

```ts
@Controller()
@Auth('teant')
export class XX {}
```



# FUNDAMENTALS 基本原理

## 定制化服务 - Provider

## 异步Provider

```ts
{
    provide: 'ASYNC_CONNECTION',
    useFactory: async () => {
        const connection = await createConnection();
        return connection;
    }
}
```

## 动态模块

当一个模块的`providers`导入了服务时，模块内就可以调用这个服务，但其他模块的想要调用这个模块的服务，需要被调用的模块有导出这个服务。如下，Auth模块想要调用User模块提供的服务。

```ts
// User.module.ts
@Module({
    providers: [UserService],
    exports: [UserService]
})
```

```ts
// Auth.module.ts
@Module({
    imports: [UserModule]
})
```

- <font color="orange">动态模块提供了静态方法API（通常命名为`register、forRoot`），当一个模块想要导入动态模块时，可以在导入时传入配置来定义适配本模块</font>
- <font color="orange">一个模块的静态方法应该返回一个对象具备完全相同的接口，外加一个`module`的属性</font>

### 例子

- 一个`Module`装饰器的`imports`属性不仅可以导入一个模块（类名），也可以导入一个动态模块

- 一个动态模块本身也是一个模块，可以导入其他模块或`provider`到一个动态模块

- ```ts
  import { DynamicModule } from '@nestjs/common';
  
  @Module({
      imports: [ConfigModule.register({ folder: './config' })],
      controllers: [],
      providers: []
  })
  export class AppModule {
      static register(): DynamicModule {
          return {
              module: ConfigModule,
              providers: [ConfigService],
              exports: [ConfigService]
          }
      }
  }
  ```

### Module Configuration

一个完整例子

- 希望实现一个动态模块，可以传入参数，读取哪个配置文件

```ts
// 使用
@Module({
    imports: [ConfigModule]
})
```

```ts
// 定义动态模块
import { DynamicModule } from '@nestjs/common';
@Module({
    providers: [ConfigService]
})
export class ConfigModule{
    static forRegister(options: Record<string, any>): DynamicModule {
        return {
            // 一个动态模块返回一个与静态模块相同的内容
            module: ConfigModule,
            provides: [
                {
                    // provider不仅可以在controller使用，也可以在模块service内使用
                    provide: 'CONFIG_OPTIONS',
                    useValue: options
                },
                ConfigService
            ],
            exports: [ConfigService]
        }
    }
}
```

```ts
// 定义service
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Inject } from '@nestjs/common';
import { EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
	constructor(@Inject('CONFIG_OPTIONS') private options: <Record, any>) {
        const filePath = `${process.env.NODE_ENV || 'development'}.env`;
        const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
        this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    }  
    get(key: string): string {
        return this.envConfig[key]
    }
}
```

### 社区指南

- `register:` 用于配置一些具备具体信息且仅用于调用的模块，例如axios、
- `forRoot:`用于只需配置一次且可被多次复用的动态模块
- `forFeature:` 可能会修改的具体配置的模块调用，如日志

### Nest  配置模块构造器

[文档](https://docs.nestjs.com/fundamentals/dynamic-modules#configurable-module-builder)

> **example**
>
> ```ts
> // interfaces/config-module-options.interface
> export interface ConfigModuleOptions {
>     folder: string;
> }
> ```
>
> ```ts
> // config.module-definition.ts
> import { ConfigurableModuleBuilder } from '@nestjs/common';
> import { ConfigModuleOptions } from './interfaces/config-module-options.interface';
> 
> // 通过内置类实例化一个对象返回
> export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
>   // 传给类的类型是我们调用这个模块静态方法传递的对象类型
>   new ConfigurableModuleBuilder<ConfigModuleOptions>().build();
> ```
>
> ```ts
> // Config.module.ts
> @Module()
> // 扩展ConfigurableModuleClass意味着ConfigModule现在不仅提供了register方法(就像之前的自定义实现一样)，还提供了registerAsync方法，允许消费者异步配置该模块，例如，通过提供异步工厂:
> export class ConfigModule extends ConfigureableModuleClass {}
> ```
>
> ```ts
> @Module({
>   imports: [
>     ConfigModule.forRoot({ folder: './config' }), // <-- note the use of "forRoot" instead of "register"
>   ],
> })
> export class AppModule {}
> ```
>
> 
>
> ```ts
> // Config.service.ts
> @Injectable()
> export class ConfigService {
>     constructor(@Inject(MODULE_OPTIONS_TOKEN) priave options: ConfigModuleOptions)
> }
> ```
>
> **其他操作**
>
> - 定义静态方法名
>
>   ```ts
>   export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
>     new ConfigurableModuleBuilder<ConfigModuleOptions>().setClassMethodName('forRoot').build();
>   ```
>
>   ```ts
>   @Module({
>     imports: [
>       // 也可以forRootSync调用
>       ConfigModule.forRoot({ folder: './config' }),
>   ```
>
> - 定义工厂类选项
>
>   ```ts
>   @Module({
>       imports: [
>           ConfigModule.registerAsync({
>               useClass: ConfigModuleOptionsFactory
>           })
>       ]
>   })
>   export class AppModule{}
>   ```
>
>   ```ts
>   /*
>   	如果一个模块继承于这个类，例如上例，那么ConfigModuleOptionsFactory必须
>   	实现一个createConfigOptions方法，返回一个标准ule
>   */
>   export const { ConfigModuleOptionsFactory, MODULE_OPTIONS_TOKEN  } = 
>         new ConfigurableModuleBuilder<ConfigModuleOptions>().setFactoryMethodName('createConfigOptions').build();
>   ```
>
>   **自定义选项工厂类**
>
>   - 强制如果这个类如果使用工厂函数必须通过类必须返回`must`方法，该方法返回ConfigModuleOptions类型数据
>
>   ```ts
>   export const { ConfigModuleOptionsFactory, MODULE_OPTIONS_TOKEN  } = 
>         new ConfigurableModuleBuilder<ConfigModuleOptions>().setFactoryMethodName('must').build();
>   ```
>
>   ```ts
>   @Module()
>   export class MyCustomModule extends ConfigModuleOptionsFactory{}
>   ```
>
>   ```ts
>   export class must {
>     must() {
>       return { folder: 'folder' };
>     }
>   }
>   imports: [
>   	MyCustomModule.registerAsync({
>           useClass: must,
>       })
>   ]
>   ```
>
>   **继承的类是可以重盖静态方法的**
>
>   ```ts
>   import { Module } from '@nestjs/common';
>   import { ConfigService } from './config.service';
>   import {
>     ConfigurableModuleClass,
>     ASYNC_OPTIONS_TYPE,
>     OPTIONS_TYPE,
>   } from './config.module-definition';
>   
>   @Module({
>     providers: [ConfigService],
>     exports: [ConfigService],
>   })
>   // 需要super调用原先的类方法
>   export class ConfigModule extends ConfigurableModuleClass {
>     static register(options: typeof OPTIONS_TYPE): DynamicModule {
>       return {
>         // your custom logic here
>         ...super.register(options),
>       };
>     }
>   
>     static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
>       return {
>         // your custom logic here
>         ...super.registerAsync(options),
>       };
>     }
>   }
>   ```
>
>   



## 执行上下文

### 反射和元数据方法

```ts
import { SetMetadata } from '@nestjs/common';

@Post()
@SetMetadata('roles', ['admin', 'tenant'])
async create() {}
```

**自定义角色装饰器**

```ts
// role.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Role = (...roles: string[]) => SetMetadata('roles', roles);
```

```ts
@Post()
@Role(['admin', 'tenant'])
async create() {}
```

**获取自定义元数据**

```ts
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard {
    constructor(private reflector: Reflector) {
        
    }
}
```

## 定制化装饰器





# SECURITY

## Authentication 鉴权



## Authorization 授权

## CORS

```TS
// 方式1
const app = new NestFactory.create(AppModule, { cors: true });
await app.listen();
```

```ts
// 方式2
const app = new NestFactory.create(AppModule);
app.enableCors();
```

# TECHNIQUES -技术

## Configuration

一个应用会运行于不同环境，如测试、本地、线上环境。会需要不同配置来适配不同环境。

在`Node.js`中，通常通过`process.env`所定义的环境变量来表示

而在`Nest`中，可以创建一个`ConfigModule`导出一个`ConfigService`加载.`env`文件。`Nest`提供了开箱即用的包，需要单独安装。

```bash
$ pnpm add --save @nestjs/config
```

<font color="orange">通过`ConfigService`使用`ConfigModule`配置</font>

### Start

`ConfigModule`提供了`forRoot`的静态方法，在`imports`内执行后环境变量会被解析，默认是读取根目录下的`.env`文件，并写入到`process.env`内。可以通过`forRoot`选项修改

```ts
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [ConfigModule.forRoot({
        // string | string[] 可读入或指定多个配置文件，可以修改读取路径
        envFilePath: []，
        // 不读取env文件
        ignoreEnvFile: boolean,
        // 是否作为全局模块，开启后其他模块要使用无需导入
        isGlobal: true
    })]
})
```

### 自定义配置文件

允许我们通过函数的方式定义数据，定义的数据将通过`ConfigService`服务拿到

```ts
// root/config/configuration.ts
export default () => ({
  port: 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: 3306
  }
});
```

```ts
import configuration from './config/configuration';
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        })
    ]
})
```

[yaml格式](https://docs.nestjs.com/techniques/configuration#custom-configuration-files)

### ConfigService

- 用法同普通的`service`，但有`import` `ConfigModule`，才能使用，处非开启`isGlobal`为`true`

```ts
// app.controller.ts
@Controller()
export class AppController {
	constructor(private readonly configService: ConfigService) {
        // ConfigService 提供了get方法用于获取定义的值,开启infer会自动进行类型推断
        this.configService.get('database.host', { infer: true })
    }
}
```

### 配置命名空间

```ts
import { registerAs } from '@nestjs/config';
export const MyConfig = registerAs('myConfiguration', () => {
   myHost: 123,
});
```

```ts
import { ConfigType } from '@nestjs/config';
constructor(
	@Inject(MyConfig.KEY)
    private myConfig: ConfigType<typeof ConfigType>
)
```

此章节看到Cache environment variables

## Caching - 超高速缓存

### 安装

```bash
$ pnpm add cache-manager
```

> - `cache-manager version4` TTL(存活事件采用秒)
> - `cache-manager version5` TTL(存活事件采用毫秒)
> - `NestJS` 是采用`version 4`

### In-menory cache - 内存高速缓存

`Nest`为各种 `cache storage providers`提供了统一的API。内置的是内存缓存，也可以替换成`Redis`

**开启缓存**

```ts
import { CacheModule, Module } from '@nestjs/common';

@Moudle({
    imports: [CacheModule.register()]
})
```

### 调用缓存

```ts
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
}
```

**缓存操作**

<font color="orange"> `set`第三个参数设置TTL 存活时间，设置0而缓存不会过期</font>

````ts
await this.cacheManager.set('key', 'value', 1000);
await this.cacheManager.get('key'); // 如果不存在返回null
````

```ts
// 删除和清空缓存
await this.cacheManager.del('key');
await this.cacheManager.clear();
```

### 开启自动缓存

```ts
@Controller()
@UseInterceptors(CacheInterceptor)	// 通过拦截器
export class AppController {
    @Get()
    findAll(): string[] {
        return [];
    }
}
```

> 只有`get`请求会被缓存，使用了@`Res`也无法缓存。
>
> 全局绑定
>
> ```ts
> import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
> import { AppController } from './app.controller';
> import { APP_INTERCEPTOR } from '@nestjs/core';
> @Module({
>     providers: [
>         {
>             provide: APP_INTERCEPTOR,
>             useClass: CacheInterceptor
>         }
>     ]
> })
> ```

### 自定义缓存，开启全局模块

```ts
@Module({
	imports: [CacheModule.register({
        isGlobal: true,
        ttl: 5, // seconds
        max: 10, // 最大缓存量
    })]
})
```

### 对全局模块进行覆盖

```ts
import { CacheKey, CacheTTL } from '@nestjs/common';
@Controller()
export class AppController {
    @CacheKey('custom_key')
    @CacheTTL(20)
    @Get()
    ....
}
```

### [WebSockets and Microservices](https://docs.nestjs.com/techniques/caching#websockets-and-microservices)

- WebSocket 和 微服务缓存

### (自定义缓存拦截器)[https://docs.nestjs.com/techniques/caching#adjust-tracking]

### 使用其他的从存储

- `Nestjs`自带使用的是内存，可以使用其他作存储为高速缓存如`Redis`

```ts
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,

      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

> **warning**
>
> `cache-manager-redis-store` does not support redis v4，需要使用最新的v3

### 异步配置

```ts
 CacheModule.registerAsync({
     useFactroy: () => ({
         ttl: 5
     })
 })
```

**引入全局配置**

```ts
CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('CACHE_TTL'),
  }),
  inject: [ConfigService],
});
```

**使用类**

```ts
CacheModule.registerAsync({
  useClass: CacheConfigService,
});
```

```ts
@Injectable()
class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions {
        return {
            ttl: 5,
        };
    }
}
```



# CLI

## 快捷指令

****

[CRUD生成](https://docs.nestjs.com/recipes/crud-generator)

```bash
$ nest g co [name] # 创建controller文件
$ nest g resource [name] # 创建CURD文件
```

![image-20230311203223702](https://cdn.jsdelivr.net/gh/FrancisSaber/image/markdown-Image202303112032047.png)