// Get Deal Payed Stefano

export default (deals) => deals.filter((deal) => deal.payed).map((deal) => deal.provvStefano).reduce((sum, value) => sum + value, 0)