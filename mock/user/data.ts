const tokens = {
  vite: {
    token: 'vite-token'
  },
  vue: {
    token: 'vue-token'
  },
  ts: {
    token: 'ts-token'
  },
  element: {
    token: 'element-token'
  }
}

const users = {
  'vite-token': {
    name: 'Vite',
    avatar: '/src/assets/images/logo.svg',
    roles: ['root', 'vue', 'typescript', 'element', 'normal'],
    introduction: 'Next Generation Frontend Tooling.'
  },
  'vue-token': {
    name: 'Vue',
    avatar: '/src/assets/images/logo.svg',
    roles: ['vue', 'normal'],
    introduction: 'The Progressive JavaScript Framework.'
  },
  'ts-token': {
    name: 'TypeScript',
    avatar: '/src/assets/images/logo.svg',
    roles: ['typescript', 'normal'],
    introduction: 'TypeScript is JavaScript with syntax for types.'
  },
  'element-token': {
    name: 'ElementPlus',
    avatar: '/src/assets/images/logo.svg',
    roles: ['vue', 'element', 'normal'],
    introduction: 'A Desktop UI Library.'
  }
}

export { tokens, users }
