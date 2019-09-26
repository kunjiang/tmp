




# 怎么使用



# 安装



## 快速开始

```sh
npx create-next-app
```



( npx 需要在 npm 5.2 或更高的版本中使用, 请参考 [npm 版本说明](https://gist.github.com/timer/833d9946fa8a05ba855729d05a38ac23) )




## 手动按安装



在项目中安装:

```sh
$ npm install --save next react react-dom
```



同时在 `package.json` 文件中添加下面的代码:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```



然后, 文件系统则是主要的 API. 每一个 `.js` 文件都会成为一个路由, 会自动处理和渲染.



在你的项目中创建文件 `./pages/index.js`:

```js
function Home() {
  return <div>欢迎使用 next.js!</div>
}
export default Home
```



然后就可以运行了. 
使用 `npm run dev` 来运行, 并打开浏览器, 输入 `http://localhost:3000`.
如果需要使用其他端口, 可以运行: `npm run dev -- -p <其他端口>`.



到现在为止, 我们可以:



- 自动编译与打包 ( 使用 webpack 和 babel )
- 热加载代码
- 服务端渲染, 并为 `./pages/` 目录建立索引
- 静态文件服务. `./static/` 目录会映射到 `/static/` 下 ( 需要在你的项目中创建 `./static` 目录 )





# 自动代码分离



页面中, 每一个 `import` 只会导入你使用的代码. 这表示, 页面不会加载不需要的代码!

```js
import cowsay from 'cowsay-browser'

function CowsayHi() {
  return <pre>{ cowsay.say( { text: '嘿, 看这里!' } ) }</pre>
}

export default CowsayHi;
```



# CSS



## 支持内置 CSS

案例:

- [Basic css](https://github.com/zeit/next.js/blob/master/examples/basic-css)



使用 [styled-jsx](https://github.com/zeit/styled-jsx) 来实现具有独立作用域的 CSS.
类似与 Web Component, 还支持 "shadow CSS".
但是很遗憾, [现在只支持 JS, 还不支持服务端渲染.](https://github.com/w3c/webcomponents/issues/71)

```js
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media( max-width: 600px ) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  );
}

export default HelloWorld
```



请参考 [`styled-jsx` 的文档](https://www.npmjs.com/package/styled-jsx), 来获得更多案例.




## JS 化 CSS

案例:

- [Styled components](https://github.com/zeit/next.js/blob/master/examples/with-styled-components)
- [Styletron](https://github.com/zeit/next.js/blob/master/examples/with-styletron)
- [Glamor](https://github.com/zeit/next.js/blob/master/examples/with-glamor)
- [Cxs](https://github.com/zeit/next.js/blob/master/examples/with-cxs)
- [Aphrodite](https://github.com/zeit/next.js/blob/master/examples/with-aphrodite)
- [Fela](https://github.com/zeit/next.js/blob/master/examples/with-fela)



可以使用现有的所有 JS 化的 CSS 解决方案. 下面的案例使用的是 行内样式:

```js
function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>
}
export default HiThere
```



若要使用更为精细的 CSS-in-JS 解决方案, 一般需要实现服务端渲染的样式更新方法. 
你可以通过定义 `<Document>` 组件来实现, 它会包裹每一个页面.





## 导入 CSS / Sass / Less / Stylus 文件



要使用导入的 `.css`, `.scss`, `.less`, `.styl`, 你可以使用下面的模块, 它会配置合理的参数来处理服务端渲染.

- [@zeit/next-css](https://github.com/zeit/next-plugins/tree/master/packages/next-css)
- [@xeit/next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass)
- [@zeit/next-less](https://github.com/zeit/next-plugins/tree/master/packages/next-less)
- [@zeit/next-stylus](https://github.com/zeit/next-plugins/tree/master/packages/next-stylus)




# 静态文件支持 ( 例如: 图片等 )



在项目的根目录下创建一个名为 `static` 的目录. 在代码中, 就可以使用 `/static/` 来引用该目录下的文件了:

```js
function MyImage() {
  return <img src="/static/my-image.png" alt="my image" />
}

export default MyImage 
```

*注意: 不要将 `static` 修改为其他名字. 这个名字是不允许改变的, 而且 next 只会使用该目录保存静态资源.*





# 动态路由

案例:

- [Dynamic routing](https://github.com/zeit/next.js/blob/master/examples/dynamic-routing)




使用预定义的路径来定义路由往往不足以应付复杂的应用需求, 在 Next.js 中, 你可以在页面添加括号 ( `[param]` ) 来创建动态路由 ( 又被称为 url slugs, pretty urls 等 )



考虑这个页面 `pages/post/[pid].js`:

```js
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter();
  const { pid } = router.query

  return <p>Post: { pid }</p>
}

export default Post
```



任何形如 `/post/1`, `/post/abc`, 等请求都会被 `pages/post/[pid].js` 捕获. 捕获到的路径中的参数会被作为 query 参数传给给页面.



例如, 路径 `/post/abc` 会得到一个 `query` 对象: `{ pid: 'abc' }`. 类似的, 路径 `/post/abc?boo=bar` 会得到 `query` 对象: `{ foo: 'bar', pid: 'abc' }`







> 注意: 多个动态路由参数也是一样的使用.
> 例如, `pages/post/[pid]/[comment].js` 可以捕获 `/post/1/a-comment`. 它的 `query` 对象为: `{ pid: 1, comment: 'a-comment' }`.



带有 `/post/abc` 的 `<Link>` 可以这么使用:

```js
<Link href="/post/[pid]" as="/post/abc">
  <a>第一个请求</a>
</Link>
```




- `href`: 表示 `pages` 目录的路径.
- `as`: 描述的路径会替换到浏览器的 URL 地址栏中.



因为 `href` 是文件系统路径, 因此它不会在运行时被修改, 相反, 根据不同的需求, `as` 可能会被调整. 
这是一个创建列表连接的案例:

```js
const pids = [ 'id1', 'id2', 'id3' ]
{
  pids.map( pid => (
    <Link href="/post/[pid]" as={ `/post/${ pid }` }>
      <a>Post { pid }</a>
    </Link>
  ) )
}
```



> 你可以在[这里获得 `<Link>` 的更多信息](https://nextjs.org/docs#with-link).



需要注意的是, 如果查询参数与路由参数出现同名的情况, 路由参数会被同名的查询参数覆盖. 
例如: `/post/abc?pid=bcd` 则会获得 `query` 对象为: `{ pid: 'abc' }`.



> **注意:** 预定义路由优先级高于动态路由. 例如, 如果你有 `pages/post/[pid].js` 和 `pages/post/create.js` 两个文件, 
> 那么路由  `/post/create` 会被 `/pages/post/create.js` 文本捕获, 而不是动态路由 ( `[pid]` ).
> **注意:** 页面会启用自动渲染来实现静态优化. 自动渲染的页面不包含路由中定义的参数数据 ( 查询参会是空, 如: `{}` ). 
> 页面自动渲染后, Next.js 会触发应用更新, 通过查询参数对象来更新路由参数. 
> 若应用架构不支持该行为, 可以使用 `getInitialProps` 方法来获得查询参数, 从而放弃静态优化.
> **注意:** 若使用 [ZEIT Now](https://zeit.co/now), 那么动态路由开箱即用, 你不需要在 `now.json` 文件中配置任何路由信息.
> 如果你是刚刚接触 ZEIT Now, 那么你可以在 [Deploying a Next.js App Learn section](https://nextjs.org/learn/basics/deploying-a-nextjs-app) 了解到如何部署 Next.js 应用.




# 添加 `<head>`

案例:

- [Head elements](https://github.com/zeit/next.js/blob/master/examples/head-elements)
- [Layout component](https://github.com/zeit/next.js/blob/master/examples/layout-component)



我们导出了一个内置组件, 用于将元素追加到页面的 `<head>` 中.

```js
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>页面的标题</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <p>Hello World!</p>
    </div>
  )
}

export default IndexPage;
```



为了避免 `<head>` 标签中被添加重复的标签, 可以使用属性 `key`, 它可以保证标签只被渲染一次:

```js
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>我的页面标题</title>
        <meta 
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <Head>
        <meta 
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <p>Hello World!</p>
    </div>
  )
}

export default IndexPage
```



在这个案例中, 只有第二个 `<meta name="viewport" />` 标签会被渲染.



*注意: `<head>` 标签中的内容会在组件卸载后清除. 因此, 请确保每一个页面都在 `<head>` 中定义了必要的内容, 而不要假设其他页面会添加.*



*注意: `<title>` 标签与 `<meta>` 标签必须是 `<Head>` 标签的直接子元素, 或被定义为 `<React.Fragment>` 的顶级元素. 否则元素在渲染后无法正确渲染.*





# 请求数据与组件的生命周期

案例:

- [Data fetch](https://github.com/zeit/next.js/blob/master/examples/data-fetch)



在你需要使用状态, 生命周期函数或初始化数据入口的时候, 
你可以使用带有 [Hooks](https://reactjs.org/docs/hooks-intro.html) 的函数组件, 
或[类组件](https://reactjs.org/docs/react-component.html).




使用函数组件:

```js
import fetch from 'isomorphic-unfetch'

function Path( { stars } ) {
  return <div>Next stars: { stars }</div>
}

Path.getInitailProps = async ( { req } ) => {
  const res = await fetch( 'https://api.github.com/repos/zeit/next.js' )
  const json = await res.json()
  return { stars: json.stargazers_count }
}  

export default Page
```



使用类组件:

```js
import React from 'react'

class HelloUA extends React.Component {
  static async getInitialProps( { req } ) {
    const userAgent = req ? req.headers[ 'user-agent' ] : navigator.userAgent
    return { userAgent };
  } 
}

export default HelloUA
```




需要注意的是在页面加载时是如何加载数据的. 我们使用静态方法 `getInitailProps`, 并且使用 `async` 关键词来修饰该方法.
该方法可以异步的请求 JavaScript 简单对象 ( `Object` ), 使之当做 `props` 来使用.



在服务端渲染中, `getInitialProps` 方法返回的数据会被序列化. 类似与 `JSON.stringify` 方法. 
请确保 `getInitialProps` 方法返回的是简单对象 ( `Object` ). 其成员不要包含 `Date` 类型, `Map` 类型, 以及 `Set` 类型的数据.



页面第一次加载时, `getInitialProps` 方法只会在服务端运行. 
然而, 在使用 `Link` 组件或路由 API 从一个页面导航到另一个页面时, `getInitialProps` 方法只会运行在客户端.





- `getInitialProps` 不能运行在子组件中, 必须运行在 `pages` 中.
- 如果需要在 `getInitialProps` 方法中使用部分只能在服务端渲染的模块, 那么请确保[正确的导入了它们](https://arunoda.me/blog/ssr-and-server-only-modules). 否则它们会拖慢你的速度.



`getInitialProps` 方法的上下文参数中可以包含下列属性:




- `pathname` - URL 的 path 部分
- `query` - URl 的 query 部分, 并已转化为对象
- `asPath` - 显示在浏览器中的实际路径 ( 包含查询字符串 ) 字符串
- `req` - HTTP request 对象 ( 仅在服务端渲染时含该属性 )
- `res` - HTTP response 对象  ( 仅在服务端渲染时含该属性 )
- `err` - 渲染的过程中出现的错误对象



# 路由



Next.js 不会给应用中的每一个页面发送一个路由表, 因此当前页面也不知道可以路由到哪些页面.
为了支持可扩展性, 所有的子路由都是懒加载的.




## 使用 `<Link>`

案例:

- [Hello World](https://github.com/zeit/next.js/blob/master/examples/hello-world)



客户端的两个页面跳转可以通过 `<Link>` 组件来实现.





> 若需要通过浏览器的重新加载来实现路由跳转到其他静态页, 那么不需要使用该组件. 与使用 [AMP](#) 的时候一样.



## 基本案例



考虑两个页面:

```js
// pages/index.js
import Link from 'next/link'

function Home() {
  return (
    <>
      <ul>
        <li>Home</li>
        <li>
          <Link href="/about">
            <a>关于我们</a>
          </Link>
        </li>
      </ul>

      <h1>这是我们的主页</h1>
    </>
  )
}

export default Home
```

```js
// pages/about.js
function About() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>关于我们</l>
      </ul>

      <h1>关于我们</h1>
      <p>我们是一个很酷的团队.</p>
    </>
  )
}

export default About
```



注意: 如果将函数组件作为 `<Link>` 的子组件传递使用, 那么需要将函数组件包裹在 `React.forwardRef` 中.



使用 `React.forwardRef` 的案例

```js
import React from 'react'
import Link from 'next/link'

// `onClick`, `href` 和 `ref` 需要放在 DOM 元素上进行处理
const MyButton = React.forwardRef( ( { onClick, href }, ref ) => (
  <a href={href} onClick={onClick} ref={ref}>
    点击
  </a>
) )

export default () => (
  <>
    <Link href="/another">
      <MyButton />
    </Link>
  </>
)
```





## 自定义路由 ( 使用 URL 中的数据 )



如果你的页面没有被[动态路由](#%e5%8a%a8%e6%80%81%e8%b7%af%e7%94%b1)所覆盖到, 那么可以创建自定义服务, 手动添加动态路由.



例如:











1. 考虑你有一个 URL: `/post/:slug`.
2. 你创建了 `pages/post.js`:
   ```js
   import { useRouter } from 'next/router'

   const Post = () => {
     const router = useRouter();
     const { slug } = router.query;

     return <p>我的博客: {slug}</p>
   }

   export default Post
   ```
3. 在 `server.js` 文件中 ( 这个功能只能在 SSR 中使用 ), 你将路由添加到 `express` ( 或者其他服务端 ) 里. 然后让所有的 `/post/:slug` 都被路由到 `pages/post.js` 文件. 并且在 `query` 对象中提供 `slug` 参数, 再将其传递给页面.
   ```js
   server.get( '/post/:slug', ( req, res ) => {
     return app.render( req, res, '/post', { slug: req.params.slug } )
   } )
   ``` 
4. 在客户端, 使用 `next/link` 路由:
   ```js  
   <Link href="/post?slug=something" as="/post/something">
   ```
   - `href` - 表示在 `pages` 目录下对应的路径
   - `as` - 表示在服务端使用的路由




客户端路由的行为与浏览器上的完全相同:





1. 获得组件.
2. 如果定义了 `getInitialProps` 则获取数据; 若出现错误, 则渲染 `_error.js` 文件.
3. 完成第 1 步与第 2 步后, 执行 `pushState`, 然后渲其他组件.



若要在组件中获得 `pathname`, `query` 或者 `asPath`, 你可以在 [useRouter](#) hook 或在类组件中使用 [withRouter](#).





## 使用 URL 对象 1

案例:

- [使用 URL 对象路由](https://github.com/zeit/next.js/blob/master/examples/with-url-object-routing)



`<Link>` 组件还支持传入一个 URL 对象, 并且该对象会被自动的格式化为 URL 字符串.

```js
// pages/index.js
import Link from 'next/link'

function Home() {
  return (
    <div>
      点击{ ' ' }
      <Link href={{ pathname="/about", query: { name: 'Zeit' } }}>
        <a>这里</a>
      </Link>
      查看更多
    </div>
  )
}

export default Home
```



此时会生成一个 URL 字符串: `/about?name=Zeit`. 
[Node.js 的 URL 模块文档](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)中描述了 URL 对象的规范,
你还可以使用文档中定义的其他属性.

 


## 使用替换 URL 来代替推入 URL



`<Link>` 组件的默认行为是将一个新的 url 推入 ( `push` ) 历史记录栈中. 你可以使用 `replace` 属性, 来阻止添加一个新的历史记录.

```js
// pages/index.js
import Link from 'next/link'

function Home() {
  return ( 
    <div>
      点击{ ' ' }
      <Link href="/about" replace>
        <a>这里</a>
      </Link>{ ' ' }
      了解更多内容
    </div>
  )
}

export default Home
```



## 使用支持 `onClick` 的组件




`<Link>` 组件可以作为含有 `onClick` 事件的任意组件的容器.
在本例中, 你不需要使用 `<a>` 标签, 它只会添加 `onClick` 事件处理函数, 而不会将 `href` 属性传递过去. 



```js
// pages/index.js
import Link from 'next/link'

function Home() {
  return (
    <div>
      点击{ ' ' }
      <Link href="/about">
        <img src="/static/image.png" alt="image" />
      </Link>
    </div>
  )
}

export default Home
```




## 将 Link 的 `href` 传递给子元素




如果子元素就是 `<a>` 标签, 并且它没有 href 属性, 那么会自动添加上 href, 用户不需要做重复的操作. 
但有时候, 我们传入的是一个包含 `<a>` 元素的组件, 而 `Link` 无法是识别出它是一个*超链接*, 导致无法将 href 属性传递到其子元素 a 标签上.
如下面的案例, 你需要在 `Link` 上提供一个布尔类型的属性 `passHref`, 来强制地将 `href` 属性传递给子元素.




请注意: 使用除 `a` 以外的其他标签, 但没有传递 `passHref` 属性, 也可能得到正确的导航链接. 
但是, 在被搜索引擎收录的时候, 无法识别为正确的链接 ( 因为缺少 `href` 属性 ).
这样, 不利于网站的 SEO 优化.



```js
import Link from 'next/link'
import Unexpected_A from 'third-library'

function NavLink( { href, name } ) {
  return (
    <Link href={href} passHref>
      <Unexpected_A>{name}</Unexpected_A>
    </Link>
  )
}

export default NavLink
```



## 阻止滚动到页面顶部




`<Link>` 标签含有一个默认行为, 就是点击后会滚动到页面顶部. 如果定义了哈希值, 也会滚动到指定 id 处. 就像 普通的 `<a>` 标签一样.
要阻止滚动到页面顶部或指定哈希值的位置, 可以在 `<Link>` 中添加属性 `scroll={false}`:

```js
  <Link scroll={false} href="/?counter=10"><a>阻止滚动</a></Link>
  <Link href="/?counter=10"><a>点击后会滚动到页面顶部</a></Link>
```



## 命令式 1

案例:

- [Basic routing](https://github.com/zeit/next.js/blob/master/examples/using-router)
- [With a page loading indicator](https://github.com/zeit/next.js/blob/master/examples/with-loading)




你同样可以在客户端使用 `next/router` 来实现页面跳转:

```js
import Router from 'next/router'

function ReadMore() {
  return (
    <div>
      点击 <span onClick={ () => Router.push( '/about' ) }>这里</span> 查看详情
    </div>
  )
}

export default ReadMore
```



## 拦截 `popstate`




有些时候 ( 例如, 使用自定义路由的时候 ), 你可能希望在路由触发跟新之前监听 `popstate` 并作出相应处理. 
例如, 你可以使用这个来控制请求, 或强制 SSR 刷新等.

```js
import Router from 'next/router'

Router.beforePopState( ( { url, as, options } ) => {
  // 我只允许使用这两个路由
  if ( as !== '/' && as !== '/other' ) {
    // 使用 404 来渲染不被允许的路由
    window.location.href = as;
    return false;
  }
  return true;
} )
```



如果传递给 `beforePopState` 的函数返回 `false`, `Router` 则不会处理 `popState`; 那么, 在这个案例中, 你就需要负责处理它.
可以参考 [阻止文件系统路由](#)






上述 `Router` 对象, 包含下列 API:



- `route` - 当前路由的字符串 ( `String` )
- `pathname` - 除查询字符串外, 当前路径字符串 ( `String` )
- `query` - 查询参数对象 ( `Object` ), 默认为 `{}`
- `asPath` - 表示显示在浏览器中的实际路径 ( 包含 查询参数 ) 字符串 ( `String` )
- `push( url, as=url )` - 使用给定的 url 执行一个 `pushState` 调用
- `replace( url, as=url )` - 使用给定的 url 执行一个 `replaceState` 调用
- `beforePopState( cb=function )` - 在路由处理事件触发前拦截 popstate
 


`push` 方法与 `replace` 方法的第二个参数 `as` 是可选参数, 用于描述 URL. 如果在服务端配置了自定义路由, 使用该参数会很方便.







## 使用 URL 对象 2



在 `push` 方法和 `replace` 方法中可以使用 URL 对象, 其用法与 `<Link>` 组件中使用 URL 对象的方法一样.

```js
import Router from 'next/router'

const handler = () => {
  Router.push( {
    pathname: '/about',
    query: { name: 'Zeit' },
  } )
}

function ReadMore() {
  return (
    <div>
      点击 <span onClick={handler}>这里</span> 查看详情
    </div>
  )
}

export default ReadMore
```



这里与 [`<Link>` 组件的参数](#%e4%bd%bf%e7%94%a8-url-%e5%af%b9%e8%b1%a1-1)是一样的.
与 `<Link>` 组件一样, 第一个参数映射到 `href` 上, 而第二个参数映射到 `as` 上.
文档可以参考[这里](#%e4%bd%bf%e7%94%a8-url-%e5%af%b9%e8%b1%a1-1).





## 路由事件



你还可以使用 `Router` 监听其他事件的触发. 这里是 `Router` 支持的事件列表:



- `routeChangeStart( url )` - 在路由开始改变时触发
- `routeChangeComplete( url )` - 路由改变完成后触发
- `routeChangeError( err, url )` - 在路由改变时发生错误, 或在路由加载时失败则触发
- `beforeHistoryChange( url )` - 在浏览器的 history 改变之前触发
- `hashChangeStart( url )` - 在 hash 改变之前触发, 不是页面的 hash 改变
- `hashChangeComplete( url )` - 在 hash 改变完成后触发, 不是页面的 hash 改变



> 这里的 url 是在浏览器中显示的 URL. 如果你调用 `Router.push( url, as )` ( 或类似的方法 ), 那么 url 的值是 `as` 的值.



下面是监听 router 的 `routeChangeStart` 事件的使用范例:


```js
const handleRouteChange = url => {
  console.log( 'App 即将变化到: ', url )
}

Router.events.on( 'routeChangeStart', handleRouteChange )
```



如果你不需要再监听该事件, 可以调用 `off` 方法取消订阅:

```js
Router.events.off( 'routeChangeStart', handleRouteChange )
```



若路由加载失败 ( 例如 快速的点击两个链接 ), 将会触发 `routeChangeError` 事件.
传递的错误事件对象 ( `err` ) 会包含为 `true` 的 `cancelled` 属性.

```js
Router.events.on( 'routeChangeError', ( err, url ) => {
  if ( err.cancelled ) {
    console.log( `路由到 ${url} 失败!` )
  }
} );
```




> 注意: 在 `getInitialProps` 中使用 router 事件是不明智的, 因为它会导致无法预计的行为.
> 在组件加载的时候注册路由事件 ( `useEffect` 或者 `componentDidMount` / `componentWillUnMount` ) 或在事件触发时使用命令式语法.
>
>  ```js
>  useEffect( () => {
>    const handleRouteChange = url => {
>      console.log( 'App 路由到: ', url )
>    }
>    Router.events.on( 'routeChangeStart', handleRouteChange )
>
>    return () => {
>      Router.events.off( 'routeChangeStart', handleRouteChange )
>    }
>  }, [] )
>  ```




## 浅路由

案例:

- [Shallow Routing](https://github.com/zeit/next.js/blob/master/examples/with-shallow-routing)



浅路由允许你在不运行 `getInitialProps` 的时候修改 URL.
通过 `router` 属性获得 `pathname` 和 `query` 参数, 而不会丢失状态. 而 `router` 可以通过使用 `useRouter` 或 `withRouter` 来获得.



使用 `shallow: true` 选项, 你还可以调用 `Router.push` 或 `Router.replace` 方法. 下面是使用案例:

```js
// 当前 url 是 '/'
const href = '/?counter=10'
const as = href
Router.push( href, as, { shallow: true } )
```



现在, URL 被更新为 `/?counter=10`. 
在你的组件 `Component` 中使用 `this.props.router.query` 就可以看到更新的 URL 了. 当然, 还需要保证你在 `Component` 使用了 `withRouter`, 在代码中注入了 `router`.



你可以使用 `componentDidUpdate` 生命周期函数来监视 URL 的变化, 案例如下:

```js
componenetDidUpdate( prevProps ) {
  const { pathname, query } = this.props.router
  // verify props have changed to avoid an infinite loop
  // 确保 props 已经改变, 从而避免无限循环
  if ( query.id !== prevProps.router.query.id ) {
    // fetch data based on the new query
    // 使用新的 查询参数请求数据
  }
}
```




> 注意:
> 
> 浅路由只用在当前页面改变 URL 的时候. 例如, 我们有另一个页面, 名为 `about`, 若运行:
> 
> ```js
> Router.push( '/?counter=10', '/about?counter=10', { shallow: true } )
> ```
> 
> 结果却是一个新的页面. 它会卸载当前页面, 然后加载新的页面. 即使我们是使用浅路由的方法, 它还是会调用 `getInitialProps` 方法.




## useRouter

案例:

- [Dynamic routing](https://github.com/zeit/next.js/blob/master/examples/dynamic-routing)



如果你希望在应用的任意一个组件中都可以访问 `router` 对象, 那么你可以使用 `useRouter` 钩子函数, 下面是使用范例:

```js
import { useRouter } from 'next/router'

export default function ActiveLink( { children, href } ) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  }

  const handleClick = e => {
    e.preventDefault()
    router.push( href )
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
```



上面的 `router` 对象的使用方法类似与 [`next/router`](#%e5%91%bd%e4%bb%a4%e5%bc%8f).





## 使用高阶组件

案例:

- [Use a Higher Order Component](https://github.com/zeit/next.js/blob/master/examples/using-with-router)



若 [useRouter](#userouter) 不是那么符合你的需求, `withRouter` 同样可以在任意组件中获得 `router` 对象, 这里是用法:

```js
import { withRouter } from 'next/router'

function Page( { router } ) {
  return <p>{ router.pathname }</p>
}

export default withRouter( Page )
```

,




# 预加载页面


⚠️ 该特性只能在生产环境中使用 ⚠️

案例:

- [Prefetching](https://github.com/zeit/next.js/blob/master/examples/with-prefetching)




Next.js 含有一些 API, 允许你提前加载页面.



由于 Next.js 在服务端渲染页面, 因此它需要保证 app 范围内任意的路径都可以实时的响应. 
事实上, Next.js 为网站 ( *website* )页面的初始下载提供了一个高性能的解决方案, 那就是 app 的预加载.
[获取更多信息可以参考这里](https://zeit.co/blog/next#anticipation-is-the-key-to-performance).





> 使用预加载, Next.js 只会下载 JS 代码. 在页面渲染的时候, 你可能需要等待数据.
> 
> 标签 `<link rel="preload">` 用于预加载. 有时, 如果资源在 3 秒内未被使用, 浏览器会显示一个警告. 
> 按照 [https://github.com/zeit/next.js/issues/6517#issuecomment-469063892](https://github.com/zeit/next.js/issues/6517#issuecomment-469063892) 链接的方法可以忽略这个警告.





## 使用 `<Link>`



标签 `<Link>` 会使得在页面渲染后台自动地提前载入页面. 如果某一个页面很少被访问到, 你也可以设置 `prefetch` 为 `false`, 来不许提前载入该页面.
案例如下:

```js
<Link href="/about" prefetch={false}>
  <a>关于</a>
</Link>
```



## 命令式 2 



预加载通常需要利用 `<Link />` 标签来设置页面地址, 然而我们还有一个高级的方法, 使用 API 来设置:

```js
import { useRouter } from 'next/router'

export default function MyLink() {
  const router = useRouter();

  return (
    <>
      <a onClick={ () => setTimeout( () => router.push( '/dynamic' ), 100 )}>
        100ms 后触发路由跳转
      </a>
      { // 然后我们可以预先加载该页面
      router.refetch( '/dynamic' ) }
    </>
  )
}
```



`router` 方法只能用在应用 ( app ) 的客户端内部. 为了避免错误的, 可以将预加载的代码写在 `useEffect()` 钩子函数中:

```js
import { useRouter } from 'next/router'

export default function MyLink() {
  const router = useRouter();

  useEffect( () => {
    router.prefetch( '/dynamic' )
  } )

  return (
    <a onClick={ () =-> setTimeout( () => router.push( '/dynamic' ), 100 ) }>
      100ms 后触发路由跳转
    </a>
  )
}
```



如果使用 `React.Component`, 你还可以将其放到 `componentDidMount()` 生命周期函数中:

```js
import React from 'react'
import { withRouter } from 'next/router'

class MyLink extends React.Component {
  componentDidMount() {
    const { router } = this.props
    router.prefetch( '/dynamic' )
  }

  render() {
    const { router } = this.props

    return (
      <a onClick={ () => setTimeout( () => router.push( '/dynamic' ), 100 ) }>
        100ms 后触发路由跳转
      </a>
    )
  }
}

export default withRouter( MyLink )
```




# API 路由

案例:

- [Basic API routes](https://github.com/zeit/next.js/blob/master/examples/api-routes)
- [API routes with micro](https://github.com/zeit/next.js/blob/master/examples/api-routes-micro)
- [API routes with middleware](https://github.com/zeit/next.js/blob/master/examples/api-routes-middleware)
- [API routes with GraphQL server](https://github.com/zeit/next.js/blob/master/examples/api-routes-graphql)
- [API routes with REST](https://github.com/zeit/next.js/blob/master/examples/api-routes-rest)



API 路由为 Next.js 提供了一个简单的解决方案来构建你的 API. 首先在 `./pages` 目录下创建 `api/` 文件夹.



文件夹 `./pages/api/` 下的每一个文件都会被映射到 `/api/*` 上. 例如, `./pages/api/posts.js` 会被映射到路由 `/api/posts` 上.



下面是一个 API 路由的案例:

```js
export default ( req, res ) => {
  res.setHeader( 'Content-Type', 'application/json' )
  res.statusCode = 200
  res.end( JSON.stringify( { name: 'Nextjs' } ) )
}
```




- `req` - 请查看 派生于 [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 的 [NextApiRequest](https://github.com/zeit/next.js/blob/v9.0.0/packages/next-server/lib/utils.ts#L143-L158)
- `res` - 请查看 派生于 [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) 的 [NextApiResponse](https://github.com/zeit/next.js/blob/v9.0.0/packages/next-server/lib/utils.ts#L168-L178)




[API 路由](#api-%e8%b7%af%e7%94%b1)的内置类型 `NextApiRequest` 和 `NextApiResponse` 分别派生于 Node.js 的 request 对象和 response 对象.

```js
import { NextApiRequest, NextApiResponse } from 'next'

export default ( req: NextApiRequest, res: NextApiResponse ) => {
  res.status( 200 ).json( { title: 'Next.js' } )
}
```



通过 API 调用来处理不同的 HTTP 请求, 可以在处理函数中使用 `req.method` :

```js
export default ( req, res ) => {
  if ( req.method === 'POST' ) {
    // 处理 POST 请求
  } else {
    // 处理其他 HTTP 请求
  }
}
```





> 注意: API 路由无法[指定 CORS 响应头](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). 
> 因此, 该路由只支持同源应用. 你可以使用 CORS 中间件来封装自定义操作, 下面提供了[一个示例](#)



API 路由不会增加客户端代码包的尺寸. 它只会打包到服务端.




## 对动态路由的支持



API 页面支持动态路由, 因此你可以使用所有前文说道的功能.



考虑文件 `./pages/api/post/[pid].js`, 这里介绍如何在处理方法中获得参数:

```js
export default ( req, res ) => {
  const {
    query: { pid },
  } = req

  res.end( `Post: ${pid}` )
}
```




## API 中间件



API 路由提供了一些内置中间件, 它们在每次请求来到时被使用. 这些中间件有:






- `req.cookie` -  它是一个对象, 包含请发送的 cookie. 默认为 `{}`.
- `req.query` - 它是一个对象, 包含查询字符串. 默认为 `{}`.
- `req.body` - 它是一个对象, 包含根据 `content-type` 转换后的 body 数据, 若没有发送任何数据则为 `null`.



默认情况下请求体会自动进行转换, 并且转换的最大尺寸为 1mb. 若需要使用流来处理, 则可以配置属性来阻止默认转换:

```js
// ./pages/api/my-endpoint.js
export default ( req, res ) => {
  // ...
}

export const config = {
  api: {
    bodyParser: false,
  },
}
```



你可以设置请求体转换的大小, 只需要在 `bodyParser` 中添加 `sizeLimit` 选项, 可以使用[字节库](https://github.com/visionmedia/bytes.js)中所有的值.

```js
// ./pages/api/my-endpoint.js
export default ( req, res ) => {
  // ...
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
```



除此之外, 你还可以使用任何与[微服务 ( Micro )](https://github.com/zeit/micro)兼容的[中间件](https://github.com/amio/awesome-micro)!



例如, 可以使用 `micro-cors` 为 API 路径来[配置 CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).



首先, 安装 `micro-cors`:

```sh
npm i micro-cors
# 或
yarn add micro-cors
```



然后, 导入 `micro-cors` 并进行[配置](https://github.com/possibilities/micro-cors#readme).
最后, 在中间件中包装需要导出的函数:

```js
import Cors from 'micro-cors'

const cors = Cors( {
  allowedMethods: [ 'GET', 'HEAD' ],
} )

function Endpoint( req, res ) {
  res.json( { message: 'Hello Everone!' } )
}

export default cors( Endpoint )
```



## 辅助方法



我们提供了一些类 Express.js 风格的辅助方法, 目的是帮助构建 API, 提高开发者的效率:

```js
export default ( req, res ) => {
  res.status( 200 ).json( { name: 'Next.js' } )
}
```





- `res.status( code )` - 函数类型, 用于设置状态码. `code` 要求必须是有效的 [HTTP 状态码](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
- `res.json( json )` - 发送 一段 `JSON` 响应体. `json` 必须是有效的 `JSON` 对象.
- `res.send( body )` - 发送 HTTP 响应. 响应体可以是 `string`, 或 `object`, 或 `Buffer`.




# 自定义服务与路由

案例:

- [Basic custom server](https://github.com/zeit/next.js/blob/master/examples/custom-server)
- [Express integration](https://github.com/zeit/next.js/blob/master/examples/custom-server-express)
- [Hapi integration](https://github.com/zeit/next.js/blob/master/examples/custom-server-hapi)
- [Koa integration](https://github.com/zeit/next.js/blob/master/examples/custom-server-koa)
- [Parameterized routing](https://github.com/zeit/next.js/blob/master/examples/parameterized-routing)
- [SSR caching](https://github.com/zeit/next.js/blob/master/examples/ssr-caching)



通常, 使用 `next start` 开启你的 next 服务. 但是, 大部分开发者百分之百会使用编程的方式来实现自定义的路由处理. 例如使用 格式匹配路由等.



在使用自定义的服务文件 ( 例如 `server.js` 文件 ) 时, 请确保修正确改了 `package.json` 文件的 script 属性:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node start.js"
  }
}
```



下面这个案例使用 `/a` 去处理 `./pages/b`, 然后使用 `/b` 来处理 `./pages/a`:

```js
// This file doesn't go through babel or webpack transformation.
// 这个文件没有使用 babel 与 webpack 转换.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// 请确保文件中的语法与源代码与你当前的 node 版本兼容.
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
// 可以参考 https://github.com/zeit/next.js/issues/1245 对于 Webpack 和 Babel 的讨论
const { createServer } = require( 'http' )
const { parse } = require( 'url' )
const naxt = require( 'next' )

const dev = process.env.NODE_ENV !== 'production'
const app = next( { dev } )
const handle = app.getRequestHandler()

app.prepare().then( () => {
  createServer( ( req, res ) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // 确保传入 `url.parse` 的第二个参数是 `true`
    // This tells it to parse the query portion of the URL.
    // 这表示解析 URL 的 query 部分.
    const parsedUrl = parse( req.url, true )
    const { pathname, query } = parsedUrl

    if ( pathname === '/a' ) {
      app.render( req, res, '/b', query )
    } else if ( pathname === '/b' ) {
      app.render( req, res. '/a', query )
    } else {
      handle( req, res, parsedUrl )
    }

  } ).listen( 3000, err => {
    if ( err ) throw err
    console.log( '> Ready on http://localhost:3000' )
  } )
} )
```



下面的 `next` API:

- `next( opts: object )`



可使用的选项有:






- `dev` ( `bool` ) 是否在 dev 模式下运行 Next.js. - 默认为 `false`
- `dir` ( `string` ) 表示 项目所在的目录. - 默认为 `'.'`
- `quite` ( `bool` ) 表示是否隐藏包含服务端信息的错误消息. - 默认为 `false`
- `conf` ( `object` ) 和 `next.config.js` 中的对象相同. - 默认为 `{}`



然后, 修改 `package.json` 中的 `start` 脚本为 `NODE_ENV=production node server.js`.





## 禁用文件系统路由



默认情况下, Next 会为自动处理 `/pages` 目录下的每一个文件, 
使得可以根据路径名 ( pathname ) 来匹配到对应的文件名 ( 例如, `/pages/some-file.js` 文件, 可以使用 `site.com/some-file` 来访问到 ).



若使用了自定义路由, 这个默认行为可能导致使用不同的路径却得到得到同样的内容. 这不利于 SEO, 同时用户体验页不好.



要阻止该默认行为, 即禁用 基于 `/pages` 目录下的文件路由, 只需要在 `next.config.js` 简单的设置一下即可:

```js
// next.config.js
module.exports = {
  useFileSystemPublicRoutes: false
}
```



需要注意的是 `useFileSystemPublicRoutes` 只是简单的让 SSR 无法使用文件名路由, 而客户端路由仍然可以访问这些路径. 
如果使用该设置, 请使用编程来阻止你不希望被路由到的路径.





或许你想通过配置来使得客户端禁用文件路由, 那么你可以参考 [Intercepting popstate](#)




## 动态 assetPrefix



有些时候我们需要动态的设置资源前缀 ( `assetPrefix` ). 如果要根据传入的请求修改资源的前缀 ( `assetPrefix` ), 这个功能就会很实用. 为了实现动态前缀, 我们可以使用 `app.setAssetPrefix`



这里有一个参考案例:

```js
const next = require( 'next' )
const http = require( 'http' )

const dev = process.env.NODE_ENV !== 'production'
const app = next( { dev } )
const handleNextRequests = app.getRequestHandler()

app.prepare().then( () => {
  const server = new http.Server( ( req, res ) => {
    // Add assetPrefix support based on the hostname
    // 添加基于 hostname 的资源前缀
    if ( req.header.host === 'my-app.com' ) {
      app.setAssetPrefix( 'http://cdn.com/myapp' )
    } else {
      app.setAssetPrefix( '' )
    }

    handleNextRequests( req, res )
  } )

  server.listen( port, err => {
    if ( err ) {
      throw err
    }

    console.log( `> Ready on http://localhost:${ port }` )
  } )
} )
```




## 修改 x-powered-by



Next.js 默认会在请求头中添加 `x-powered-by` 请求头. 该请求头是可选的, 下面的代码展示了如何移除该模型行为:

```js
// next.config.js
module.exports = {
  poweredByHeader: false,
}
```




# 动态导入

案例:

- [With Dynamic Import](https://github.com/zeit/next.js/blob/master/examples/with-dynamic-import)



Next.js 支持 JavaScript 的 ES2020 的 [dynamic import()](https://github.com/tc39/proposal-dynamic-import) 语法特性.
使用该特性, 你可以在页面中动态的加载 JavaScript 模块 ( 包括 React 组件 ).



你可以将动态加载模块这一特性看成是将代码以代码块的方式进行管理的手段. 由于 Next.js 在 SSR 上支持 动态导入, 因此你可以玩出很多花样来.




下面是这一特性常见的使用方法:




## 基本用法 ( 也支持 SSR )

```js
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic( () => import( '../components/hello' ) )

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>这里是主页!</p>
    </div>
  )
}

export default Home
```



## 导出具名模块

```js
// components/hello.js
export function Hello() {
  return <p>Hello</p>
}
```

```js
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic( () => 
  import( '../components/hello' ).then( mod => mod.hello )
)

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>这是主页</p>
    </div>
  )
}

export default Home
```



## 自定义加载组件

```js
import dynamic from 'next/dynamic'

const DynamicComponentWithCustomLoading = dynamic(
  () => import( '../components/hello2' ),
  { loading: () => <p>...</p> }
)

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithCustomLoading />
      <p>这里是主页!</p>
    </div>
  )
}

export default Home
```



## 不使用 SSR

```js
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import( '../components/hello3' ),
  { ssr: false }
)

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithNoSSR />
      <p>这里是主页</p>
    </div>
  )
}

export default Home
```




# 自定义 `<App>`

案例:

- [Use `_app.js` for layout](https://github.com/zeit/next.js/blob/master/examples/with-app-layout)
- [Use `_app.js` to override `componentDidCatch`](https://github.com/zeit/next.js/blob/master/examples/with-componentdidcatch)



Next.js 使用 `App` 组件来初始化页面. 你可以重写该组件, 并控制页面的初始化. 这样你可以创造性的完成类似于:






- 在页面切换的间隙保持布局效果
- 在页面导航切换时保持状态数据
- 使用 `componentDidCatch` 来自定义错误处理
- 在页面中注入附加数据 ( 例如处理 GraphQL 查询等 )



要重写该组件, 只需要创建 `./pages/_app.js` 文件, 并按照下面的方式修改 App 类即可:

```js
import React from 'react'
import App from 'next/app'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  // 如果你的应用中, 每一个单页面初始化都需要请求数据 ( 即含有阻塞的数据请求 ), 只需将该注释移除即可.
  // 但是它会使得无法自动进行页面的静态优化, 这是因为应用中的每一个页面都是服务端渲染的.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   // 调用 页面 的 `getInitialProps` 方法, 并填充 `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render () {
    const { Component, pageProps } = this.props;
    return <Component { ...pageProps } />
  }
}

export default MyApp
```




> 注意: 在 App 中实现自定义 `getInitialProps` 方法会导致自动的预渲染.





# 自定义 `<Document>`

案例:

- [Styled components custom document](https://github.com/zeit/next.js/blob/master/examples/with-styled-components)



自定义 `<Document>` 可以很方便的扩展应用中的 `<html>` 和 `<body>` 标签的功能. 它是很有必要的, 因为 Next.js 的 pages 都会绕过文档标签周围的定义内容.


This allows you to support Server-Side Rendering for CSS-in-JS libraries like styled-components or emotion. Note, styled-jsx is included in Next.js by default.

它使得你可以使用一些用于服务端渲染的 CSS-in-JS 的库. 例如 [styled-components](https://github.com/zeit/next.js/tree/canary/examples/with-styled-components) 
或 [emotion](https://github.com/zeit/next.js/tree/canary/examples/with-emotion). 
实际上, 在 Next.js 中默认是支持 [styled-jsx](https://github.com/zeit/styled-jsx) 的.




自定义 `<Document>` 同样支持 `getInitialProps` 方法, 用来支持服务端渲染的异步数据请求.





> **注意:** `<Document>` 的 `getInitialProps` 方法不会在客户端跳转的过程中调用, 也不会在页面自动预渲染的时候调用.
>
> **注意:** 在 `getInitialProps` 方法中使用 `cte.req` / `ctx.res` 的时候, 需要判断其是否有定义. 
> 因为, 由 next 静态导出的页面, 和自动预加载的页面 ( 静态优化 ), 其方法中这些变量是 `undefined`.



要使用自定义的 `<Document>`, 首先需要创建一个文件 `./pages/_document.js`, 然后扩展文档类:

```js
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
// _docuemnt 只会在服务端进行渲染, 不会在客户端运行. 因此事件处理方法, 例如 onClick 等不能定义与该文件中.

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document' 

class MyDocument extends Document {
  static async getInitialProps( ctx ) {
    const initialProps = await Documnet.getInitialProps( ctx );
    return { ... initialProps }
  }

  render() {

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```



所有必须的组件, 如: `<Html />`, `<Head />`, `<Main />`, 以及 `<NextScript>` 等, 都会在页面中合适的时机被渲染.



**注意: 在 `<Main />` 组件外的其他 React 组件都不会在浏览器中被渲染处理. 因此不要在这里添加任何应用逻辑. 如果你需要在页面中提供公共组件 ( 例如 导航 或 工具栏 等 ), 可以考虑使用 `<App>` 组件.**



所有 `getInitialProps` 钩子函数中的参数 ctx 都是一样的, 以及一个附加方法:



- `renderPage`( `Function` ) - 一个回调函数, 该函数会被实际的 React 渲染逻辑调用 ( 同步执行 ). 使用该方法, 使得在服务端渲染中实现类似与 Aphrodite 的 `readerStatic` 方法会很方便.



## 自定义 `renderPage`



🚧 请注意. 实现自定义 `renderPage` 的唯一目的是为了在服务端渲染时, 应用中需要使用 css-in-js 的库. 🚧



- 它提供一个参数对象来实现进一步配置:
  
```js
import Document from 'next/document'

class MyDocument extends Document {
  static async getInitialProps( ctx ) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => 
      originalRenderPage( {
        // useful for wrapping the whole react tree 包装 所有的 React tree 很有用
        enhanceApp: App => App,
        // useful for wrapping in a per-page basis 包装 pre-page 含有用
        enhanceComponent: Component => Component
      } )
    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    // 运行父组件的 `getInitialProps` 方法, 并将包含自定义 `renderPage` 的 `ctx` 作为参数传入
    const initialProps = await Document.getInitialProps( ctx )

    return initialProps
  }
}

export default MyDocument
```




# 自定义错误处理



在客户端和服务端, 404 和 500 的错误都由 `error.js` 组件来处理. 若你想要自定义处理过程, 可以在文件夹下创建 `_error.js` 来重写:



⚠️ `pages/_error.js` ️组件只会用于生产环境. 在开发环境中, 你会得到一个带有函数调用栈的错误信息, 以便定位错误的位置. ⚠️

```js
import React from 'react'

function Error( { statusCode } ) {
  return (
    <p>
      { statusCode
          ? `在服务端发生 ${statusCode} 异常`
          : `在客户端发生异常` }
    </p>
  )
}

Error.getInitialProps = ( { res, err } ) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null
  return { statusCode }
}

export default Error 
```




# 复用内置错误页



若你想要使用内置错误页进行渲染, 那么只需要使用 `next/error`: 

```js
import React from 'react'
import Error from 'next/error'
import fetch from 'isomorphic-unfetch'

const Page = ( { errorCode, stars } ) => {
  if ( errorCode ) {
    return <Error statusCode={ errorCode } />
  }

 return <div>Next Stars: { stars }</div>
}

Page.getInitialProps = async () => {
  const res = await fetch( 'https://api.github.com/repos/zeit/next.js' )
  const errorCode = res.statusCode > 200 ? res.statusCode : false
  const json = await res.json()

  return { errorCode, stars: json.stargazers_count }
}

export default Page
```



如果你已经创建了自定义错误处理页面, 那么你只能通过导入 你自己的 `_error` 组件来代替 `next/error`.




如果你想将文本消息和状态码作为参数传入, Error 组件还支持 `title` 属性.





# 自定义配置



要使用 Next.js 高级特性, 你可以在项目的根目录下创建 `next.config.js` 文件 ( 与 `pages/` 与 `package.json` 同目录 )



注意: `next.config.js` 是标准的 Node.js 模块, 不是一个 JSON 文件. 它会在 Next 服务阶段或编译阶段被使用, 而不会在浏览器中使用到它.


```js
// next.config.js
module.exports = {
  /* 配置选项放在这里 */ 
}
```

或者使用函数

```js
module.exports = ( phase, { defaultConfig } ) => {
  return {
    /* 配置选项放在这里 */
  }
}
```



`phase` 是加载当前配置的上下文. 你可以在这里配置所有的 phase: 
[常量](https://github.com/zeit/next.js/tree/canary/packages/next/next-server/lib/constants.ts) phase 可以通过 `next/constants` 来导入:


```js
const { PHASE_DEVELOPMENT_SERVER } = require( 'next/constants' )

module.exports = ( phase, { defaultConfig } ) => {
  if ( phase === PHASE_DEVELOPMENT_SERVER ) {
    return {
      /* 开发环境的配置写在这里 */
    }
  }

  return {
    /* 除了开发环境外的所有配置都写在这里 */
  }
}
```



## 配置自定义编译路径



你可以为编译指定一个目录的名字. 例如, 下面的配置会创建一个 `build` 文件夹来代替 `.next` 文件夹.
如果没有这一段配置, next 会创建一个 `.next` 文件夹.

```js
// next.config.js
module.exports = {
  distDir: 'build'
}
```



## 禁止生成 etag



根据缓存策略, 可以禁止为 HTML 页面生成 etag. 如果不去配置, Next 会为每一个页面都生成 etag.

```js
// next.config.js
module.exports = {
  generateEtags: false.
}
```



## 配置 onDemandEntries



Next 提供了一些配置, 使你可以控制服务端如何处理编译的内存页, 如何释放或驻留与内存中:

```js
module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    // 服务器缓存页面的时间 ( 单位毫秒 )
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    // 同时保存但不处理的页面数量
    pageBufferLength: 2,
  }
}
```



这仅仅是开发模式下的特征. 如果你想在 生产模式下缓存 SSR 页面, 请参考 [SSR-caching](https://github.com/zeit/next.js/tree/canary/examples/ssr-caching) 案例.




## 为页面处理配置扩展名查询



目的类似于 `@next.mdx` 模块, 它增加了对后缀名为 `.mdx` 文件的支持. `pageExtensions` 允许你对 `pages` 目录下的特定后缀名的文件进行处理.

```js
// next.config.js
module.exports = {
  pageExtensions: [ 'mdx', 'jsx', 'js' ],
}
```



## 配置 build ID



Next.js 会在编译的时候生成一个常量, 来对提供服务的应用程序进行唯一标识. 这样在多服务器开发中, 同时在多个服务运行 `next build` 时会出现问题.
为了保证在编译时使用静态的编译 id, 你可以提供 `generateBuildId` 来控制 编译 ID 的生成:

```js
// next.config.js
module.exports = {
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    // 例如 在这里获得最后一次的 git 提交的 hash 值
    return 'my-build-id'
  }
}
```



要回到默认的生成唯一标识的方式, 只需要在函数中返回 `null` 即可:

```js
module.exports = {
  genderateBuildId: async () => {
    // When process.env.YOUR_BUILD_ID is undefined we fall back to the default/
    // 如果 process.env.YOUR_BUILD_ID 未定义, 那么就使用默认的方式
    if ( process.env.YOUR_BUILD_ID ) {
      return process.env.YOUR_BUILD_ID
    }

    return null
  },
}
```



## 配置 next 的脚本



你可以在 `next` 的 CLI 命令中添加任何 node 参数

```sh
NODE_OPTIONS="--throw-deprecation" next
NODE_OPTIONS="-r esm" next
NODE_OPTIONS="--inspect" next
```
,



# 自定义 webpack 配置

案例:

- [Custom webpack bundle analyzer](https://github.com/zeit/next.js/blob/master/examples/with-webpack-bundle-analyzer)



通常一些特殊的功能是作为模块来提供的:

- [@zeit/next-css](https://github.com/zeit/next-plugins/tree/master/packages/next-css)
- [@zeit/next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass)
- [@zeit/next-less](https://github.com/zeit/next-plugins/tree/master/packages/next-less)
- [@zeit/next-preact](https://github.com/zeit/next-plugins/tree/master/packages/next-preact)
- [@zeit/mdx](https://github.com/zeit/next.js/tree/canary/packages/next-mdx)




> **警告:** webpack 函数会被执行两次. 一次在服务端, 一次在客户端. 这表示, 你可以使用 `isServer` 属性来分别为客户端和服务端提供不同的配置.



可以使用合并函数将多个配置合并到一起. 例如:

```js
const withMDX = require( '@next/mdx' )
const withSass = require( '@next/next-sass' )

module.exports = withMDX( 
  withSass( {

    webpack( config, options ) {
      // 自定义的配置写在这里
      return config
    },

  } )
)
```



为了扩展 `webpack` 的用法, 可以借助于 `next.connfig.js` 的配置来定义函数来进行扩展 webpack. 

```js
// next.config.js is not transformed by Babel. So you can only use javascript features supported by your version of Node.js.
// next.config.js 不会被 babel 转换. 因此你只能使用 当前 Node 版本支持的 JavaScript 特性.

module.exports = {
  webpack: ( config, { buildId, dev, isServer, defaultLoaders, webpack } ) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    // 注意: 我们已经提供了 webpack, 因此你不需要 `require` 它
    // 执行自定义的 webpack 配置
    // 重要: 返回修改的 config

    // 例如使用 webpack 选项
    config.plugins.push( new webpack.IgnorePlugin( /\/__tests__\/// ) )
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    // 执行自定义 webpack 开发中间件 配置
    // 重要" 返回修改的 config
    return config
  }
}
```



传入 webpack 的第二个参数是一个对象. 它含有用于自定义配置的诸多有用的属性:








- `buildId` - `String` 表示编译 ID, 用于在编译中进行唯一标识.
- `dev` - `Bollean` 显示是否在开发模式下进行编译.
- `isServer` - `Boolean` 表示配置的结果是否会被使用在服务端 ( `true` ), 或客户端 ( `false` )
- `defaultLoaders` - `Object` 用于 next.js 内部的保留 loader 对象. 因此你也可以在自定义配置中使用这些 loader 对象.
  - `babel` - `Object` 用于 Next.js 的 `babel` 配置


`defaultLoaders.babel` 的使用案例:

```js
// Example next.config.js for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/zeit/next.js/tree/canary/packages/next-mdx
// next.config.js 添加 基于 babel-loader 的 loader 范例
// 该代码来自于 `@next/mdx` 插件的源代码: 
// https://github.com/zeit/next.js/tree/canary/packages/next-mdx

module.exports = {
  webpack: ( config, options ) => {
    config.module.rules.push( {
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '#mdx-js/loader',
          options: PluginOptions.options
        },
      ],
    } )

    return config
  },
}
```



# 自定义 babel 配置

案例:

- [Custom babel configuration](https://github.com/zeit/next.js/blob/master/examples/with-custom-babel-config)



为了扩展 `babel` 的使用, 可以简单的在项目根目录创建 `.babelrc` 文件. 该文件是可选的.



如果存在该文件, 则默认使用该文件的配置. 因为还需要定义 next 需要的其他内容, 例如 `next/babel` 的 preset.



这样处理是为了让你在修改 babel 配置时不至于感到陌生.



这里有一个 `.babelrc` 文件的案例:

```json
{
  "presets": [ "next/babel" ],
  "plugins": []
}
```



在 `next/babel` 预处理包中包含装换 React 应用所需要的所有包. 它包括:

- preset-env
- preset-react
- preset-typescript
- plugin-proposal-class-properties
- plugin-proposal-object-rest-spread
- plugin-transform-runtime
- styled-jsx



这些预处理/插件**不需要**加到你定义的 `.babelrc` 文件中. 但是, 你可以在 `next/babel` 预处理包中配置它们:

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {},
        "class-properties": {}
      }
    ],
  ],
  "plugins": []
}
```



`preset-env` 中的 `modules` 选项应该为 `false`, 否则 webpack 的代码分割会被禁用.





# 导出配置到 服务 / 客户端



在应用的配置项中有一些公共的部分需要导出.



Next.js 有两种方法可以导出:




- 编译时配置
- 运行时配置



## 编译时配置



编译时配置时通过将 提供的值传入到 JavaScript 包中来实现的.



可以在 `next.config.js` 中添加名为 `env` 键:

```js
// next.config.js
module.exports = {
  env: {
    customKey: 'value',
  },
}
```



这样, 你就可以在代码中使用 `process.env.customKey` 了, 例如:

```js
// pages/index.js
function Index() {
  return <h1>customKey 的值为: { process.env.customKey }</h1>
}

export default Index
```



> **警告:** 需要注意, process.env 变量是不允许解构的, 这是因为在编译时 webpack 的 `DefinePlugin` 是逐行替换 process.nev.XXX.

```js
// 不成功
const { CUSTOM_KEY, CUSTOM_SECRET } = process.env;
AuthMethod( { key: CUSTOM_KEY, secret: CUSTOM_SECRET } )

// 可以成功运行, 会在行内进行替换
AuthMethod( { key: procress.env.CUSTOM_KEY, secret: process.env.CUSTOM_SECRET } )
```




## 运行时配置





> **警告:** 需要注意的是 在 `target: 'serverless'` 的时候该选项是不能使用的.
> **警告:** 通常都会使用编译时配置. 这是因为使用运行时配置渲染和初始化都会消耗更多的资源, 同时它与自动预渲染不兼容.



`next/config` 模块提供了支持, 使得你可以在 `next.config.js` 文件中访问 `publicRuntimeConfig` 和 `serverRuntimeConfig`. 



属性 `serverRuntimeConfig` 会覆盖所有服务端运行配置项. 



属性 `publicRuntimeConfig` 会覆盖在客户端和服务端可以被访问的所有配置项.



> 注意: 在 `publicRuntimeConfig` 中配置的页面必须使用 `getInitialPropos` 方法来禁用自动预渲染.
> 你还可通过定义带有 `getInitialProps` 方法的 `<App>` 组件优化应用程序的入口.


```js
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    // 只用于服务端
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // 通过 env 变量传入 ( Pass through env variables )
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    // 在客户端和服务端都可以被使用
    staticFolder: '/static' 
  },
}
```

```js
// pages/index.js
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
// 只会获得 next.config.js 中的 serverRuntimeConfig 和 publicRuntimeConfig, 别无其他.
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

console.log( serverRuntimeConfig.mySecret ) // 只有在服务端可以使用 ( Will only be available on the server side )
console.log( publicRuntimeConfig.staticFolder ) // 在客户端和服务端都可以使用 ( Will be available on both server and client )

function MyImage() {
  return(
    <div>
      <img src={ `${publicRuntimeConfig.staticFolder}/logo.png` } alt="logo"/>
    </div>
  )
}

export default MyImage
```




# 使用指定 hosename 启动服务



要使用不同于默认的 hostname 来启动开发服务器, 你看在 next dev 命令中使用 `--hosename 指定的hosename` 或 `-H 指定的hosename` 选项.
这样会开启一个 TCP 服务器来监听指定主机名上的连接.




# 通过资源前缀使用 CND



要设置 CDN, 你可以先设置 `assetPrefix` 然后配置 CDN 的源, 以便 Next.js 部署的网站可以使用该资源.

```js
const isProd = process.env.NODE_DEV === 'production'
module.exports = {
  // 或许你只需在生产环境中添加 assetPrefix ( You may only need to add assetPrefix in the production. )
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : ''
}
```



注意: Next.js 会在加载的脚本中自动使用前缀. 但是无论怎么处理, 对 `/static` 中的资源都不起作用. 如果你想使用 CND 来覆盖这些资源, 那么需要引入自定义前缀.
这里有[一个案例](https://github.com/zeit/next.js/tree/master/examples/with-universal-configuration-build-time)介绍了一种引入前缀的方法.
这种方法可以在组件内部使用前缀, 并跟随环境变量而变化.



如果你的 CDN 使用独立的域名, 并且你希望使用 [CORS 跨域](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 来请求资源, 
那么你可以为选项添加配置:

```js
// next.config.js
module.exports = {
  crossOrigin: 'anonymous'
}
```



# 自动预处理



如果页面中没有阻塞的数据请求, Next.js 会自动判断页面为静态的 ( 即可预渲染 ). 该判断来源于页面中是否含有 `getInitialProps` 方法.



如果页面中含有 `getInitialProps` 方法, Next.js 不会预渲染这个页面. 此时, Next.js 会使用默认的处理方式, 在请求的时候先请求数据在渲染页面 ( 即 服务端渲染 ).



如果页面中缺少 `getInitialProps` 方法, Next.js 启用**静态优化**, 将这个页面预渲染为静态 HTML 文件. 
在预渲染过程中, 如果在这个阶段没有提供任何查询 ( `query` ) 参数等信息, 那么路由参数对象就为空.
在客户端访问时, 查询 ( `query` ) 参数才会被传入.



这一特征, 使得 next.js 在响应请求时会发送缓和数据, 其中含**服务端渲染的页面以及静态页面**. 这样保证了**默认情况下** Next.js 总是以**最快的方式**返回请求的数据.



> 注意: 静态页面依旧保持着可交互性: Next.js 给客户端页面提供完全充分的可交互性.



这一特征带来了很多好处. 例如, 优化后的页面不需要服务端的处理, 并且可以通过 CDN 立即响应给用户.



结果是你的用户会体验到极快的加载速度.



`next build` 会发送 `.html` 文件 静态优化的页面, 结果会使用一个名为 `.next/server/static/${BUILD_ID}/about.html` 文件来代替 `.next/server/static/${BUILD_ID}/about.js`.
这一行为与 `target: 'serverless'` 类似.



显然, 原生 Next.js 服务 ( `next start` ) 和 利用 API 编程来启用 ( `app.getRequestHandler()` ) 都支持这个编译输出的特征.
这不需要任何配置, 不需要编写任何处理函数.







> **注意:** 如果你在自定义 `<App>` 组件中使用了 `getInitialProps` 方法, 那么该优化会被禁用.
>
> **注意:** 如果你在自定义组件 `<Document>` 中使用了 `getInitialProps` 方法, 假定页面在服务端渲染时需要判断 `ctx.req` 是有定义. 因为在预渲染页面中 `ctx.req` 为 `undefined`.




# 自动预处理指示器



当页面支持预渲染的时候会显示一个指示器, 你可以通过该指示器了解到页面是否可以预渲染.
这在预渲染优化中是非常有用的, 在开发中你可以实时了解到页面是否支持预渲染优化.
关于预渲染优化可以参考前面的章节.




在某些特殊环境下, 指示器不起作用. 例如在 electron 应用中. 那么你可以修改 next.config.js 配置文件来禁用该指示器功能.


```js
module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
}
```




# 生产环境部署



如果你不希望运行 `next`, 而是编译为生产环境来使用, 那么你需要先配置部署. 那么编译和运行的命令是分开的:

```sh
next build
next start
```



使用 [ZEIT Now](https://zeit.co/now) 配置部署 Next.js 可以参考 
[ZEIT 的 Next.js 开发指南](https://zeit.co/guides/deploying-nextjs-with-now/) 
或 
[Next.js 教程中的在 ZEIT Now 中的配置部署方法](https://nextjs.org/learn/basics/deploying-a-nextjs-app/deploying-to-zeit-now)



可以将 Next.js 部署到其他服务中. 具体内容请查阅 Wiki 中的[配置部署部分 ( `Deployment` )](https://github.com/zeit/next.js/wiki/Deployment).



注意: `next` 的子命令会在适当的时候设置 `NODE_NEV` 的值. 如果没有, 是为了最大化性能. 
若你需要以[编程的方式](https://nextjs.org/docs#custom-server-and-routing)来使用 Next.js, 那么你需要手动配置 `NODE_ENV=production`. 




注意: 我们建议你在 `.ginignore` 或 `.npmignore` 文件中添加 `.next` 或你自定义的 生成目录. 
页可以, 使用 `files` 或 `now.files` 来配置你想要部署文件的白名单, 并排除 `.next` 或你自定义的生成目录.



# 压缩



Next.js 提供了 [gzip](https://tools.ietf.org/html/rfc6713#section-3) 工具来压缩已经渲染的内容和静态页. 
压缩只会在服务端 ( `server` ) 运行. 但是, 通常会使用项 [nginx](https://www.nginx.com/) 这类 HTTP 的代理软件来开启压缩功能, 
这样就可以减少 node.js 中处理压缩等行为对 cpu 资源的消耗.




关闭 Node.js 中的压缩功能, 只需要在 `next.config.js` 中设置 `compress`  为 `false` 即可:

```js
// next.config.js
module.exports = {
  compress: false,
}
```





# Serverless 部署

案例:

- [now.sh](https://github.com/zeit/now-examples/tree/master/nextjs)
- [anna-artemov.now.sh](https://github.com/TejasQ/anna-artemov.now.sh)
- 我们鼓励在此处添加更多案例



Serverless 部署可以显著改善应用的可靠性和可扩展性, 它将你的应用分解为更小的部分( 也称为 [lambda](https://zeit.co/docs/v2/deployments/concepts/lambdas/) 调用 ). 
在 Next.js 案例中, 每一个 `pages` 目录中的页面都是 serverless 中的 lambda.




链接中讨论了在 Express 的上下文中使用 serverLess 的诸多好处. 当然其中处理方式可以移植到其他环境中.
serverless 支持分布式故障点, 无限扩展, 以及可以支撑起 "你能使用的所有技术".
( 译注: 总感觉翻译怪怪的 )





要在 Next.js 中其启用 **serverless 模式**, 只需要在 `next.config.js` 配置文件中将编译选项 `target` 设置为 `serverless` 即可:

```js
// next.config.js
module.exports = {
  target: 'serverless',
}
```



`serverless` 的选项使每一个页面都生成单个 lambda 或 HTML 文件. 这个文件是完全独立的, 运行时不需要加载任何依赖:






- `pages/index.js` => `.next/serverless/pages/index.js`
- `pages/about.js` => `.next/serverless/pages/about.js`
- `pages/blog.js` => `.next/serverless/pages/blog.html`



Next.js 的 serverless 的函数签名类似于 Node.js 中 HTTP 服务的回调函数:

```js
export function render( req: http.IncomingMessage, res: http.ServerResponse ) => void
```





- [http.IcomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
- [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- `void` 的函数没有返回值, 或者说返回值为 JavaScript 中的 `undefined`. 调用该函数会处理请求.




静态文件的访问方式与原来一样. 请阅读 [自动预渲染章节](https://nextjs.org/docs#automatic-prerendering), 这样你可以了解到更多的内容, 包括如何修改默认配置.



使用 serverless, 你可以将 next.js 项目部署到 [ZEIT Now](https://zeit.co/now) 中, 并使用其所有的特性, 这就像案例中的那样容易.
[自定义路由](https://zeit.co/guides/custom-next-js-server-to-routes/), 缓存头等. 
请查阅 [ZEIT 指南: 使用 Now 部署 Next.js 项目](https://zeit.co/guides/deploying-nextjs-with-now/) 来了解更多内容.




## 底层方法



Next.js 提供了底层 API 来支持在具有不同函数签名的主机环境上部署. 一般, 你会封装从兼容层得到的 Next.js serverless 的输出内容.



例如, 如果平台支持 Node.js 的 `http.Server` 类:

```js
const http = require( 'http' )
const page = require( './.next/serverless/pages/about.js' )
const server = new http.Server( ( req, res ) => page.render( req, res ) )
server.listen( 3000, () => console.log( '监听 http://localhost:3000' ) )
```



对于其他环境, 请参考[上面的案例部分](https://nextjs.org/docs#serverless-deployment).



## 小结










- 底层 API 实现 serverless 部署
- 每一个 `pages` 目录下的页面文件都会变成 serverless 函数 ( lambda )
- 创建最小的 serverless 函数 ( 基于 zip 压缩为 50Kb )
- 优化[冷启动](https://zeit.co/blog/serverless-ssr#cold-start)函数
- serverless 函数 0 依赖 ( 依赖的内容都会包含在打包的函数中 )
- 使用 Node.js 的 [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 和 [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- 在 `next.config.js` 中配置 `target: 'serverless'` 即可使用
- 在执行函数的时候不会加载 `next.config.js`. 这也就表示不支持 `publicRuntimeConfig` / `serverRuntimeResponse`




# 浏览器支持



Next.js支持 IE11 以及所有现代浏览器, 开箱即用 `@babel/preset-env`. 为了支持 IE11, Next.js 添加了一个全局 `Promise` 垫片 ( polyfill ).
这样, 在你的代码或使用 npm 维护的代码中如果使用了 当前浏览器不支持的特征, 那么垫片就起作用了.



[垫片](https://github.com/zeit/next.js/tree/canary/examples/with-polyfills)的示范案例提供了一个实现垫片的推荐方法.




# TypeScript



Next.js 提供了一个开箱即用 TypeScript 的解决方案, 类似与 IDE 一样.



要使用它, 可以在项目的根目录创建一个空的 配置文件 `tsconfig.json`:

```sh
touch tsconfig.json
```



Next.js 会自动设置该配置文件的内容 ( 也支持使用你在 tsconfig.json 中设置好的配置 ).



然后, 执行 `next dev` ( 一般会使用 `npm run dev` ), 那么 Next.js 会指导你安装需要的包来完成配置.

```sh
npm run dev

# You'll see instructions like these:
#
# Please install typescript, @types/react, and @types/node by running:
#
#         yarn add --dev typescript @types/react @types/node
#
# ...
```



下面你就可以开始将 `.js` 文件转换成 `.tsx` 文件了, 然后就可以享受 TypeScript 所代理的特性了.



学习 TypeScript 请查阅[文档](https://www.typescriptlang.org/).






> 注意: 在项目的根目录, Next.js 会创建一个名为 `next-env.d.ts` 的文件. 这个文件是 TypeScript 编译器对代码类型进行检查的依据.
> 你不能删除该文件, 但是可以编辑它 ( 但实际上没有这个必要 )
> 注意: Next.js 默认未开启 TypeScript 的严格模式 ( `strict` mode ). 如果你习惯使用 TypeScript, 或许你需要在 `tsconfig.json` 中开启它的配置.




# 导出类型



`Next.js` 提供了 NextPage 类型, 该类型可以使用在 `pages` 目录下的所有页面中.
并且, `NextPage` 类型中含有 `getInitialProps` 的定义, 因此在使用它的时候不需要引入其他类型.

```ts
import { NextPage } from 'next'

interface Props {
  userAgent?: string
}

const Page: NextPage<Props> = ( { userAgent } ) => (
  <main>你的 user agent 为: { userAgent }</main>
)

Page.getInitialProps = async ( { req } ) => {
  const userAgent = req ? req.headers[ 'user-agent' ] : navigator.userAgent
  return { userAgent }
}

export default Page
```



在 `React.Component` 中, 你可以使用 `NextPageContext`: 

```ts
import React from 'react'
import { NextPageContext } from 'next'

interface Props {
  userAgent?: string
}

export default class Page extends React.Component<Props> {
  static async getInitialProps ( { req }: NextPageContext ) {
    const userAgent = req ? req.headers[ 'user-agent' ] : navigator.userAgent
    return { userAgent }
  }

  render () {
    const { userAgent } = this.props
    return <main>你的 user agent 为: { userAgent }</main>
  }
}
```



# 支持 AMP

案例: 

- [amp](https://github.com/zeit/next.js/tree/canary/examples/amp)



# 启用对 AMP 的支持



要在页面中启用 AMP 功能, 只需要在页面中导出 `export const config = { amp: true }` 即可.





# 第一个 AMP 页面

```js
// pages/ about.js
export const config = { amp: true }

export default function AboutPage( props ) {
  return <h3>My AMP About Page</h3>
} 
```

# Hybrid AMP Page

```js
// pages/hybird-about.js
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

export default function AboutPage( props ) {
  return (
    <div>
      <h3>My AMP Page</h3>
      {
        useAmp() ? (
          <amp-img 
            width="300"
            height="300"
            src="/my-img.jpg"
            alt="a cool image"
            layout="responsive"
          />
        ) : (
          <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
        )
      }
    </div>
  )
}
```



# AMP 页面模式



AMP 页面有两种模式可供选择:




- AMP 模式 ( 默认 )
  - 页面中不包含 Next.js 或 React 客户端运行时
  - [AMP 优化器](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer)会自动的优化页面, 这个优化器与 AMP 缓存是一样的 ( 可以提升 42% 的性能 )
  - 页面会有用户访问版本 ( 优化后的 ) 和搜索引擎索引版本 ( 未优化的 )
  - 只需要 `export const config = { amp: true }` 即可实现
- Hybrid 模式
  - 页面可以被渲染成传统的 HTML ( 默认 ), 也可以是 AMP HTML ( 只需要在 url 上添加 `?amp=1` 即可 )
  - AMP 的页面只有和 AMP 优化器在一起使用才会有优化作用, 因此页面可以被搜索引擎索引
  - 只需要 `export const config = { amp: 'hybrid' }` 即可实现
  - 使用 `next/amp` 中的 `useAmp` 即可区分不同的模式

页面的两种模式都给用户利用搜索引擎访问页面提供了快速的用户体验.




# `next export` 与 AMP



在使用 `next export` 来进行页面静态预渲染的时候, next.js 会判断页面是否支持 AMP, 并且会基于此调整导出的内容.



Hybrid AMP 模式 ( 例如 `pages/about.js` 页面 ) 会输出: 




- `out/about.html` - 其中含有 客户端 React 运行时
- `out/about.amp.html` - AMP 页面



AMP 模式 ( 以 `pages/about.js` 为例 ) 会输出:



- `out/about.html` - 优化后的 AMP 页面



在导出的过程中, next.js 会自动判断页面是否为 Hybrid AMP 模式, 并将 AMP 版本嵌入到 `page.amp.html` 页面中.
我们还会为你默认添加 `<link rel="amphtml" href="/page.amp" />` 和 `<link rel="canonical" href="/" />` 标签.




> 注意: 在 `next.config.js` 中使用 `exportTrailingSlash: true` 时, 输出的内容会不一样. 
> 如果是 Hybrid AMP 模式, 则会输出 `out/page/index.html` 和 `out/page.amp/index.html`.
> 如果是 AMP 模式, 则会输出 `out/page/index.html`.



# 添加 AMP 组件



AMP 社区提供了很多可以提升 AMP 交互性的[组件](https://amp.dev/documentation/components/). 通过 `next/head`, 你可以在你的页面中使用到这些组件:

```js
// page/hello.js
import Head from 'next/head' 

export const config = { amp: true }

export default function MyAmpPage() {
  return (
    <div>
      <Head>
        <script 
          async 
          key="amp-timeago"
          src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"
        />
      </Head>

      <p>Some time: { date.toJSON() }</p>
      <amp-timeago
        width="0"
        height="15"
        datetime={ date.toJSON() }
        layout="responsive"
      >
        .
      </amp-timeago>
    </div>
  )
}
```



# AMP 校验



AMP 页面在开发过程中会使用 [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) 自动的进行校验.
在你使用 Next.js 的时候错误和警告都会通过终端打印出来.



页面也会在 `next export` 的时候进行校验. 会将所有的警告/错误输出到终端. 任何 amp 的错误都会使得 `next export` 提前结束. 因为 amp 校验没有成功, 所以会返回一个 `1` 状态码.




# 对 TypeScript 的支持



AMP 现在 没有 内置 的 ts 类型, 但是它的 roadmap ( .... ) 有
作为解决方案, 你可以手动添加类型到 amp.d.ts 就像这里


AMP 现在还不支持内置的 TypeScript 的类型, 但是 roadmap ([#13791](https://github.com/ampproject/amphtml/issues/13791)) 中有相关讨论.
作为这一解决方案, 你可以在 `amp.d.ts` 中手动添加类型, 就想[这个案例](https://stackoverflow.com/a/50601125)一样.





# 静态 HTML 导出

案例:

- [Static export](https://github.com/zeit/next.js/blob/master/examples/with-static-export)



使用 `next export` 来运行应该是使用 next.js 来运行程序的多种方式中的一种, 它会以独立的静态 APP 的形式运行, 而不需要启用 node.js 中的服务.
而导出的 app 依然支持几乎所有的 Next.js 特性, 包括动态 URL, 预渲染, 预加载和动态导入.



`next export` 的工作方式是将所有可转换为 HTML 的页面都进行预渲染. 它是基于`路径` ( `pathname` ) 映射, 基于键到页面对象映射的. 这个映射被称为 `exportPathMap`.



页面对象含有两个数据:




- `page` - `String` 类型. 表示 `pages` 路径下需要渲染的页面路径
- `query` - `Object` 类型. 渲染时传入到 `getInitialProps` 方法中的查询对象, 默认为 `{}`.




# 使用方法



就像你正常使用使用 Next.js 开发你的 APP 一样简单. 只需要运行:

```sh
next build
next export
```



默认下 `next export` 不需要任何配置. 它会生成默认的 `exportPathMap`, 其中包含 `pages` 路基下页面的路由数据.
在下面的案例中, 使用默认路由映射 `defaultPathMap`.



如果你的 app 使用动态路由, 那么你可以在 `next.config.js` 中添加 `exportPathMap` 项. 它是一个异步函数, 使用参数即可获得 默认的 `exportPathMap`.

```js
// next.config.js
module.exports = {
  exportPathMap: async function ( 
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/readme.md': { page: '/readme' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
}
```



页面就会被导出成 html 文件. 例如, `/about` 会变成 `/about.html`.




你可以配置 next.js 将页面都导出为 `index.html` 文件, 并使用带有斜线的方式进行访问. 例如 `/about` 会转换为 `/about/index.html`, 并且使用 `/about/` 来路由.
这一方式是 Next.js 9 之前的默认处理方式. 你可以按照下面的案例, 在 `next.config.js` 中配置选择使用以前的方式:

```js
// next.config.js
module.exports = {
  exportTrailingSlash: true,
}
```



> **注意:** 如果导出路径是一个文件名 ( 例如: `/readme.md` ), 并且不是 `.html`. 那么你需要在服务端为该内容设置 `Content-Type` 头为 `text/html`.



第二个参数是一个对象:








- `dev` - 在开发模式下使用 `exportPathMap` 是为 `true`. 在 `next export` 运行时为 `false`. 开发模式下 `exportPathMap` 用于定义路由.
- `dir` - 项目根目录的绝对路径.
- `outDir` - `out/` 目录的绝对路径 ( 使用 `-o` 或 `--outdir` 可以修改配置 ). 在 `dev` 为 `true` 的时候 `outDir` 的值为 `null`.
- `distDir` - `.next/` 目录的绝对路径 ( 使用配置项 `distDir` 可以修改配置 ).
- `buildId` - 导出使用的 `buildId`.



简单的运行名为为: 

```sh
next build
next export
```



一般, 你需要在 `package.json` 文件中添加 npm 的运行脚本, 像这样:

```json
{
  "scripts": {
    "build": "next build",
    "export": "npm run build && next export"
  }
}
```



然后立即运行:

```sh
npm run export
```



然后, 在输出 ( `out` ) 目录下, 你就会得到应用的静态版本了.




> 你也可以自定义输出目录, 可以运行 `next export -h` 来获得帮助文档.



现在你可以将你的 `out` 目录部署到任何一个静态服务器上了. 
需要注意一下, 如果部署到 GitHub Pages 上还需要一个附加步骤, [文档在这里](https://github.com/zeit/next.js/wiki/Deploying-a-Next.js-app-into-GitHub-Pages).




例如, 进入 `out` 目录, 然后执行下面的命令, 就可以将你的项目部署到 [ZEIT now](https://zeit.co/now) 中.

```sh
now
```





,



# 限制



使用 `next export`, 会为你的应用生成一个 HTML 的版本. 在导出的时候, 页面会执行 `getInitialProps` 方法.



在非服务端渲染的导出过程中, 传入 `getInitialProps` 上下 ( `context` ) 文对象中的 `req` 和 `res` 字段是空对象.




> 注意: 如果你的页面中没有 `getInitialProps` 方法, 你可能根本就不需要 `next export`, 因为 `next build` 就已经足够了. 这归功于 [自动预渲染](#).
> 在静态导出后, 你无法再动态渲染 HTML 文件, 因为他们已经被编译了. 如果你想要使用动态渲染, 请使用 `next start` 或 自定义 服务端 API.





# 多端

案例:

- [With Zones](https://github.com/zeit/next.js/blob/master/examples/with-zones)



一个端是部署的一个独立的 Next.js 应用. 就好像, 你可以有多个应用, 然而你能将其合并成一个应用一样.



例如, 你有这样的两个端:




- 一个应用为 `/blog/**` 提供服务
- 另一个应用处理其他所有的页面请求



支持多端后, 你可以将所有的端组合成一个, 使你的用户使用同一个 URL 来访问它们. 但是你依旧可以独立的开发部署你的应用.




> 这个是和微服务相同的概念, 但是它是描述前端应用的.




# 如何定义一个端



没有和端相关的 API, 你只能按照下面的步骤处理:




- 确保 你的 app 中只有你需要的页面, 这表示 一个 app 不能从其他 app 中访问该页面. 即如果应用 `A` 中含有 `/blog`, 那么应用 `B` 中就不应该含有它.
- 确保添加 [assetPrefix](#), 以免与静态文件冲突.






# 如何组合它们



你可以使用 HTTP 代理来组合多个端.



你可以使用 now dev 就像在本地 开发服务器上, 它允许你简单的定义路由 给多个 app, 像这样

你可以像在本地开发服务器上一样使用 [noe dev](https://zeit.co/docs/v2/development/basics).
它可以非常简单的为每一个应用都定义路由, 就像这样:

```json
{
  "version": 2,
  "builds": [
    { "src": "docs/next.config.js", "use": "@now/next" },
    { "src": "home/next.config.js", "use": "@now/next" },
  ],
  "routes": [
    { "src": "/docs(.*)", "dist": "docs$1", "continue": true },
    { "src": "(?!/?docs)(.*)", "dist": "home$1", "continue": true },
  ]
}
```



在生产环境进行部署, 你也可以使用相同的配置, 运行 `now` 即可使用 [ZEIT Now](https://zeit.co/now) 来部署了.
或者, 你也可以使用配置代理服务器的方式, 使用和上面类似的路由集合来路由页面. 
例如, 你可以将 文档应用部署到 `https://docs.example.com` 上, 再将 home 应用部署到 `https://home.example.com` 上, 最后添加一个代理服务器, 将所有应用代理到 `https://example.com` 上.





# 参考

- [Setting up 301 redirects](https://www.raygesualdo.com/posts/301-redirects-with-nextjs/)
- [Dealing with SSR and server only modules](https://arunoda.me/blog/ssr-and-server-only-modules)
- [Building with React-Material-UI-Next-Express-Mongoose-Mongodb](https://github.com/builderbook/builderbook)
- [Build a SaaS Product with React-Material-UI-Next-MobX-Express-Mongoose-MongoDB-TypeScript](https://github.com/async-labs/saas)




# 常见问题



**它可以用于生产环境吗?**



Next.js 从一开始就为网站 `https://zeit.co` 提供支持.



我们着迷于开发的体验和终端用户的性能, 因此我们决定将其分享到社区里.






**它有多大?**



客户端的包可能取决于其安装的其他包的大小, 启用 gzip 压缩后, 最小的 Next 主文件包大概 65kb.





**它和 `create-react-app` 一样吗?**



是又不是.



说是, 那是因为它们都使你开发变得更容易.



说不是, 那是因为 Next 强化了一种结构, 这样我们就可以实现更多高级的东西. 例如:




- 服务端渲染
- 自动代码分割



另外, Next.js 还提供了两个内置的特征, 它们是每一个单页面网站的关键:




- 使用组件懒加载的方式来加载路由: `<Link>` ( 由 `next/link` 导入 )
- 修改 `<head>` 组件的一种方式: `<Head>` ( 由 `next/head` 导入 )



如果你要创建一个可复用的 React 组件, 并使它嵌入到你的 Next.js 应用中, 或其他 React 应用程序里, 那么使用 `create-react-app` 是比较明智的选择.
你可以最后再去导入 ( `import` ) 组件, 可以保证你代码结构的干净整洁.






**我在解决方案中如何使用 CSS-in-JS?**



Next.js 内置了 [styled-jsx](https://github.com/zeit/styled-jsx), 它支持作用域化的 css.
但是无论如何, 在你的 Next 应用中, 你能使用任何 CSS-in-JS 解决方案. 只要你像前文中提到的方法导入你喜欢的库即可.







**有哪些语法特征会被转换? 我该如何修改?**



我们遵循 V8 引擎. 在 V8 增加对 ES6 的广泛支持的时候, 例如 `async`, `await` 时, 我们就会将其转换. 在 V8 引擎还不支持 类装饰器的时候, 我们也不会转换该语法.



请查阅 [定制 babel 配置文件](https://nextjs.org/docs#customizing-babel-config) 和 `next/preset` 来获得更多信息.






**为什么是新路由?**



Next.js 有一些特点:





- 路由不需要提前设定好
- 路由总是懒加载的
- 顶级组件能包含 `getInitialProps` 方法的定义, 该方法应该阻塞路由加载 ( 在服务端渲染或懒加载中都一样 )

As a result, we were able to introduce a very simple approach to routing that consists of two pieces:

因此, 我们使用一个非常简单的方式去实现路由, 它包含两个部分: 




- 每一个顶级组件都接受 url 对象, 可以去检查 url 或修改历史记录等.
- `<Link />` 组件作为元素的容器, 例如处理客户端跳转的链接 ( `<a />` ) 等.





**我该如何定义一个漂亮的路由?**



Next.js 提供 开箱即用的 动态路由解决方案, 它允许你在 url 中使用漂亮的链接. 



你可以在[案例](https://github.com/zeit/next.js/tree/canary/examples/dynamic-routing)中了解到它是如何工作了.






**我如何获取数据?**



这取决于你自己. `getInitialProps` 是一个 `async` 函数 ( 也可以是返回 `Promise` 的标准函数 ).
它可以在其他地方获取数据.





**我可以使用 GraphQL 吗?**



当然! 这里有一个 [Apollo](https://github.com/zeit/next.js/tree/canary/examples/with-apollo) 的案例.






**我可以使用 Redux 和 thunk 吗?**



可以! 这里有一个[案例](https://github.com/zeit/next.js/tree/canary/examples/with-redux-thunk).






**我可以使用 Redux 吗?**

可以! 这里有一个[案例](https://github.com/zeit/next.js/tree/canary/examples/with-redux).





**我可以在 Next 中使用我喜欢的 JavaScript 库或工具吗?**

Since our first release we've had many example contributions, you can check them out in the examples directory.

在我们第一次发布 Next.js 以来, 我们已经有很多贡献者提供了很多案例, 你也可以在[案例](https://github.com/zeit/next.js/tree/canary/examples)目录中找到它.





**发这个的灵感在哪?**



我们要实现的很多目标都列在 Guillermp Rauch 的 富 Web 应用的 7 条原则里了.



ease-of-use of PHP 提供了一个非常重要的灵感. 我们认为在其他地方需要使用 PHP 来输出 HTML 的时候, 都可以使用 Next.js 来实现.



不同于 PHP, 我们得益于 ES6 的模块系统, 它可以使得每一个文件都返回一个组件或函数, 它使得组件或函数可以很容易的被加载到其他组件中, 来实现延迟求值或测试等.




我们在研究如何使用 React 来实现服务端渲染的时候, 没有陷入过多的方案选择中. 
我们发现了 [react-page](https://github.com/facebookarchive/react-page)( 已不推荐使用 ),
React 的作者 Jordan Walke 使用了一个类似于 Next.js 的解决方案.




# 贡献者



请参考我的 [contributing.md](https://github.com/zeit/next.js/tree/canary/contributing.md) 文件.




# 作者

- Arunoda Susiripala ([@arunoda](https://twitter.com/arunoda)) – [ZEIT](https://zeit.co/)
- Tim Neutkens ([@timneutkens](https://twitter.com/timneutkens)) – [ZEIT](https://zeit.co/)
- Naoyuki Kanezawa ([@nkzawa](https://twitter.com/nkzawa)) – [ZEIT](https://zeit.co/)
- Tony Kovanen ([@tonykovanen](https://twitter.com/tonykovanen)) – [ZEIT](https://zeit.co/)
- Guillermo Rauch ([@rauchg](https://twitter.com/rauchg)) – [ZEIT](https://zeit.co/)
- Dan Zajdband ([@impronunciable](https://twitter.com/impronunciable)) – Knight-Mozilla / Coral Project