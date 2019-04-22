import React, { memo } from 'react'
import btc from 'cryptocurrency-icons/svg/color/btc.svg'
import eth from 'cryptocurrency-icons/svg/color/eth.svg'
import xrp from 'cryptocurrency-icons/svg/color/xrp.svg'
import bch from 'cryptocurrency-icons/svg/color/bch.svg'
import ltc from 'cryptocurrency-icons/svg/color/ltc.svg'
import omg from 'cryptocurrency-icons/svg/color/omg.svg'
import zrx from 'cryptocurrency-icons/svg/color/zrx.svg'
import eos from 'cryptocurrency-icons/svg/color/eos.svg'
import xlm from 'cryptocurrency-icons/svg/color/xlm.svg'
import notFound from 'cryptocurrency-icons/svg/color/generic.svg'

const getIcon = ({ name }) => {
  switch (name) {
    case 'Xbt':
      return btc
    case 'Eth':
      return eth
    case 'Xrp':
      return xrp
    case 'Ltc':
      return ltc
    case 'Bch':
      return bch
    case 'Zrx':
      return zrx
    case 'Omg':
      return omg
    case 'Xlm':
      return xlm
    case 'Eos':
      return eos
    default:
      return notFound
  }
}

function CurrencyIcon({ currency }) {
  return <img src={getIcon(currency)} alt={currency.name} />
}

export default memo(CurrencyIcon)
