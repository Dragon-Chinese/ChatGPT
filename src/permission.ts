import router from '@/router/index'
import { useStore } from '@/store/index.ts'
router.beforeEach(async (to, from, next) => {
    const store = useStore()
    console.log(store)
    store.GetChats()
    next()
})
