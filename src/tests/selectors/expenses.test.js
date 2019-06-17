import moment from 'moment'
import selectDeals from '../../selectors/deals'
import deals from '../fixtures/deals'


test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectDeals(deals, filters)
    expect(result).toEqual([ deals[2], deals[1] ])
})

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = selectDeals(deals, filters)
    expect(result).toEqual([deals[2], deals[0]])
})

test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }  
    const result = selectDeals(deals, filters)
    expect(result).toEqual([deals[0], deals[1]])
})

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    } 
    const result = selectDeals(deals, filters)
    expect(result).toEqual([deals[2], deals[0], deals[1]])
})

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectDeals(deals, filters)
    expect(result).toEqual([deals[1], deals[2], deals[0]])
})