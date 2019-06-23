import React from 'react'
import { shallow } from 'enzyme'
import { EditDealPage } from '../../components/EditDealPage'
import deals from '../fixtures/deals'

let startEditDeal, startRemoveDeal, history, wrapper

beforeEach(() => {
    startEditDeal = jest.fn()
    startRemoveDeal = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditDealPage 
        startEditDeal={startEditDeal} 
            history={history} 
            startRemoveDeal={startRemoveDeal} 
            deal={deals[2]}
        />)
})

test('should render EditDealPage correctly', () => {
    expect(wrapper).toMatchSnapshot()  
})

test('should handle editDeal', () => {
    wrapper.find('DealForm').prop('onSubmit')(deals[2])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startEditDeal).toHaveBeenLastCalledWith(deals[2].id, deals[2])
})

test('should handle startRemoveDeal', () => {
    wrapper.find('button').simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startRemoveDeal).toHaveBeenLastCalledWith({ id: deals[2].id})
})