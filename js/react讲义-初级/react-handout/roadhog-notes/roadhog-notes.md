# roadhog 使用笔记

Roadhog 是用于 dev, build 和测试命令的 cli 工具. 
它基于 react-dev-utils, 同时与 create-=react-app 的项目一同开发.
你可以将其想象成 create-react-app 的配置版.

## 快速开始

```sh
# 1. 安装
$ npm i roadhog -g

# 2. 检查版本
$ roadhog -v

# 3. 本地开发
$ roadhog dev

# 4. 编译构建
$ roadhog build
$ NO_COMPRESS=1 roadhog build

# 5. 测试
$ roadhog test

```

## Mock

roadhog 支持 Mock, 配置写在 `.roadhog.mock.js` 文件中

例如:

```js
export default {
    // 支持数据类型: 对象 或 数组
    'GET /api/users': { users: [ 1, 2 ] }
    // GET 或 POST 方法可以被省略
    , '/api/users/1': { id: 1 }
    // 支持自定义函数, API 与 express@4 一致
    , 'POST /api/users/create': ( req, res ) => res.end( 'OK' )
};
```

## 使用 public 目录

在 public 目录下的文件, 在 开发 与 编译的 是后会被拷贝到输出目录下 ( 默认为 ./dist 目录 ).
因此, favicon, iconfont, html, 引用的图等都可以存储到该目录中.

## 配置

roadhog 的 webpack 部分是基于 af-webpack 的实现. 
在项目根目录下创建 `.webpackrc` 文件编写配置项. 配置实用 JSON 格式.

例如:

```json
{
    "externals": { "react": "window.React" }
}
```

如果你喜欢 JS 的配置方式, 或需要编写代码实现一些高级判断, 
你可以使用 `.webpackrc.js` 文件来配置, 它支持 ES6 语法. 例如:

```js
export default {
    externals: { react: 'window.React' }
}
```



### 配置项索引




### entry 配置项

指定 webpack 入口, 支持 glob 格式.

假定项目中包含多个页面, 需要的页面在 `src/pages` 目录下. 你可以如下处理:

```json
    "entry": "src/pages/*.js"
```

### theme 配置项

配置主题, 实际上就是 less 变量. 支持对象和字符串类型. 
字符串需要指向一个返回配置的文件. 例如

```json 
"theme": {
    "@primary-color": "#1DA57A"
}
```

或者

```json
"theme": "./theme-config.js"
```



### define 配置项

通过 webpack 的 DefinePlugin 插件来转到代码, 该值会被 `JSON.stringify` 处理.

例如:

```json
"define": {
    "process.env.TEST": 1,
    "USE_COMMA": 2
}
```


### externals 配置项

配置 webpack 的 externals 属性. 例如:

```json
"externals": {
    "react": "window.React",
    "react-dom": "window.ReactDOM"
}
```

### alias 配置项

配置 webpack 的 resolve.alias 属性


### extraResolveExtensions 配置项

配置 webpack 的 resolve.extensions 属性.


### browserslist 配置项

配置 browserslist, 作用于 babel-preset-env 和 autoprefixer.

例如:

```json
"browserslist": [
    "> 1%",
    "last 2 versions"
]
```


### publicPath 配置项

配置 webpack 的 output.publicPath 属性.

### outputPath 配置项

配置 webpack 的 output.path 属性.

### devtool

配置 webpack 的 devtool 属性.

### commons 配置项

配置 webpack 的 CommonsChunkPlugin 插件, 格式为 Array. 例如:

```js
"commons": [
    {
        async: '__common',
        children: true,
        minChunks( module, count ) {
            if ( pageCount <= 2 ) {
                return count >= pageCount;
            }
            return count >= pageCount * 0.5;
        }
    }

]
```


### hash 配置项

配置用于构建时的 hash 文件名, 一般连同 manifest 一起使用.

### html 配置项

配置 html-webpack-plugin 插件. 例如:

```js
"html": {
    "template": './src/index.ejs'
}
```

### disableCSSModules 配置项

禁用 CSS 模块化. 我并不建议这样.

### disableCSSSourceMap 配置项

禁用生成 CSS SourceMap.

### extraBabelPresets 配置项

定义 babel 的预处理列表. 使用数组格式.

### extraBabelPlugins 配置项

定义 babel 插件列表, 使用数组格式.


### extraBabelIncludes 配置项

定义需要由 babel 处理转换的文件列表. 使用数组格式.

### copy 配置项

定义需要被拷贝的文件列表. 使用数组格式. 
同时, 每一项引用 copy-webpack-plugin 的配置.

例如:

```js
"copy": [
    {
        "from": "",
        "to": ""
    }
]
```

### proxy 配置项

配置 webpack-dev-server 中的 proxy 属性.

例如 将请求代理到其他服务器上.

```js
"proxy": {
    "/api": {
        "target": "http://jsonplaceholder.typicode.com",
        "changeOrigin": true,
        "pathRewrite": { "^/api": "" }
    }

}
```

那么就可以通过访问 /api/users 来获取 http://jsonplaceholder.typicode.com/users 中的数据了.


### sass 配置项

配置 node-sass 选项. 

注意: 考虑到 node-sass 和 sass-loader 的依赖性, 
在使用 sass 的时候, 必须在项目目录下安装它们.

### manifest 配置项

配置生成 manifest.json. 其选项转到 https://www.npmjs.com/package/webpack-manifest-plugin

例如:

```js
"manifest": {
    "basePath": "/app/"
}
```


### ignoreMomentLocale 配置项

Ignore moment locale file, used to reduce the size.

### disableDynamicImport 配置项

Disable import () to load on demand, but bundle all the files in a single file, implement via babel-plugin-dynamic-import-node-sync(https://github.com/seeden/babel-plugin-dynamic-import-node-sync).

### env 配置项

指定一个环境. development 用于 dev, production 用于 build. 例如:

```js
"extraBabelPlugins": [ "transform-runtime" ],
"env": {
    "development": {
        "extraBabelPlugins": [ "dva-hmr" ]
    }
}
```

那么在 开发环境中, extraBabelPlugins 为 [ "transform-runtime", "dva-hmr" ]. 
而在生产环境中为 [ "transform-runtime" ]


## 环境变量

你可以临时配置的环境变量有:

- PORT, 默认为 8000
- HOST, 默认为 localhost
- ANALYZE, 在 roadhog 构建时是否分析输出的 bundle
- ESLINT, 设置 none 来禁用 eslint 检查
- TSLINT, 设置 none 来禁用 tslint 检查
- COMPRESS, 设置 none 来禁用在 roadhog 构建时进行文件压缩
- BROWSER, 设置 none 来阻止在 roadhog 开发环境下打开浏览器

例如, 在 3000 端口中启动开发服务

```sh
# OS X 或 Linux 系统下
$ PORT=3000 roadhog dev

# win 中 cmd 下
> set PORT=3000 && roadhog dev

# 在所有平台下使用 cross-env
$ cross-env PORT=3000 roadhog dev
```

















