import React, { memo } from 'react'
import './index.css'

function PaginationButton({ icon, isEnabled, onClick }) {
  const iconClass = `fa fa-${icon} fa-black`
  const btnClass = `btn btn-pagination btn-${isEnabled ? 'success' : 'default'}`

  const handleClick = (e) => {
    e.preventDefault()
    isEnabled && onClick != null && onClick()
  }

  return (
    <button className={btnClass} onClick={handleClick} disabled={!isEnabled}>
      <i className={iconClass} />
    </button>
  )
}

export default memo(PaginationButton)
