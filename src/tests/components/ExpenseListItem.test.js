import React from 'react'
import { shallow } from 'enzyme'
import deals from '../fixtures/deals'
import DealListItem from '../../components/DealListItem'

test('should render DealListItem correctly', () => {
    const wrapper = shallow(<DealListItem {...deals[0]}/>)
    expect(wrapper).toMatchSnapshot()
})