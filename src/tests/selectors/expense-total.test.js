import selectDealsTotal from '../../selectors/deals-total'
import deals from '../fixtures/deals'

test('should return 0 if no deals', () => {
    const res = selectDealsTotal([])
    expect(res).toBe(0)
})

test('shoul correcty add up a single deal', () => {
    const res = selectDealsTotal([deals[0]])
    expect(res).toBe(195)   
})

test('shoul correcty add up multiple deal', () => {
    const res = selectDealsTotal(deals)
    expect(res).toBe(114195)   
})