import Mock from "mockjs"

const tableData = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    'author|1': ['yyx', 'jingzhi', 'vue', 'react', 'vite', 'typescript'],
    display_time: '@datetime',
    pageViews: 'interger(300, 5000)'
  }]
})

export {
  tableData
}