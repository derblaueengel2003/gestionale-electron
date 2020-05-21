import React from 'react'
import { shallow } from 'enzyme'
import DealDashboardPage from '../../components/deals/DealDashboardPage'

test('should rendere Deal Dashboard Page correctly', () => {
    const wrapper = shallow(<DealDashboardPage />)
    expect(wrapper).toMatchSnapshot()
})