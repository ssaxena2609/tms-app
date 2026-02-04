import ShipmentService from '../services/shipmentService';
import { ShipmentStatus, ShipmentInput } from '../types/shipment';

describe('ShipmentService', () => {
  let service: ShipmentService;

  beforeEach(() => {
    service = new ShipmentService();
  });

  describe('getShipments', () => {
    it('should return paginated shipments', () => {
      const result = service.getShipments(undefined, { page: 1, limit: 10 });
      
      expect(result.shipments).toHaveLength(10);
      expect(result.totalCount).toBeGreaterThan(0);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBeGreaterThan(0);
    });

    it('should filter shipments by status', () => {
      const result = service.getShipments(
        { status: ShipmentStatus.DELIVERED },
        { page: 1, limit: 100 }
      );
      
      result.shipments.forEach(shipment => {
        expect(shipment.status).toBe(ShipmentStatus.DELIVERED);
      });
    });

    it('should filter shipments by carrier name', () => {
      const carrierName = 'FedEx';
      const result = service.getShipments(
        { carrierName },
        { page: 1, limit: 100 }
      );
      
      result.shipments.forEach(shipment => {
        expect(shipment.carrierName.toLowerCase()).toContain(carrierName.toLowerCase());
      });
    });

    it('should filter flagged shipments', () => {
      const result = service.getShipments(
        { flagged: true },
        { page: 1, limit: 100 }
      );
      
      result.shipments.forEach(shipment => {
        expect(shipment.flagged).toBe(true);
      });
    });

    it('should handle pagination correctly', () => {
      const page1 = service.getShipments(undefined, { page: 1, limit: 5 });
      const page2 = service.getShipments(undefined, { page: 2, limit: 5 });
      
      expect(page1.shipments[0].id).not.toBe(page2.shipments[0].id);
      expect(page1.hasNextPage).toBe(true);
      expect(page1.hasPreviousPage).toBe(false);
      expect(page2.hasPreviousPage).toBe(true);
    });
  });

  describe('getShipmentById', () => {
    it('should return a shipment by ID', () => {
      const allShipments = service.getAllShipments();
      const firstShipment = allShipments[0];
      
      const result = service.getShipmentById(firstShipment.id);
      
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstShipment.id);
    });

    it('should return undefined for non-existent ID', () => {
      const result = service.getShipmentById('non-existent-id');
      
      expect(result).toBeUndefined();
    });
  });

  describe('searchShipments', () => {
    it('should search shipments by tracking number', () => {
      const allShipments = service.getAllShipments();
      const trackingNumber = allShipments[0].trackingNumber;
      
      const result = service.searchShipments(trackingNumber.substring(0, 5));
      
      expect(result.length).toBeGreaterThan(0);
    });

    it('should search shipments by carrier name', () => {
      const result = service.searchShipments('FedEx');
      
      result.forEach(shipment => {
        expect(shipment.carrierName.toLowerCase()).toContain('fedex');
      });
    });

    it('should return empty array for no matches', () => {
      const result = service.searchShipments('nonexistentsearchterm12345');
      
      expect(result).toEqual([]);
    });
  });

  describe('createShipment', () => {
    it('should create a new shipment', () => {
      const input: ShipmentInput = {
        shipperName: 'Test Shipper',
        carrierName: 'Test Carrier',
        pickupLocation: {
          address: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'USA'
        },
        deliveryLocation: {
          address: '456 Delivery Ave',
          city: 'Delivery City',
          state: 'DC',
          zipCode: '67890',
          country: 'USA'
        },
        weight: 10.5,
        dimensions: {
          length: 20,
          width: 15,
          height: 10
        },
        rate: 99.99,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      const result = service.createShipment(input);

      expect(result.id).toBeDefined();
      expect(result.shipperName).toBe(input.shipperName);
      expect(result.carrierName).toBe(input.carrierName);
      expect(result.status).toBe(ShipmentStatus.PENDING);
      expect(result.trackingNumber).toMatch(/^TRK/);
      expect(result.trackingData).toHaveLength(1);
    });
  });

  describe('updateShipment', () => {
    it('should update an existing shipment', () => {
      const allShipments = service.getAllShipments();
      const shipmentToUpdate = allShipments[0];
      
      const updatedName = 'Updated Shipper Name';
      const result = service.updateShipment({
        id: shipmentToUpdate.id,
        shipperName: updatedName
      });

      expect(result.shipperName).toBe(updatedName);
      expect(result.id).toBe(shipmentToUpdate.id);
    });

    it('should throw error for non-existent shipment', () => {
      expect(() => {
        service.updateShipment({
          id: 'non-existent-id',
          shipperName: 'Test'
        });
      }).toThrow();
    });
  });

  describe('deleteShipment', () => {
    it('should delete a shipment', () => {
      const allShipments = service.getAllShipments();
      const initialCount = allShipments.length;
      const shipmentToDelete = allShipments[0];
      
      const result = service.deleteShipment(shipmentToDelete.id);

      expect(result).toBe(true);
      expect(service.getAllShipments().length).toBe(initialCount - 1);
      expect(service.getShipmentById(shipmentToDelete.id)).toBeUndefined();
    });

    it('should throw error when deleting non-existent shipment', () => {
      expect(() => {
        service.deleteShipment('non-existent-id');
      }).toThrow();
    });
  });

  describe('toggleFlagShipment', () => {
    it('should toggle flag on a shipment', () => {
      const allShipments = service.getAllShipments();
      const shipment = allShipments[0];
      const initialFlagStatus = shipment.flagged;
      
      const result = service.toggleFlagShipment(shipment.id);

      expect(result.flagged).toBe(!initialFlagStatus);
    });

    it('should throw error for non-existent shipment', () => {
      expect(() => {
        service.toggleFlagShipment('non-existent-id');
      }).toThrow();
    });
  });

  describe('addTrackingData', () => {
    it('should add tracking data to a shipment', () => {
      const allShipments = service.getAllShipments();
      const shipment = allShipments[0];
      const initialTrackingCount = shipment.trackingData.length;
      
      const result = service.addTrackingData(
        shipment.id,
        'New York, NY',
        'Package scanned',
        'At sorting facility'
      );

      expect(result.trackingData.length).toBe(initialTrackingCount + 1);
      expect(result.trackingData[result.trackingData.length - 1].location).toBe('New York, NY');
    });

    it('should throw error for non-existent shipment', () => {
      expect(() => {
        service.addTrackingData('non-existent-id', 'Location', 'Status');
      }).toThrow();
    });
  });
});
