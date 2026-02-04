import ShipmentService from '../services/shipmentService';
import {
  ShipmentInput,
  UpdateShipmentInput,
  ShipmentFilter,
  PaginationInput
} from '../types/shipment';
import { authResolvers } from './authResolvers';
import { Context } from '../types/auth';

const shipmentService = new ShipmentService();

const shipmentResolvers = {
  Query: {
    shipments: (_: unknown, { filter, pagination }: { filter?: ShipmentFilter; pagination?: PaginationInput }, _context: Context) => {
      return shipmentService.getShipments(filter, pagination);
    },
    
    shipment: (_: unknown, { id }: { id: string }, _context: Context) => {
      const shipment = shipmentService.getShipmentById(id);
      if (!shipment) {
        throw new Error(`Shipment with ID ${id} not found`);
      }
      return shipment;
    },
    
    searchShipments: (_: unknown, { searchTerm }: { searchTerm: string }, _context: Context) => {
      return shipmentService.searchShipments(searchTerm);
    }
  },

  Mutation: {
    createShipment: (_: unknown, { input }: { input: ShipmentInput }, context: Context) => {
      if (!context.user) throw new Error('Not authenticated');
      return shipmentService.createShipment(input);
    },
    
    updateShipment: (_: unknown, { input }: { input: UpdateShipmentInput }, context: Context) => {
      if (!context.user) throw new Error('Not authenticated');
      return shipmentService.updateShipment(input);
    },
    
    deleteShipment: (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.user) throw new Error('Not authenticated');
      if (context.user.role !== 'ADMIN') {
        throw new Error('Not authorized. Admin access required.');
      }
      return shipmentService.deleteShipment(id);
    },
    
    toggleFlagShipment: (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.user) throw new Error('Not authenticated');
      return shipmentService.toggleFlagShipment(id);
    },
    
    addTrackingData: (
      _: unknown,
      { id, location, status, notes }: { id: string; location: string; status: string; notes?: string },
      context: Context
    ) => {
      if (!context.user) throw new Error('Not authenticated');
      return shipmentService.addTrackingData(id, location, status, notes);
    }
  }
};

export const resolvers = {
  Query: {
    ...shipmentResolvers.Query,
    ...authResolvers.Query,
  },
  Mutation: {
    ...shipmentResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};
