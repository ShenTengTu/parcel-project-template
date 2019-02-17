const Bundler = require('parcel-bundler')

const IsProd = process.env.NODE_ENV === 'production'
const entryFiles = [
  'index.pug'
]

// Some options use process.env.NODE_ENV to auto decide values
const options = {
  outDir: IsProd ? './dist' : './build', // 編譯後的檔案輸出路徑，預設為 dist
  cacheDir: IsProd ? '.cache/prod' : '.cache/dev', // 快取檔案目錄，預設為 .cache
  contentHash: IsProd, // 避免檔名含有的內文雜湊值
  scopeHoist: false, // 啟用實驗性質的 scope hoisting/tree shaking 功能，可減少 bundle 的大小
  target: 'browser', // browser/node/electron，預設為 browser
  https: false, // 定義一對金鑰及憑證。設定為 true 將自動產生，設定為 false 則改用 HTTP
  logLevel: 3, // 3 = 紀錄所有訊息 2 = 僅記錄錯誤及警告 1 = 僅紀錄錯誤
  hmr: !IsProd, // 於監看模式時啟用或停用模組熱替換(HMR)
  sourceMaps: !IsProd, // 是否啟用 sourcemaps，預設為啟用（在最小化編譯中尚不支援）
  detailedReport: !IsProd // 是否顯示更詳盡的報表。報表內容包括 bundle、資源、檔案大小及編譯時間等，預設為 false。報表僅在 watch 停用的情況下才會顯示
}

if (IsProd) {
  options.publicUrl = './' // must
}

async function runBundle () {
  // 使用進入點路徑及選項初始化 bundler
  const bundler = new Bundler(entryFiles, options)

  // 首次編譯開始時
  bundler.on('buildStart', entryPoints => {})

  // 首次完成編譯時
  bundler.on('bundled', (bundle) => {})

  // 每次編譯完成後
  bundler.on('buildEnd', () => {

  })

  // 編譯出錯時
  bundler.on('buildError', error => {
    console.log(error)
  })

  if (IsProd) bundler.bundle()
  else await bundler.serve(1234)
}

runBundle()
