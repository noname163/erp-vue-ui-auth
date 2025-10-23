import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateRangePicker from '../../src/components/inputs/DateRangePicker.vue'

describe('DateRangePicker', () => {
  it('emits model updates', async () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: { start: null, end: null }, quickRanges: true }})
    // quick range today
    const btn = wrapper.findAll('button').find(b => b.text() === 'Today')
    await btn?.trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })
})
