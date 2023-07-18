import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// src别名
import path from "path";
const pathSrc = path.resolve(__dirname, "src");
// 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// ElementPlus
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// SVG
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      host: '127.0.0.1',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行后自动打开浏览器
      // 反向代理解决跨域
      proxy: {
        'http://localhost:666': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        },
        'http://127.0.0.1:666': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        },
      }
    },
    // src 路径别名配置
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        dts: path.resolve(pathSrc, "types", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    css: {
      // CSS 预处理器
      preprocessorOptions: {
          //define global scss variable
          scss: {
              javascriptEnabled: true,
              additionalData: `@use "@/styles/variables.scss" as *;`
          }
      }
  }
  };
});
