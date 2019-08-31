// Get Deal Total for Stefano

export default (deals) => deals.map((deal) => deal.provvStefano).reduce((sum, value) => sum + value, 0)