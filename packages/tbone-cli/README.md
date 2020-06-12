# tbone-cli

## 使用

``` bash
npx tbone-cli init my-app

cd my-app
npm run mp     # 开发小程序
npm run web    # 开发 Web
npm run build  # 发布 Web
```

## 目录说明

### React

```bash
├─ build
│  ├─ mp     # 淘宝开发者工具指向的目录，用于生产环境
│  ├─ web    # web 编译出的文件，用于生产环境
├─ config
├─ public
├─ scripts
├─ src
│  ├─ assets
│  ├─ components    # 存放所有组件
│  ├─ log.js        # 入口文件，会 build 成  log.html
│  └─ index.js      # 入口文件，会 build 成  index.html
```

### Vue

```bash
├─ dist
│  ├─ mp     # 淘宝开发者工具指向的目录，用于生产环境
│  ├─ web    # web 编译出的文件，用于生产环境
├─ build
├─ src       # 项目业务代码
```

## License

[MIT](http://opensource.org/licenses/MIT)
