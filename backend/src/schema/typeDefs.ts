import { gql } from 'graphql-tag';
import { authTypeDefs } from './authTypeDefs';

const shipmentTypeDefs = gql`
  type Location {
    address: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }

  type Dimensions {
    length: Float!
    width: Float!
    height: Float!
  }

  type TrackingData {
    timestamp: String!
    location: String!
    status: String!
    notes: String
  }

  enum ShipmentStatus {
    PENDING
    IN_TRANSIT
    DELIVERED
    CANCELLED
  }

  type Shipment {
    id: ID!
    shipperName: String!
    carrierName: String!
    pickupLocation: Location!
    deliveryLocation: Location!
    trackingNumber: String!
    status: ShipmentStatus!
    weight: Float!
    dimensions: Dimensions!
    rate: Float!
    currency: String!
    estimatedDelivery: String!
    actualDelivery: String
    trackingData: [TrackingData!]!
    flagged: Boolean!
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedShipments {
    shipments: [Shipment!]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  input LocationInput {
    address: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }

  input DimensionsInput {
    length: Float!
    width: Float!
    height: Float!
  }

  input ShipmentInput {
    shipperName: String!
    carrierName: String!
    pickupLocation: LocationInput!
    deliveryLocation: LocationInput!
    weight: Float!
    dimensions: DimensionsInput!
    rate: Float!
    currency: String
    estimatedDelivery: String!
    notes: String
  }

  input UpdateShipmentInput {
    id: ID!
    shipperName: String
    carrierName: String
    pickupLocation: LocationInput
    deliveryLocation: LocationInput
    status: ShipmentStatus
    weight: Float
    dimensions: DimensionsInput
    rate: Float
    estimatedDelivery: String
    actualDelivery: String
    notes: String
  }

  input ShipmentFilter {
    status: ShipmentStatus
    carrierName: String
    shipperName: String
    flagged: Boolean
  }

  input PaginationInput {
    page: Int!
    limit: Int!
  }

  type Query {
    shipments(filter: ShipmentFilter, pagination: PaginationInput): PaginatedShipments!
    shipment(id: ID!): Shipment
    searchShipments(searchTerm: String!): [Shipment!]!
  }

  type Mutation {
    createShipment(input: ShipmentInput!): Shipment!
    updateShipment(input: UpdateShipmentInput!): Shipment!
    deleteShipment(id: ID!): Boolean!
    toggleFlagShipment(id: ID!): Shipment!
    addTrackingData(id: ID!, location: String!, status: String!, notes: String): Shipment!
  }
`;

export const typeDefs = [shipmentTypeDefs, authTypeDefs];
