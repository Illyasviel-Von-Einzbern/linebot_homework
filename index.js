import 'dotenv/config'
import linebot from 'linebot'
// import commandUsd from './commands/usd.js'
// import commandFood from './commands/food.js'
// import commnadQr from './commands/qr.js'
import commandTaipeiFreeWiFi from './commands/TaipeiFreeWiFi.js'
// import commandiTaiwan from './commands/iTaiwan.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', (event) => {
  if (event.message.type === 'text') {
    event.reply('提供地理位置訊息即可得到距離你最近的五個TPE-WiFi的座標點ヽ(✿ﾟ▽ﾟ)ノ')
    // if (event.message.text === 'usd') {
    //   commandUsd(event)
    // } else if (event.message.text === 'qr') {
    //   commnadQr(event)
    // }
    // else if (
    //   event.message.text === 'iTaiwan' ||
    //   event.message.text === 'itaiwan' ||
    //   event.message.text === 'ITAIWAN' ||
    //   event.message.text === 'itw'
    // ) {
    //   commandiTaiwan(event)
    // }
  } else if (event.message.type === 'location') {
    // commandFood(event)
    commandTaipeiFreeWiFi(event)
  } else if (event.message.type !== 'text') {
    event.reply('目前只支援文字和地理位置訊息').catch((error) => {
      console.error(error)
    })
  }
})

bot.on('postback', async (event) => {
  console.log('postback', event)
  await event.reply(event.postback.data)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
