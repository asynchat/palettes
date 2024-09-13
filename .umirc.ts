import { defineConfig } from "@umijs/max";

export default defineConfig({
  title: "Palettes",
  // outputPath: "",
  base: "/palettes/", 
  publicPath: "/palettes/", // end with '/'
  routes: [
    { path: "/", component: "index" }
  ],
  antd: {
    theme: {
      token: {
        colorPrimary: "#666666",
        colorTextBase: "#444444",
        colorLink: "#1890ff",
        // borderRadius: 2
      },
      components: {
        FloatButton: {
          // colorPrimary: '#C34582FF',
          colorTextBase: "#444444",
        },
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: "data",
  },
  codeSplitting: {
    // 加速JS访问
    jsStrategy: "granularChunks",
  },
  esbuildMinifyIIFE: true,
  proxy: {
    "/api/v1": {
      target: "http://localhost:8080/",
      changeOrigin: true,
      pathRewrite: { "^/api/v1": "api/v1" },
    },
  },
  npmClient: 'pnpm',
});