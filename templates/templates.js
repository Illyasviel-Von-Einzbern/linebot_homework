export default () => ({
  type: 'bubble',
  // hero: {
  //   type: 'image',
  //   url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
  //   size: 'full',
  //   aspectRatio: '20:13',
  //   aspectMode: 'cover',
  //   action: {
  //     type: 'uri',
  //     uri: 'https://line.me/',
  //   },
  // },
  hero: {
    type: 'box',
    layout: 'vertical',
    contents: [],
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '名稱',
        weight: 'bold',
        size: 'xl',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'md',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '地址',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '地址填寫',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '位置',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '位置填寫',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'Address',
                color: '#aaaaaa',
                size: 'sm',
                flex: 2,
              },
              {
                type: 'text',
                text: 'English Address',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
            margin: 'none',
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'Location',
                color: '#aaaaaa',
                size: 'sm',
                flex: 2,
              },
              {
                type: 'text',
                text: 'English location',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: 'Google 地圖(Google Maps)',
          uri: 'https://www.google.com/maps',
        },
      },
      // {
      //   type: 'button',
      //   style: 'link',
      //   height: 'sm',
      //   action: {
      //     type: 'uri',
      //     label: 'English Address(Goolge Maps)',
      //     uri: 'https://www.google.com/maps',
      //   },
      // },
      {
        type: 'box',
        layout: 'vertical',
        contents: [],
        margin: 'sm',
      },
    ],
    flex: 0,
  },
})
