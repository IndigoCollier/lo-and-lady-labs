import React, { useState } from 'react'
import { 
  Grid, 
  List, 
  Filter, 
  SortAsc, 
  SortDesc, 
  ChevronDown,
  MoreHorizontal,
  Heart,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react'
import './GridControls.css'

function GridControls({
  columns = 3,
  onColumnsChange,
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'name',
  onSortChange,
  filterBy = 'all',
  onFilterChange,
  maxColumns = 4,
  minColumns = 1,
  allowViewToggle = true,
  disabled = false,
  resultsCount = 0
}) {
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const sortOptions = [
    { value: 'name', label: 'Name A-Z', icon: SortAsc },
    { value: 'price', label: 'Price Low-High', icon: DollarSign },
    { value: 'age', label: 'Age Young-Old', icon: Calendar },
    { value: 'readyDate', label: 'Ready Date', icon: Calendar }
  ]

  const filterOptions = [
    { value: 'all', label: 'All Puppies', icon: Grid },
    { value: 'available', label: 'Available Only', icon: Users },
    { value: 'pending', label: 'Pending Adoption', icon: MoreHorizontal },
    { value: 'favorites', label: 'My Favorites', icon: Heart },
    { value: 'male', label: 'Male Puppies', icon: Users },
    { value: 'female', label: 'Female Puppies', icon: Users }
  ]

  const handleColumnsChange = (newColumns) => {
    if (newColumns >= minColumns && newColumns <= maxColumns) {
      onColumnsChange(newColumns)
    }
  }

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue)
    setShowSort(false)
  }

  const handleFilterSelect = (filterValue) => {
    onFilterChange(filterValue)
    setShowFilters(false)
  }

  const currentSortOption = sortOptions.find(option => option.value === sortBy)
  const currentFilterOption = filterOptions.find(option => option.value === filterBy)

  return (
    <div className="grid-controls">
      <div className="controls-left">
        <div className="results-count">
          {resultsCount === 1 ? '1 puppy' : `${resultsCount} puppies`}
        </div>
      </div>

      <div className="controls-center">
        {/* View Mode Toggle */}
        {allowViewToggle && (
          <div className="view-toggle">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              disabled={disabled}
              title="Grid View"
            >
              <Grid className="view-icon" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              disabled={disabled}
              title="List View"
            >
              <List className="view-icon" />
            </button>
          </div>
        )}

        {/* Column Controls (only for grid view) */}
        {viewMode === 'grid' && (
          <div className="column-controls">
            <span className="control-label">Columns:</span>
            <div className="column-buttons">
              {Array.from({ length: maxColumns - minColumns + 1 }, (_, i) => {
                const columnCount = minColumns + i
                return (
                  <button
                    key={columnCount}
                    onClick={() => handleColumnsChange(columnCount)}
                    className={`column-button ${columns === columnCount ? 'active' : ''}`}
                    disabled={disabled}
                    title={`${columnCount} columns`}
                  >
                    {columnCount}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="controls-right">
        {/* Sort Dropdown */}
        <div className="control-dropdown">
          <button
            onClick={() => setShowSort(!showSort)}
            className="dropdown-trigger"
            disabled={disabled}
          >
            <currentSortOption.icon className="control-icon" />
            <span>Sort</span>
            <ChevronDown className="dropdown-icon" />
          </button>
          
          {showSort && (
            <div className="dropdown-menu">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                >
                  <option.icon className="dropdown-item-icon" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="control-dropdown">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="dropdown-trigger"
            disabled={disabled}
          >
            <currentFilterOption.icon className="control-icon" />
            <span>Filter</span>
            <ChevronDown className="dropdown-icon" />
          </button>
          
          {showFilters && (
            <div className="dropdown-menu">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  className={`dropdown-item ${filterBy === option.value ? 'active' : ''}`}
                >
                  <option.icon className="dropdown-item-icon" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GridControls