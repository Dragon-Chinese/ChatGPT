import { onMounted, reactive, ref } from "vue";
import { sendMsg } from '@/api/mixin.ts'
export const useMixin = () => {
    const id = ref(0)
    const message1 = reactive({
        data: []
    })
    const ansolo = ref("当然，这是一个使用冒泡排序算法进行升序排序的示例代码：\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    \n    for i in range(n-1):\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    \n    return arr\n\n# 测试代码\narr = [5, 2, 8, 1, 9, 3]\nsorted_arr = bubble_sort(arr)\nprint(sorted_arr)\n```\n\n这段代码将输出 `[1, 2, 3, 5, 8, 9]`，表示经过冒泡排序后，原始列表 `arr` 中的元素按升序排列。冒泡排序算法通过不断交换相邻的元素，将较大的元素逐渐“冒泡”到右侧，实现排序的目的。",)
    const session = reactive({
        data: [
            {
                id: 0,
                message: [
                    {
                        role: 'assistant',
                        content: 'Hello , Nice to meet you!'
                    }
                ]
            }
        ]
    })

    const loading = ref(false)

    const CreateMessage = () => {
        session.data.push({
            id: session.data.length,
            message: [
                {
                    role: 'assistant',
                    content: 'Hello , Nice to meet you!'
                }
            ]
        })
    }

    const TabId = (val: number) => {
        id.value = val
        message1.data = session.data[id.value].message
        console.log(message1.data)
    }

    const EnterSend = (txt: String) => {
        if (!txt) return
        session.data[id.value].message.push({
            role: 'user',
            content: txt
        })
        session.data[id.value].message.push({
            role: 'assistant',
            content: ''
        })
        loading.value = true
        // setTimeout(() => {
        //     session.data[id.value].message[session.data[id.value].message.length - 1].content = ansolo.value
        //     loading.value = false
        // }, 2000)
        sendMsg({message: txt, id: 7}).then(res => {
            session.data[id.value].message[session.data[id.value].message.length - 1].content = res.message.content
            loading.value = false
        })
        console.log(message1.data)
    }

    onMounted(() => {
        message1.data = session.data[id.value].message
    })

    return {
        message: message1,
        EnterSend,
        allData: session.data,
        defaultId: id,
        CreateMessage,
        TabId,
        loading
    }
}