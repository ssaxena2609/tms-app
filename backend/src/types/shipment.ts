export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface TrackingData {
  timestamp: string;
  location: string;
  status: string;
  notes?: string;
}

export interface Shipment {
  id: string;
  shipperName: string;
  carrierName: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  trackingNumber: string;
  status: ShipmentStatus;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  rate: number;
  currency: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  trackingData: TrackingData[];
  flagged: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentInput {
  shipperName: string;
  carrierName: string;
  pickupLocation: LocationInput;
  deliveryLocation: LocationInput;
  weight: number;
  dimensions: DimensionsInput;
  rate: number;
  currency?: string;
  estimatedDelivery: string;
  notes?: string;
}

export interface LocationInput {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DimensionsInput {
  length: number;
  width: number;
  height: number;
}

export interface UpdateShipmentInput {
  id: string;
  shipperName?: string;
  carrierName?: string;
  pickupLocation?: LocationInput;
  deliveryLocation?: LocationInput;
  status?: ShipmentStatus;
  weight?: number;
  dimensions?: DimensionsInput;
  rate?: number;
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
}

export interface ShipmentFilter {
  status?: ShipmentStatus;
  carrierName?: string;
  shipperName?: string;
  flagged?: boolean;
}

export interface PaginationInput {
  page: number;
  limit: number;
}

export interface PaginatedShipments {
  shipments: Shipment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
