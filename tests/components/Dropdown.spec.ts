import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from '../../src/components/inputs/Dropdown.vue'

describe('Dropdown', () => {
  it('selects an option', async () => {
    const options = [{ label:'A', value:'a' }, { label:'B', value:'b' }]
    const wrapper = mount(Dropdown, { props: { modelValue: null, options } })
    await wrapper.find('button').trigger('click')
    const opt = wrapper.findAll('li button')[0]
    await opt.trigger('click')
    const em = wrapper.emitted('update:modelValue')
    expect(em && em[0][0]).toBe('a')
  })
})

