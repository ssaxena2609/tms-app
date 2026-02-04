import React, { useEffect } from 'react';
import { Shipment } from '../../types/shipment';
import { FiX, FiMapPin, FiPackage, FiTruck, FiClock, FiCalendar } from 'react-icons/fi';
import { getStatusColor, getStatusLabel, formatCurrency, formatDateTime } from '../../utils/formatters';
import './ShipmentDetails.css';

interface ShipmentDetailsProps {
  shipment: Shipment;
  onClose: () => void;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Shipment Details</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-section">
            <div className="section-header">
              <h3>Basic Information</h3>
              <span 
                className="status-badge-large" 
                style={{ backgroundColor: getStatusColor(shipment.status) }}
              >
                {getStatusLabel(shipment.status)}
              </span>
            </div>
            
            <div className="details-grid">
              <div className="detail-item">
                <FiPackage className="detail-icon" />
                <div>
                  <div className="detail-label">Tracking Number</div>
                  <div className="detail-value">{shipment.trackingNumber}</div>
                </div>
              </div>

              <div className="detail-item">
                <FiTruck className="detail-icon" />
                <div>
                  <div className="detail-label">Carrier</div>
                  <div className="detail-value">{shipment.carrierName}</div>
                </div>
              </div>

              <div className="detail-item">
                <FiPackage className="detail-icon" />
                <div>
                  <div className="detail-label">Shipper</div>
                  <div className="detail-value">{shipment.shipperName}</div>
                </div>
              </div>

              <div className="detail-item">
                <FiCalendar className="detail-icon" />
                <div>
                  <div className="detail-label">Created</div>
                  <div className="detail-value">{formatDateTime(shipment.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Locations</h3>
            <div className="locations-container">
              <div className="location-box">
                <div className="location-header">
                  <FiMapPin color="var(--success-color)" size={20} />
                  <span>Pickup Location</span>
                </div>
                <div className="location-details">
                  <p>{shipment.pickupLocation.address}</p>
                  <p>{shipment.pickupLocation.city}, {shipment.pickupLocation.state} {shipment.pickupLocation.zipCode}</p>
                  <p>{shipment.pickupLocation.country}</p>
                </div>
              </div>

              <div className="location-box">
                <div className="location-header">
                  <FiMapPin color="var(--danger-color)" size={20} />
                  <span>Delivery Location</span>
                </div>
                <div className="location-details">
                  <p>{shipment.deliveryLocation.address}</p>
                  <p>{shipment.deliveryLocation.city}, {shipment.deliveryLocation.state} {shipment.deliveryLocation.zipCode}</p>
                  <p>{shipment.deliveryLocation.country}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Package Details</h3>
            <div className="package-grid">
              <div className="package-item">
                <div className="detail-label">Weight</div>
                <div className="detail-value">{shipment.weight} lbs</div>
              </div>
              <div className="package-item">
                <div className="detail-label">Dimensions (L × W × H)</div>
                <div className="detail-value">
                  {shipment.dimensions.length} × {shipment.dimensions.width} × {shipment.dimensions.height} in
                </div>
              </div>
              <div className="package-item">
                <div className="detail-label">Rate</div>
                <div className="detail-value rate-highlight">
                  {formatCurrency(shipment.rate, shipment.currency)}
                </div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>
              <FiClock className="section-icon" />
              Delivery Schedule
            </h3>
            <div className="schedule-grid">
              <div className="schedule-item">
                <div className="detail-label">Estimated Delivery</div>
                <div className="detail-value">{formatDateTime(shipment.estimatedDelivery)}</div>
              </div>
              {shipment.actualDelivery && (
                <div className="schedule-item">
                  <div className="detail-label">Actual Delivery</div>
                  <div className="detail-value">{formatDateTime(shipment.actualDelivery)}</div>
                </div>
              )}
            </div>
          </div>

          {shipment.trackingData && shipment.trackingData.length > 0 && (
            <div className="details-section">
              <h3>Tracking History</h3>
              <div className="tracking-timeline">
                {shipment.trackingData.map((tracking, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-status">{tracking.status}</span>
                        <span className="timeline-time">{formatDateTime(tracking.timestamp)}</span>
                      </div>
                      <div className="timeline-location">{tracking.location}</div>
                      {tracking.notes && (
                        <div className="timeline-notes">{tracking.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shipment.notes && (
            <div className="details-section">
              <h3>Notes</h3>
              <div className="notes-box">
                {shipment.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
