import React from 'react';
import { Shipment } from '../../types/shipment';
import { 
  FiEdit, 
  FiTrash2, 
  FiFlag,
  FiMapPin,
  FiPackage
} from 'react-icons/fi';
import { getStatusColor, getStatusLabel, formatCurrency, formatDate } from '../../utils/formatters';
import './ShipmentGrid.css';

interface ShipmentGridProps {
  shipments: Shipment[];
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
  onToggleFlag: (id: string) => void;
  onClick: (shipment: Shipment) => void;
}

const ShipmentGrid: React.FC<ShipmentGridProps> = ({
  shipments,
  onEdit,
  onDelete,
  onToggleFlag,
  onClick,
}) => {
  const handleEdit = (e: React.MouseEvent, shipment: Shipment) => {
    e.stopPropagation();
    onEdit(shipment);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      onDelete(id);
    }
  };

  const handleToggleFlag = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleFlag(id);
  };

  if (shipments.length === 0) {
    return (
      <div className="empty-state">
        <FiPackage size={64} color="var(--text-tertiary)" />
        <h3>No shipments found</h3>
        <p>Try adjusting your filters or create a new shipment</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <table className="shipment-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Tracking #</th>
            <th>Shipper</th>
            <th>Carrier</th>
            <th>From</th>
            <th>To</th>
            <th>Est. Delivery</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr 
              key={shipment.id} 
              className="table-row"
              onClick={() => onClick(shipment)}
            >
              <td>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(shipment.status) }}
                >
                  {getStatusLabel(shipment.status)}
                </span>
              </td>
              <td>
                <div className="tracking-cell">
                  {shipment.flagged && (
                    <FiFlag size={14} color="var(--danger-color)" />
                  )}
                  <span className="tracking-number">{shipment.trackingNumber}</span>
                </div>
              </td>
              <td>{shipment.shipperName}</td>
              <td>{shipment.carrierName}</td>
              <td>
                <div className="location-cell">
                  <FiMapPin size={14} color="var(--success-color)" />
                  <span>{shipment.pickupLocation.city}, {shipment.pickupLocation.state}</span>
                </div>
              </td>
              <td>
                <div className="location-cell">
                  <FiMapPin size={14} color="var(--danger-color)" />
                  <span>{shipment.deliveryLocation.city}, {shipment.deliveryLocation.state}</span>
                </div>
              </td>
              <td>{formatDate(shipment.estimatedDelivery)}</td>
              <td className="rate-cell">{formatCurrency(shipment.rate, shipment.currency)}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="action-btn flag-btn" 
                    onClick={(e) => handleToggleFlag(e, shipment.id)}
                    title={shipment.flagged ? 'Unflag' : 'Flag'}
                  >
                    <FiFlag color={shipment.flagged ? 'var(--danger-color)' : 'var(--text-tertiary)'} />
                  </button>
                  <button 
                    className="action-btn" 
                    onClick={(e) => handleEdit(e, shipment)}
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={(e) => handleDelete(e, shipment.id)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentGrid;
