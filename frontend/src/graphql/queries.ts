import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      name
      role
      createdAt
    }
  }
`;

export const GET_SHIPMENTS = gql`
  query GetShipments($filter: ShipmentFilter, $pagination: PaginationInput) {
    shipments(filter: $filter, pagination: $pagination) {
      shipments {
        id
        shipperName
        carrierName
        pickupLocation {
          address
          city
          state
          zipCode
          country
        }
        deliveryLocation {
          address
          city
          state
          zipCode
          country
        }
        trackingNumber
        status
        weight
        dimensions {
          length
          width
          height
        }
        rate
        currency
        estimatedDelivery
        actualDelivery
        trackingData {
          timestamp
          location
          status
          notes
        }
        flagged
        notes
        createdAt
        updatedAt
      }
      totalCount
      totalPages
      currentPage
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_SHIPMENT = gql`
  query GetShipment($id: ID!) {
    shipment(id: $id) {
      id
      shipperName
      carrierName
      pickupLocation {
        address
        city
        state
        zipCode
        country
      }
      deliveryLocation {
        address
        city
        state
        zipCode
        country
      }
      trackingNumber
      status
      weight
      dimensions {
        length
        width
        height
      }
      rate
      currency
      estimatedDelivery
      actualDelivery
      trackingData {
        timestamp
        location
        status
        notes
      }
      flagged
      notes
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_SHIPMENTS = gql`
  query SearchShipments($searchTerm: String!) {
    searchShipments(searchTerm: $searchTerm) {
      id
      shipperName
      carrierName
      trackingNumber
      status
      flagged
    }
  }
`;

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: ShipmentInput!) {
    createShipment(input: $input) {
      id
      shipperName
      carrierName
      trackingNumber
      status
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($input: UpdateShipmentInput!) {
    updateShipment(input: $input) {
      id
      shipperName
      carrierName
      status
      updatedAt
    }
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`;

export const TOGGLE_FLAG_SHIPMENT = gql`
  mutation ToggleFlagShipment($id: ID!) {
    toggleFlagShipment(id: $id) {
      id
      flagged
    }
  }
`;

export const ADD_TRACKING_DATA = gql`
  mutation AddTrackingData($id: ID!, $location: String!, $status: String!, $notes: String) {
    addTrackingData(id: $id, location: $location, status: $status, notes: $notes) {
      id
      trackingData {
        timestamp
        location
        status
        notes
      }
    }
  }
`;
