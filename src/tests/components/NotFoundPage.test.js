import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from '../../components/NotFoundPage'

test('should rendere Not Found Page correctly', () => {
    const wrapper = shallow(<NotFoundPage />)
    expect(wrapper).toMatchSnapshot()
})