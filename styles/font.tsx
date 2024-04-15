import localFont from 'next/font/local';

const ZenKakuGothicNew = localFont({
    src: [
        {
          path: './fonts/ZenKakuGothicNew/regular.ttf',
          weight: '400',
          style: 'normal',
        },
        {
          path: './fonts/ZenKakuGothicNew/medium.ttf',
          weight: '500',
          style: 'normal',
        },
        {
          path: './fonts/ZenKakuGothicNew/bold.ttf',
          weight: '700',
          style: 'normal',
        },
        {
          path: './fonts/ZenKakuGothicNew/black.ttf',
          weight: '900',
          style: 'normal',
        }
    ],
    variable: "--zen-kaku-gothic-new",
})

const Baloo = localFont({
  src: [
      {
        path: './fonts/Baloo/Regular.ttf',
        weight: '500',
        style: 'normal',
      }
  ],
  variable: "--baloo",
})

export { ZenKakuGothicNew, Baloo }