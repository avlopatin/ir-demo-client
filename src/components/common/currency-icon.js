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
import bat from 'cryptocurrency-icons/svg/color/bat.svg'
import gnt from 'cryptocurrency-icons/svg/color/gnt.svg'
import rep from 'cryptocurrency-icons/svg/color/rep.svg'

import notFound from 'cryptocurrency-icons/svg/color/generic.svg'

const getIcon = (currency) => {
  switch (currency) {
    case 'xbt':
      return btc
    case 'eth':
      return eth
    case 'xrp':
      return xrp
    case 'ltc':
      return ltc
    case 'bch':
      return bch
    case 'zrx':
      return zrx
    case 'omg':
      return omg
    case 'xlm':
      return xlm
    case 'eos':
      return eos
    case 'rep':
      return rep
    case 'bat':
      return bat
    case 'gnt':
      return gnt
    default:
      return notFound
  }
}

const CurrencyIcon = ({ currency }) => (
  <img src={getIcon(currency)} alt={currency} />
)

export default memo(CurrencyIcon)
