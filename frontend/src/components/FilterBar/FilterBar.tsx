import React from 'react';
import { ShipmentStatus } from '../../types/shipment';
import { FiFilter, FiX } from 'react-icons/fi';
import './FilterBar.css';

interface FilterBarProps {
  filters: {
    status?: ShipmentStatus;
    carrierName?: string;
    shipperName?: string;
    flagged?: boolean;
  };
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status === 'all' ? undefined : (status as ShipmentStatus),
    });
  };

  const handleCarrierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      carrierName: e.target.value || undefined,
    });
  };

  const handleShipperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      shipperName: e.target.value || undefined,
    });
  };

  const handleFlaggedChange = (flagged: string) => {
    onFilterChange({
      ...filters,
      flagged: flagged === 'all' ? undefined : flagged === 'true',
    });
  };

  const clearFilters = () => {
    onFilterChange({});
    setIsOpen(false);
  };

  const hasActiveFilters = 
    filters.status || filters.carrierName || filters.shipperName || filters.flagged !== undefined;

  return (
    <div className="filter-bar">
      <button 
        className={`filter-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiFilter />
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge"></span>}
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <h3>Filter Shipments</h3>
            <button className="clear-filters" onClick={clearFilters}>
              <FiX size={16} />
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select 
              value={filters.status || 'all'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value={ShipmentStatus.PENDING}>Pending</option>
              <option value={ShipmentStatus.IN_TRANSIT}>In Transit</option>
              <option value={ShipmentStatus.DELIVERED}>Delivered</option>
              <option value={ShipmentStatus.CANCELLED}>Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Carrier Name</label>
            <input
              type="text"
              placeholder="Search carrier..."
              value={filters.carrierName || ''}
              onChange={handleCarrierChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Shipper Name</label>
            <input
              type="text"
              placeholder="Search shipper..."
              value={filters.shipperName || ''}
              onChange={handleShipperChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Flagged Status</label>
            <select 
              value={filters.flagged === undefined ? 'all' : filters.flagged.toString()}
              onChange={(e) => handleFlaggedChange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="true">Flagged Only</option>
              <option value="false">Not Flagged</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
