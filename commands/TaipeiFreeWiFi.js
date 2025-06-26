import axios from 'axios'
import { distance } from '../utils/distance.js'
import template from '../templates/templates.js'
import fs from 'fs'

export default async (event) => {
  // console.log('async', event)
  const url =
    'https://data.taipei/api/v1/dataset/549b3a9b-eb6c-4cb1-848b-8c238735e2db?scope=resourceAquire'
  const limit = 1000
  const count = 3297
  const allData = []
  for (let offset = 0; offset < count; offset += limit) {
    try {
      const response = await axios.get(url, {
        params: {
          limit: limit,
          offset: offset,
        },
      })
      allData.push(...response.data.result.results)
      console.log(`Fetched ${offset + limit} / ${count}`)

      // const { data } = await axios.get(
      //   'https://data.taipei/api/v1/dataset/549b3a9b-eb6c-4cb1-848b-8c238735e2db?scope=resourceAquire',
      // )
      // "https://data.taipei/dataset/detail?id=6aa6532d-652f-4c1b-814a-4646b75407af"

      // console.log(data);
      // console.log("AAA", data.result);
      // "limit": 20,  筆數上限(1000)
      // "offset": 0,   位移筆數
      // "count": 3297, 數量
      // "sort": "",
      // "results":     資料內容

      // console.log('BBB', data.result.results)
      // console.log(data.result.limit)
      // console.log(data.result.offset)
      // console.log(data.result.count)
    } catch (error) {
      console.error(error)
      await event.reply('發生錯誤')
    }
  }
  // console.log(allData.length)
  // console.log(allData)
  fs.writeFileSync('./dump/taipei-wifi-full.json', JSON.stringify(allData, null, 2))
  // 儲存成 .json 文件，查看所有資料

  const bubbles = allData
    // data.result.results
    .map((value) => {
      // 加上距離單位，紀錄每個東西離使用者的位置多遠
      value.distance = distance(
        value.latitude,
        value.longitude,
        event.message.latitude,
        event.message.longitude,
        'K',
      )
      // console.log(
      //   value.latitude,
      //   value.longitude,
      //   event.message.latitude,
      //   event.message.longitude,
      // )
      // console.log(value, value.distance)
      return value
    })

    .sort((a, b) => {
      return a.distance - b.distance
    })
    // 依照距離的數值排序

    .slice(0, 5)
    // 取出前三筆

    .map((value) => {
      // const address = value.City + value.Town + value.Address
      const address = value.addr
      const addressDetailIndex = value.addr.indexOf('號')
      const addressFixed = address.slice(0, addressDetailIndex + 1)
      const addressDetail = address.slice(addressDetailIndex + 1)
      const e_address = value.e_addr
      const e_addressDetailIndex = value.e_addr.indexOf('No.')
      const e_addressFixed = e_address.slice(e_addressDetailIndex)
      const e_addressDetail = e_address.slice(0, e_addressDetailIndex)
      const url = `https://www.google.com/maps/place/${value.latitude}+${value.longitude}`
      // const e_url = ``https://www.google.com/maps/place/${encodeURIComponent(e_addressFixed)}`
      const bubble = template()
      // bubble.hero.url = value.PicURL
      // bubble.hero.action.uri = url
      bubble.body.contents[0].text = value.name
      bubble.body.contents[1].contents[0].contents[1].text = addressFixed
      bubble.body.contents[1].contents[1].contents[1].text = addressDetail
      bubble.body.contents[1].contents[2].contents[1].text = e_addressFixed
      bubble.body.contents[1].contents[3].contents[1].text = e_addressDetail
      bubble.footer.contents[0].action.uri = url
      // bubble.footer.contents[1].action.uri = e_url
      return bubble
    })
  // 套用 flex 模板

  fs.writeFileSync(
    './dump/last-bubbles.json',
    JSON.stringify(
      {
        type: 'flex',
        altText: 'TPE－WIFI地點',
        contents: {
          type: 'carousel',
          contents: bubbles,
        },
      },
      null,
      2,
    ),
  )
  // 查看line template

  // console.log('CCC', bubbles)

  const result = await event.reply({
    type: 'flex',
    altText: 'TPE－WIFI地點',
    contents: {
      type: 'carousel',
      contents: bubbles,
    },
  })
  console.log('DDD', result)

  if (result.message) {
    await event.reply('發生錯誤')
    if (process.env.DEV === 'true') {
      // 如果是開發環境，而且傳送訊息錯誤時
      fs.writeFileSync(
        './dump/TPE.json',
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

  // setTimeout(async () => {
  //   await client.pushMessage(event.source.userId, {
  //     type: 'flex',
  //     altText: 'TPE－WIFI地點',
  //     contents: {
  //       type: 'carousel',
  //       contents: bubbles,
  //     },
  //   })
  // }, 1000) // 延遲 1 秒
}
