
import { defineStore } from 'pinia' //引入pinia

//这里官网是单独导出  是可以写成默认导出的  官方的解释为大家一起约定仓库用use打头的单词 固定统一小仓库的名字不易混乱
export const useStore = defineStore("data", {
  state: () => {
    return ({
      title: "Mobile GPT",
      id: 0,
      session: [
        {
            id: 0,
            ansole: "当然，这是一个使用冒泡排序算法进行升序排序的示例代码：\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    \n    for i in range(n-1):\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    \n    return arr\n\n# 测试代码\narr = [5, 2, 8, 1, 9, 3]\nsorted_arr = bubble_sort(arr)\nprint(sorted_arr)\n```\n\n这段代码将输出 `[1, 2, 3, 5, 8, 9]`，表示经过冒泡排序后，原始列表 `arr` 中的元素按升序排列。冒泡排序算法通过不断交换相邻的元素，将较大的元素逐渐“冒泡”到右侧，实现排序的目的。",
            message: [
                {
                    role: 'assistant',
                    content: 'Hello , Nice to meet you!'
                },
                {
                    role: 'user',
                    content: '写一个冒泡排序'
                },
                {
                    role: 'assistant',
                    // content: ansole
                }
            ]
        }
      ],
      message: null
    }) //为了避免出错，返回的值用()包起来
  },
  actions: {
  }
})
