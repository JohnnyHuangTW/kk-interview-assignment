import { Avatar, Box, Container, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { CHANNEL_NAME } from '../../constants'
import { useYoutubeApi } from '../../hooks'
import { VideoDataTable } from '../../components'
import { shortenNum } from '../../utils'

const MainPage = () => {
  const { fetchChannelInfoByName, fetchSortedChannelVideos } = useYoutubeApi()

  const [pageToken, setPageToken] = useState('')

  const {
    data: channel,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(
    'channel',
    () => fetchChannelInfoByName(CHANNEL_NAME),
    // FIXME
    // { enabled: false },
  )

  const { data, isLoading: isFetchingVideos } = useQuery(
    ['videos', pageToken],
    () => fetchSortedChannelVideos({ channelId: channel?.id, pageToken }),
    {
      // enabled: !!channel?.id,
      // FIXME
      // enabled: false,
    },
  )

  const { videoItems, pageInfo, nextPageToken, prevPageToken } = data ?? {}

  const channelThumbnail = channel ? channel.thumbnails.default : {}

  return (
    <Container maxWidth="lg" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      {/* channel information */}
      {channel && (
        <Box
          sx={{
            display: 'flex',
            p: 4,
            gap: 2,
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: 'center',
          }}
        >
          <Avatar
            src={channelThumbnail.url}
            sx={{ height: channelThumbnail.height, width: channelThumbnail.width }}
          />
          <Box>
            <Typography component="h1" variant="h4">
              {channel.title}
            </Typography>
            <Typography component="label" sx={{ typography: 'subtitle', color: 'text.secondary' }}>
              {(shortenNum(channel.subscriberCount))} 位訂閱者
            </Typography>
          </Box>
        </Box>
      )}

      <VideoDataTable
        // FIXME
        // eslint-disable-next-line no-use-before-define
        // data={videoItemsMock}
        // eslint-disable-next-line no-use-before-define
        // totalCount={pageInfoMock.totalResults}
        itemsPerPage={10}
        data={videoItems}
        totalCount={pageInfo?.totalResults}
        onNextPageClick={() => setPageToken(nextPageToken)}
        onPrevPageClick={() => setPageToken(prevPageToken)}
        isLoading={isFetchingVideos}
      />
    </Container>
  )
}

export default MainPage

const pageInfoMock = {
  totalResults: 2545,
  resultsPerPage: 10,
}
const videoItemsMock = [
  {
    videoId: 'JXuaTu1jgYQ',
    title: 'KKBOX 家庭方案 [ 愛情篇 ]',
    description:
      '你都說他是你的？ 室友好友家人愛人以上皆是在音樂的世界裡，愛情的模樣可以很多樣— KKBOX 家庭方案，每人每月最低$40 ▻ 3 ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/JXuaTu1jgYQ/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/JXuaTu1jgYQ/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/JXuaTu1jgYQ/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-05-03T03:54:31Z',
    duration: 'PT26S',
    viewCount: '976678',
    likeCount: '80',
    commentCount: '11',
  },
  {
    videoId: 'yuaq6-RCXeM',
    title: 'KKBOX 家庭方案 [ 基因篇 ]',
    description:
      '不洗澡，聽音樂更有味？ 認同請標記你身邊那些珍惜水資源的朋友— KKBOX 家庭方案，每人每月最低$40 獨立帳號一人一聽， ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/yuaq6-RCXeM/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/yuaq6-RCXeM/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/yuaq6-RCXeM/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-05-03T03:54:28Z',
    duration: 'PT26S',
    viewCount: '1038780',
    likeCount: '14',
    commentCount: '2',
  },
  {
    videoId: 'oJnACVGGm3A',
    title: 'KKBOX 家庭方案 [ 友情篇 ]',
    description:
      '好室友準則： 愛音樂+1 愛乾淨+2 愛貓+++10000 歡迎留言區曬房曬貓曬歌單— KKBOX 家庭方案，每人每月最低$40 ▻ 3 人小 ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/oJnACVGGm3A/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/oJnACVGGm3A/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/oJnACVGGm3A/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-05-03T03:54:36Z',
    duration: 'PT31S',
    viewCount: '660670',
    likeCount: '28',
    commentCount: '5',
  },
  {
    videoId: 'YjYp1wY0NWk',
    title: '動畫《國王排名》、日劇《月薪嬌妻》配樂都她做的！MAYUKO 談配樂創作者 「必備的三個條件」',
    description:
      '一齣戲劇或一部動畫，除了精彩的故事、好的演出很重要外，影視配樂總能在關鍵時刻為劇情添色，幫助觀眾更加入戲。過去往往 ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/YjYp1wY0NWk/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/YjYp1wY0NWk/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/YjYp1wY0NWk/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-04-04T12:15:01Z',
    duration: 'PT11M28S',
    viewCount: '1100',
    likeCount: '23',
    commentCount: '1',
  },
  {
    videoId: 'ayXWmBACoNA',
    title: '演唱《戀上換裝娃娃​​》片尾曲受關注 Akase Akari 專訪來了｜KKBOX',
    description:
      '年僅20 歲，在TikTok 上擁有超高人氣，還因為演唱《戀上換裝娃娃​​》片尾曲〈戀愛的去向〉受到更多關注，Akase Akari 首度 ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/ayXWmBACoNA/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/ayXWmBACoNA/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/ayXWmBACoNA/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-03-29T03:17:15Z',
    duration: 'PT3M5S',
    viewCount: '5748',
    likeCount: '162',
    commentCount: '6',
  },
  {
    videoId: 'lJBRbvtQ1Bo',
    title: '【專訪】享受舞台的一切！藏在 Rocket Punch 裡的「人間迪斯可球」是誰...?  ｜KKBOX',
    description:
      '既然Ketchy 們想看，Rocket Punch 就必須做！」這句話也太圈粉了吧... 睽違九個月Rocket Punch 發行以顏色為主要的 ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/lJBRbvtQ1Bo/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/lJBRbvtQ1Bo/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/lJBRbvtQ1Bo/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-03-28T04:06:24Z',
    duration: 'PT5M18S',
    viewCount: '1175',
    likeCount: '44',
    commentCount: '5',
  },
  {
    videoId: '2orKmnRpfWs',
    title: 'keshi 首張專輯邀爸爸合作超感人！談論 TikTok「希望創作能被聽超過 20 秒」｜KKBOX',
    description:
      '發行首張專輯《GABRIEL》的keshi 絕對是你一定要認識的竄紅新聲，不僅每首單曲都輕易拿下KKBOX 西洋週榜Top 10 的好成績， ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/2orKmnRpfWs/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/2orKmnRpfWs/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/2orKmnRpfWs/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-03-25T05:52:41Z',
    duration: 'PT5M59S',
    viewCount: '4141',
    likeCount: '166',
    commentCount: '8',
  },
  {
    videoId: 'W87RXssZmN8',
    title: '日本最受關注新生代樂團Atarayo(あたらよ)專訪｜KKBOX',
    description:
      'Atarayo 無疑是這一年內在日本年輕人中掀起熱烈討論的樂團，名曲〈忘卻10月沈默的你〉深深打動了許多為情苦惱的人們。',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/W87RXssZmN8/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/W87RXssZmN8/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/W87RXssZmN8/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-03-23T09:00:11Z',
    duration: 'PT6M56S',
    viewCount: '1135',
    likeCount: '34',
    commentCount: '4',
  },
  {
    videoId: 'D4Sn18GvYI0',
    title: '第 17 屆 KKBOX 音樂風雲榜，年度風雲歌手五月天感謝大家給予殊榮｜KKBOX',
    description:
      '天團五月天感謝大家再度給予年度風雲歌手殊榮◢ 訂閱音樂風雲榜直播通知▶︎ https://kkbox.fm/u3GoMJ ​ 今年五月天Mayday 雖然 ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/D4Sn18GvYI0/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/D4Sn18GvYI0/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/D4Sn18GvYI0/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-03-09T06:15:19Z',
    duration: 'PT1M51S',
    viewCount: '4725',
    likeCount: '147',
    commentCount: '3',
  },
  {
    videoId: '9Cs8JsFOZZM',
    title: '邁向藝術家之路！輝人：這次的我變得更加堅定｜KKBOX',
    description:
      '輝人透露新輯收錄曲〈Letter Filled with Light〉是寫給粉絲們的一封信！ 並用DAY6 的「這首歌」，為自己的2021 年做註解， ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/9Cs8JsFOZZM/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/9Cs8JsFOZZM/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/9Cs8JsFOZZM/hqdefault.jpg',
        width: 480,
        height: 360,
      },
    },
    publishedAt: '2022-03-02T11:36:54Z',
    duration: 'PT4M33S',
    viewCount: '3451',
    likeCount: '316',
    commentCount: '12',
  },
]
