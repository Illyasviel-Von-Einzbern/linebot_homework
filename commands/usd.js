import axios from 'axios'
export default async (event) => {
  try {
    const { data } = await axios.get('https://tw.rter.info/capi.php')
    // 取得匯率資料
    const result = await event.reply(data.USDTWD.Exrate.toString())
    // 回覆資料
    console.log(result)
    // 回覆成功
    // {
    //   sentMessages: ...
    // }
    if (result.message) {
      await event.reply('發生錯誤')
    }
    // 回覆失敗
    // {
    //   message: ...
    // }
  } catch (error) {
    console.error(error)
    event.reply('發生錯誤')
  }
}
