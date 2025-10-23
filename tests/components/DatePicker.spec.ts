import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from '../../src/components/inputs/DatePicker.vue'

describe('DatePicker', () => {
  it('renders and emits update on pick', async () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null } })
    await wrapper.find('input').trigger('focus')
    const btns = wrapper.findAll('button')
    const day = btns.find(b => /\d+/.test(b.text()))!
    await day.trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted && emitted[0][0]).toMatch(/\d{4}-\d{2}-\d{2}/)
  })
})

