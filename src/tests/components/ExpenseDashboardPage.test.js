import React from 'react'
import { shallow } from 'enzyme'
import DealDashboardPage from '../../components/DealDashboardPage'

test('should rendere Deal Dashboard Page correctly', () => {
    const wrapper = shallow(<DealDashboardPage />)
    expect(wrapper).toMatchSnapshot()
})