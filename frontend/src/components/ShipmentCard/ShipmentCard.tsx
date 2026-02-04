import React from 'react';
import { Shipment } from '../../types/shipment';
import { 
  FiEdit, 
  FiTrash2, 
  FiFlag, 
  FiMapPin, 
  FiPackage, 
  FiTruck,
  FiClock
} from 'react-icons/fi';
import { getStatusColor, getStatusLabel, formatCurrency, formatDate, formatLocation } from '../../utils/formatters';
import './ShipmentCard.css';

interface ShipmentCardProps {
  shipment: Shipment;
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
  onToggleFlag: (id: string) => void;
  onClick: (shipment: Shipment) => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({
  shipment,
  onEdit,
  onDelete,
  onToggleFlag,
  onClick,
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(shipment);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      onDelete(shipment.id);
    }
  };

  const handleToggleFlag = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFlag(shipment.id);
  };

  return (
    <div className="shipment-card" onClick={() => onClick(shipment)}>
      <div className="card-header">
        <div className="card-header-left">
          <span 
            className="status-badge" 
            style={{ backgroundColor: getStatusColor(shipment.status) }}
          >
            {getStatusLabel(shipment.status)}
          </span>
          {shipment.flagged && (
            <FiFlag className="flagged-icon" color="var(--danger-color)" />
          )}
        </div>
        <div className="card-actions">
          <button 
            className="action-btn flag-btn" 
            onClick={handleToggleFlag}
            title={shipment.flagged ? 'Unflag' : 'Flag'}
          >
            <FiFlag color={shipment.flagged ? 'var(--danger-color)' : 'var(--text-tertiary)'} />
          </button>
          <button className="action-btn" onClick={handleEdit} title="Edit">
            <FiEdit />
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="tracking-number">
          <FiPackage size={18} />
          <span>{shipment.trackingNumber}</span>
        </div>

        <div className="card-info-row">
          <div className="info-item">
            <FiTruck size={16} />
            <div>
              <div className="info-label">Carrier</div>
              <div className="info-value">{shipment.carrierName}</div>
            </div>
          </div>
          <div className="info-item">
            <FiPackage size={16} />
            <div>
              <div className="info-label">Shipper</div>
              <div className="info-value">{shipment.shipperName}</div>
            </div>
          </div>
        </div>

        <div className="locations">
          <div className="location-item">
            <FiMapPin size={16} color="var(--success-color)" />
            <div>
              <div className="location-label">From</div>
              <div className="location-value">{formatLocation(shipment.pickupLocation)}</div>
            </div>
          </div>
          <div className="location-arrow">→</div>
          <div className="location-item">
            <FiMapPin size={16} color="var(--danger-color)" />
            <div>
              <div className="location-label">To</div>
              <div className="location-value">{formatLocation(shipment.deliveryLocation)}</div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="footer-item">
            <FiClock size={14} />
            <span>{formatDate(shipment.estimatedDelivery)}</span>
          </div>
          <div className="rate">{formatCurrency(shipment.rate, shipment.currency)}</div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
