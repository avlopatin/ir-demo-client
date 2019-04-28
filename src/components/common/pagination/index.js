import React, { memo } from 'react'
import PaginationButton from './pagination-button'

function Pagination({ page, paginationHandler }) {
  const { isProcessable, index, total, canGoBack, canGoNext } = page
  const renderInfo = () =>
    isProcessable && (
      <span>
        {index}/{total}
      </span>
    )
  const goBack = () =>
    canGoBack && paginationHandler != null && paginationHandler(index - 1)
  const goNext = () =>
    canGoNext && paginationHandler != null && paginationHandler(index + 1)

  return (
    <>
      {renderInfo()}
      <PaginationButton
        onClick={goBack}
        isEnabled={canGoBack}
        icon={'chevron-left'}
      />
      <PaginationButton
        onClick={goNext}
        isEnabled={canGoNext}
        icon={'chevron-right'}
      />
    </>
  )
}

export default memo(Pagination)
