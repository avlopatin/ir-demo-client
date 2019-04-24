import React, { memo } from 'react'

const id = `no-data-item-3cded34d-4d94-49e6-8600-bb74146659e4`
const NoDataRow = ({ colSpan, noDataText }) => (
  <tr key={id}>
    <td colSpan={colSpan}>{noDataText || 'No data'}</td>
  </tr>
)

export default memo(NoDataRow)
