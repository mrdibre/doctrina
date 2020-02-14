module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    }
  }
}
