import { mount } from 'vue-test-utils'
import Treeview from '../src/TreeView.vue'

test('Treeview should render simple json', () => {
  const json = {a: 1, b: 1}
  const wrapper = mount(Treeview, {
    propsData: {
      data: json,
      options: {rootObjectKey:  'root1234' },
    }
  })
  expect(wrapper.contains('div')).toBe(true)
  expect(wrapper.text()).toEqual(expect.stringContaining('root1234'))
})

test('Treeview should render annotated json', () => {
  const json = {a: 1, "@b(class='add')": "v1", "@c(class='del')": {a:1,b:[2,3], c:{d:''}}, "@d(class='update')": [1,2,3,4]}
  const wrapper = mount(Treeview, {
    propsData: {
      data: json,
      options: {rootObjectKey:  'root1234' },
    }
  })
  expect(wrapper.contains('div')).toBe(true)
  expect(wrapper.text()).toEqual(expect.stringContaining('root1234'))
})
