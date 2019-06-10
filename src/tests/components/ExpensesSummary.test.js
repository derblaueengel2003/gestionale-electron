import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

test('should correctly render Expenses Summary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />)
    expect(wrapper).toMatchSnapshot()
})

test('should correctly render Expenses Summary with more expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={23534567890} />)
    expect(wrapper).toMatchSnapshot()  
})