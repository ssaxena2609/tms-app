import { ShipmentStatus } from '../types/shipment';

export const getStatusColor = (status: ShipmentStatus): string => {
  switch (status) {
    case ShipmentStatus.PENDING:
      return 'var(--warning-color)';
    case ShipmentStatus.IN_TRANSIT:
      return 'var(--info-color)';
    case ShipmentStatus.DELIVERED:
      return 'var(--success-color)';
    case ShipmentStatus.CANCELLED:
      return 'var(--danger-color)';
    default:
      return 'var(--secondary-color)';
  }
};

export const getStatusLabel = (status: ShipmentStatus): string => {
  switch (status) {
    case ShipmentStatus.PENDING:
      return 'Pending';
    case ShipmentStatus.IN_TRANSIT:
      return 'In Transit';
    case ShipmentStatus.DELIVERED:
      return 'Delivered';
    case ShipmentStatus.CANCELLED:
      return 'Cancelled';
    default:
      return status;
  }
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatLocation = (location: { city: string; state: string }): string => {
  return `${location.city}, ${location.state}`;
};
