import React from 'react'
import { shallow } from 'enzyme'
import { AddDealPage } from '../../components/AddDealPage'
import deals from '../fixtures/deals'

let startAddDeal, history, wrapper

beforeEach(() => {
  startAddDeal = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddDealPage startAddDeal={startAddDeal} history={history} />) 
      
})

test('should render AddDealPage correctly', () => {
  expect(wrapper).toMatchSnapshot()  
})

test('shoul handle onSubmit', () => {
    wrapper.find('DealForm').prop('onSubmit')(deals[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddDeal).toHaveBeenLastCalledWith(deals[1])
})