import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    VanCountDown: typeof import('vant/es')['CountDown']
    VanRate: typeof import('vant/es')['Rate']
  }
}