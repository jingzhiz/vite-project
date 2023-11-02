import { onMounted } from 'vue'
import cache from '@/utils/cache'
import useNoticeStore from "@/store/module/notification"

type NotifyType = keyof ReturnType<typeof useNoticeStore>

export default function useNotice(notifyType: NotifyType) {
  const notice = useNoticeStore()[notifyType]()

  onMounted(() => {
    if (!cache.getSessionCache('notice_flag')) {
      notice.notify()
    }
    cache.setSessionCache('notice_flag', true)
  })
}