// array of items for affiliate page and export it
import binance from './logos/binance.png'

import bybit from './logos/bybit.png'
import coinbase from './logos/coinbase.png'
import swissborg from './logos/swissborg.png'


const affiliateData = [
    
    {
        id: 6,
        title: 'Swissborg',
        link: 'https://join.swissborg.com/en/r/hubaIEDO',
        image: swissborg,
        description: 'Buy crypto from Switzerland and get up to to €100 in CHSB.',
    },
    {
        id: 3,
        title: 'Coinbase',
        link: 'https://coinbase.com/join/MR8IEQ?src=referral-link',
        image: coinbase,
        description: 'Register at Coinbase and get $10 guaranteed in Bitcoin for free.',
    },
    {
        id: 1,
        title: 'Binance',
        link: 'https://www.binance.com/en/activity/referral-entry/CPA?fromActivityPage=true&ref=CPA_00ASZAVRWW',
        image: binance,
        description: 'Buy crypto with 0% fees and get a guaranteed 100 USDT in cashback.',
    },
    {
        id: 2,
        title: 'Bybit',
        link: 'https://www.bybit.com/invite?ref=O8RPOA',
        image: bybit,
        description: 'Buy crypto with 0% fees and get up to 5,030 USDT in bonuses.',
    },

]

export default affiliateData
