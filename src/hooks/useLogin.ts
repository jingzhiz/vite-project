import { ref, reactive, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/module/user'
import cache from '@/utils/cache'

export default function useLogin() {
  const form = ref()
  const formData = reactive({
    username: 'jingzhi',
    password: '123456',
    remembered: false
  })
  const formRules = {
    username: {
      required: true,
      message: 'Please input username',
      trigger: 'blur'
    },
    password: [
      { required: true, message: 'Please input password', trigger: 'blur' },
      { min: 3, max: 9, message: 'Length should be 3 to 9', trigger: 'blur' }
    ]
  }

  const showPassword = ref(false)
  const changeType = () => {
    showPassword.value = !showPassword.value
  }

  const router = useRouter()
  const userStore = useUserStore()

  onMounted(() => {
    const formDataCache = cache.getCache('loginData')
    if (formDataCache) {
      const outDate = new Date().getTime() - formDataCache.timeStamp > (30 * 24 * 3600)
      if (outDate) {
        ElMessage({
          type: 'info',
          message: '本地存储时间已到期, 存储的账户已被清除!',
          duration: 2000
        })
        cache.removeCache('loginData')
      } else {
        Object.assign(formData, formDataCache)
      }
    }
  })

  const onSubmit = async () => {
    try {
      await form.value.validate()
      await userStore.login(formData)
      if (formData.remembered) {
        cache.setCache('loginData', {
          ...toRaw(formData),
          timeStamp: new Date().getTime()
        })
      }
      router.push('/')
    } catch (e) {
      console.log('error', e)
    }
  }

  return {
    form,
    formData,
    formRules,
    showPassword,
    changeType,
    onSubmit
  }
}
