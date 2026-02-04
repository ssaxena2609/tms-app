import { describe, it, expect } from 'vitest';
import {
  getStatusColor,
  getStatusLabel,
  formatCurrency,
  formatDate,
  formatLocation,
} from '../../utils/formatters';
import { ShipmentStatus } from '../../types/shipment';

describe('Formatter Utils', () => {
  describe('getStatusColor', () => {
    it('returns correct color for each status', () => {
      expect(getStatusColor(ShipmentStatus.PENDING)).toBe('var(--warning-color)');
      expect(getStatusColor(ShipmentStatus.IN_TRANSIT)).toBe('var(--info-color)');
      expect(getStatusColor(ShipmentStatus.DELIVERED)).toBe('var(--success-color)');
      expect(getStatusColor(ShipmentStatus.CANCELLED)).toBe('var(--danger-color)');
    });
  });

  describe('getStatusLabel', () => {
    it('returns correct label for each status', () => {
      expect(getStatusLabel(ShipmentStatus.PENDING)).toBe('Pending');
      expect(getStatusLabel(ShipmentStatus.IN_TRANSIT)).toBe('In Transit');
      expect(getStatusLabel(ShipmentStatus.DELIVERED)).toBe('Delivered');
      expect(getStatusLabel(ShipmentStatus.CANCELLED)).toBe('Cancelled');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0.99)).toBe('$0.99');
    });

    it('supports different currencies', () => {
      expect(formatCurrency(100, 'EUR')).toContain('100');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2024-01-15T10:30:00Z';
      const formatted = formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });

  describe('formatLocation', () => {
    it('formats location correctly', () => {
      const location = { city: 'New York', state: 'NY' };
      expect(formatLocation(location)).toBe('New York, NY');
    });
  });
});
