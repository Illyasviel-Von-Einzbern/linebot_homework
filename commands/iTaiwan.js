import axios from 'axios'
import { distance } from '../utils/distance.js'
import template from '../templates/food.js'
import fs from 'fs'

export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://data.taipei/api/v1/dataset/549b3a9b-eb6c-4cb1-848b-8c238735e2db?scope=resourceAquire',
    )
    // "https://data.taipei/dataset/detail?id=6aa6532d-652f-4c1b-814a-4646b75407af"
    // "https://data.ntpc.gov.tw/"

    const bubbles = data
      .map((value) => {
        // 加上距離單位，紀錄每個東西離使用者的位置多遠
        value.distance = distance(
          value.Latitude,
          value.Longtitude,
          event.message.latitude,
          event.message.longtitude,
          'K',
        )
        return value
      })

      .sort((a, b) => {
        return a.distance - b.distance
      })
      // 依照距離的數值排序

      .slice(0, 3)
      // 取出前三筆

      .map((value) => {
        const address = value.City + value.Town + value.Address
        const url = value.Url || `https://www.google.com/maps/place/${encodeURIComponent(address)}`
        const bubble = template()
        bubble.hero.url = value.PicURL
        bubble.hero.action.uri = url
        bubble.body.contents[0].text = value.Name
        bubble.body.contents[1].contents[0].contents[1].text = address
        bubble.body.contents[1].contents[1].contents[1].text = value.Tel
        bubble.footer.contents[0].action.uri = url
        bubble.footer.contents[1].action.uri = `https://www.google.com/maps/place/${encodeURIComponent(address)}`
        return bubble
      })
    // 套用 flex 模板

    const result = await event.reply({
      type: 'flex',
      altText: '農村地方美食',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })
    console.log(result)

    if (result.message) {
      await event.reply('發生錯誤')
      if (process.env.DEV === 'true') {
        // 如果是開發環境，而且傳送訊息錯誤時
        fs.writeFileSync(
          './dump/food.json',
          JSON.stringify(
            {
              type: 'carousel',
              contents: bubbles,
            },
            null,
            2,
          ),
        )
      }
    }
  } catch (error) {
    console.error(error)
    await event.reply('發生錯誤')
  }
}
