import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MultiSelect from '../../src/components/inputs/MultiSelect.vue'

describe('MultiSelect', () => {
  it('toggles values', async () => {
    const options = [{ label:'A', value:'a' }, { label:'B', value:'b' }]
    const wrapper = mount(MultiSelect, { props: { modelValue: [], options } })
    await wrapper.find('button').trigger('click')
    const cb = wrapper.find('input[type="checkbox"]')
    await cb.setValue(true)
    const em = wrapper.emitted('update:modelValue')
    expect(em && (em[0][0] as string[])).toContain('a')
  })
})

