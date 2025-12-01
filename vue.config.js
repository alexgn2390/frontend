// https://cli.vuejs.org/ru/config/#vue-config-js
module.exports = {
  //mode: 'production',
  productionSourceMap: false,
  filenameHashing: true,
	assetsDir: './engine/assets/',
  indexPath: 'index.html',
  pwa: {
    name: 'nfitnity-app',
    themeColor: '#977FFF',
    msTileColor: '#976BFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',

    manifestOptions: {
      name: "nFitnity",
      short_name: "nFitnity",
      description: "Craft your personal workout plan in just 5 minutes with nFitnity! Master every move with our step-by-step text and video guides.",
      display: "standalone",
      theme_color: "#977FFF",
      background_color: "#FFFFFF",
      scope: "/",
      start_url: "/app",
      icons: [
        {
          src: "/engine/assets/ico/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/engine/assets/ico/android-chrome-384x384.png",
          sizes: "384x384",
          type: "image/png"
        }
      ]
    },

    //https://cli.vuejs.org/ru/core-plugins/pwa.htm
    workboxPluginMode: 'GenerateSW', //InjectManifest //GenerateSW
    workboxOptions: {
      //swSrc: 'service-worker.js',
      //swDest: 'sw.js',
      exclude: [
        /\.map$/,
        /\.xml$/,
        /\.txt$/,
        ///manifest$/,
        /\.htaccess$/,
        /\.js$/,
        /\.css$/
      ],
      include: [
        /\.html$/,
        /\.gif$/,
        /\.jpg$/,
        /\.png$/
      ],
      sourcemap: false,
      //importWorkboxFrom: "cdn",
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
    }
  },
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
          @import "@/engine/assets/scss/variables/Variables.scss";
        `,
			},
      css:{
        url: false
      }
		}
	}
}
