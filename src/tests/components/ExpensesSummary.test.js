import React from 'react'
import { shallow } from 'enzyme'
import { DealsSummary } from '../../components/DealsSummary'

test('should correctly render Deals Summary with 1 deal', () => {
    const wrapper = shallow(<DealsSummary dealCount={1} dealsTotal={235} />)
    expect(wrapper).toMatchSnapshot()
})

test('should correctly render Deals Summary with more deals', () => {
    const wrapper = shallow(<DealsSummary dealCount={23} dealsTotal={23534567890} />)
    expect(wrapper).toMatchSnapshot()  
})