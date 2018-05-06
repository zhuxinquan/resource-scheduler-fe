export default {
  proxy: {
    "/*": {
      "target": "http://127.0.0.1:10086",
      "changeOrigin": true,
    }
  }
}
