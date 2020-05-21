import React from 'react'
import { shallow } from 'enzyme'
import { DealList } from '../../components/deals/DealList'
import deals from '../fixtures/deals'


test('should render DealList with deals', () => {
    const wrapper = shallow(<DealList deals={deals}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render DealList with empty message', () => {
    const wrapper = shallow(<DealList deals={[]} />)
    expect(wrapper).toMatchSnapshot()
})