export const page = (data, size, index) => {
  const prepareVal = (currentVal, defaultVal) =>
    currentVal == null || currentVal <= 0 ? defaultVal : currentVal

  prepareVal(size, 1)
  prepareVal(index, 10)

  const isProcessable = data && data.length > 0
  const offset = () => (index - 1) * size
  const getTotalPages = () =>
    isProcessable ? Math.ceil(data.length / size) : 0
  const getItems = () =>
    isProcessable ? data.slice(offset()).slice(0, size) : []

  return {
    items: getItems(),
    totalPages: getTotalPages(),
    canGoBack: isProcessable && index > 1,
    canGoNext: isProcessable && index < getTotalPages(),
    size,
    index
  }
}
