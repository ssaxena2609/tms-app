import { v4 as uuidv4 } from 'uuid';
import {
  Shipment,
  ShipmentInput,
  UpdateShipmentInput,
  ShipmentFilter,
  PaginationInput,
  PaginatedShipments,
  ShipmentStatus
} from '../types/shipment';
import { generateMockShipments } from '../data/mockData';

class ShipmentService {
  private shipments: Shipment[] = [];

  constructor() {
    this.shipments = generateMockShipments();
  }

  getShipments(filter?: ShipmentFilter, pagination?: PaginationInput): PaginatedShipments {
    let filteredShipments = [...this.shipments];

    if (filter) {
      if (filter.status) {
        filteredShipments = filteredShipments.filter(s => s.status === filter.status);
      }
      if (filter.carrierName) {
        filteredShipments = filteredShipments.filter(s => 
          s.carrierName.toLowerCase().includes(filter.carrierName!.toLowerCase())
        );
      }
      if (filter.shipperName) {
        filteredShipments = filteredShipments.filter(s => 
          s.shipperName.toLowerCase().includes(filter.shipperName!.toLowerCase())
        );
      }
      if (filter.flagged !== undefined) {
        filteredShipments = filteredShipments.filter(s => s.flagged === filter.flagged);
      }
    }

    const totalCount = filteredShipments.length;
    
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedShipments = filteredShipments.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      shipments: paginatedShipments,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  }

  getShipmentById(id: string): Shipment | undefined {
    return this.shipments.find(s => s.id === id);
  }

  searchShipments(searchTerm: string): Shipment[] {
    const term = searchTerm.toLowerCase();
    return this.shipments.filter(s => 
      s.trackingNumber.toLowerCase().includes(term) ||
      s.shipperName.toLowerCase().includes(term) ||
      s.carrierName.toLowerCase().includes(term) ||
      s.pickupLocation.city.toLowerCase().includes(term) ||
      s.deliveryLocation.city.toLowerCase().includes(term)
    );
  }

  createShipment(input: ShipmentInput): Shipment {
    const now = new Date().toISOString();
    const trackingNumber = `TRK${uuidv4().substring(0, 13).toUpperCase().replace(/-/g, '')}`;
    
    const newShipment: Shipment = {
      id: uuidv4(),
      shipperName: input.shipperName,
      carrierName: input.carrierName,
      pickupLocation: input.pickupLocation,
      deliveryLocation: input.deliveryLocation,
      trackingNumber,
      status: ShipmentStatus.PENDING,
      weight: input.weight,
      dimensions: input.dimensions,
      rate: input.rate,
      currency: input.currency || 'USD',
      estimatedDelivery: input.estimatedDelivery,
      trackingData: [
        {
          timestamp: now,
          location: `${input.pickupLocation.city}, ${input.pickupLocation.state}`,
          status: 'Shipment created',
          notes: 'Awaiting pickup'
        }
      ],
      flagged: false,
      notes: input.notes,
      createdAt: now,
      updatedAt: now
    };

    this.shipments.unshift(newShipment);
    return newShipment;
  }

  updateShipment(input: UpdateShipmentInput): Shipment {
    const index = this.shipments.findIndex(s => s.id === input.id);
    
    if (index === -1) {
      throw new Error(`Shipment with ID ${input.id} not found`);
    }

    const existingShipment = this.shipments[index];
    const updatedShipment: Shipment = {
      ...existingShipment,
      ...Object.fromEntries(
        Object.entries(input).filter(([_, v]) => v !== undefined && v !== null)
      ),
      updatedAt: new Date().toISOString()
    };

    this.shipments[index] = updatedShipment;
    return updatedShipment;
  }

  deleteShipment(id: string): boolean {
    const index = this.shipments.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error(`Shipment with ID ${id} not found`);
    }

    this.shipments.splice(index, 1);
    return true;
  }

  toggleFlagShipment(id: string): Shipment {
    const shipment = this.shipments.find(s => s.id === id);
    
    if (!shipment) {
      throw new Error(`Shipment with ID ${id} not found`);
    }

    shipment.flagged = !shipment.flagged;
    shipment.updatedAt = new Date().toISOString();
    
    return shipment;
  }

  addTrackingData(id: string, location: string, status: string, notes?: string): Shipment {
    const shipment = this.shipments.find(s => s.id === id);
    
    if (!shipment) {
      throw new Error(`Shipment with ID ${id} not found`);
    }

    shipment.trackingData.push({
      timestamp: new Date().toISOString(),
      location,
      status,
      notes
    });
    
    shipment.updatedAt = new Date().toISOString();
    
    return shipment;
  }

  getAllShipments(): Shipment[] {
    return this.shipments;
  }

  clearShipments(): void {
    this.shipments = [];
  }
}

export default ShipmentService;
