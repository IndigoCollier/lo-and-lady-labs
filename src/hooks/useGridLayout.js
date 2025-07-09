import { useState, useEffect, useCallback } from 'react'

export function useGridLayout(initialColumns = 3, maxColumns = 4, minColumns = 1) {
  const [columns, setColumns] = useState(initialColumns)
  const [viewMode, setViewMode] = useState('grid')
  const [screenSize, setScreenSize] = useState('desktop')

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      
      if (width < 600) {
        setScreenSize('mobile')
        if (columns > 1) setColumns(1)
      } else if (width < 900) {
        setScreenSize('tablet')
        if (columns > 2) setColumns(2)
      } else if (width < 1200) {
        setScreenSize('desktop-small')
        if (columns > 3) setColumns(3)
      } else {
        setScreenSize('desktop')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [columns])

  const updateColumns = useCallback((newColumns) => {
    const adjustedColumns = Math.max(minColumns, Math.min(maxColumns, newColumns))
    
    // Adjust for screen size
    if (screenSize === 'mobile' && adjustedColumns > 1) {
      setColumns(1)
    } else if (screenSize === 'tablet' && adjustedColumns > 2) {
      setColumns(2)
    } else if (screenSize === 'desktop-small' && adjustedColumns > 3) {
      setColumns(3)
    } else {
      setColumns(adjustedColumns)
    }
  }, [screenSize, maxColumns, minColumns])

  const getOptimalColumns = useCallback(() => {
    switch (screenSize) {
      case 'mobile':
        return 1
      case 'tablet':
        return 2
      case 'desktop-small':
        return 3
      default:
        return Math.min(4, maxColumns)
    }
  }, [screenSize, maxColumns])

  const getMaxColumnsForScreen = useCallback(() => {
    switch (screenSize) {
      case 'mobile':
        return 1
      case 'tablet':
        return 2
      case 'desktop-small':
        return 3
      default:
        return maxColumns
    }
  }, [screenSize, maxColumns])

  return {
    columns,
    viewMode,
    screenSize,
    updateColumns,
    setViewMode,
    getOptimalColumns,
    getMaxColumnsForScreen,
    maxColumns: getMaxColumnsForScreen(),
    minColumns
  }
}