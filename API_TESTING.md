# API Testing Guide

## GraphQL Playground

Access the GraphQL Playground at: http://localhost:4000/graphql

## Sample Queries

### 1. Get All Shipments (with Pagination)

```graphql
query GetShipments {
  shipments(pagination: { page: 1, limit: 10 }) {
    shipments {
      id
      trackingNumber
      status
      shipperName
      carrierName
      pickupLocation {
        city
        state
      }
      deliveryLocation {
        city
        state
      }
      rate
      currency
      estimatedDelivery
      flagged
    }
    totalCount
    totalPages
    currentPage
    hasNextPage
    hasPreviousPage
  }
}
```

### 2. Get Shipments with Filters

```graphql
query GetFilteredShipments {
  shipments(
    filter: { 
      status: IN_TRANSIT,
      carrierName: "FedEx"
    }
    pagination: { page: 1, limit: 5 }
  ) {
    shipments {
      id
      trackingNumber
      status
      carrierName
    }
    totalCount
  }
}
```

### 3. Get Flagged Shipments

```graphql
query GetFlaggedShipments {
  shipments(
    filter: { flagged: true }
    pagination: { page: 1, limit: 10 }
  ) {
    shipments {
      id
      trackingNumber
      flagged
      status
    }
    totalCount
  }
}
```

### 4. Get Single Shipment Details

```graphql
query GetShipment {
  shipment(id: "SHIPMENT_ID_HERE") {
    id
    trackingNumber
    status
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
```

### 5. Search Shipments

```graphql
query SearchShipments {
  searchShipments(searchTerm: "FedEx") {
    id
    trackingNumber
    shipperName
    carrierName
    status
  }
}
```

## Sample Mutations

### 1. Create New Shipment

```graphql
mutation CreateShipment {
  createShipment(
    input: {
      shipperName: "Acme Corporation"
      carrierName: "FedEx"
      pickupLocation: {
        address: "123 Main St"
        city: "New York"
        state: "NY"
        zipCode: "10001"
        country: "USA"
      }
      deliveryLocation: {
        address: "456 Market St"
        city: "San Francisco"
        state: "CA"
        zipCode: "94102"
        country: "USA"
      }
      weight: 25.5
      dimensions: {
        length: 24.0
        width: 18.0
        height: 12.0
      }
      rate: 149.99
      currency: "USD"
      estimatedDelivery: "2024-02-15T10:00:00Z"
      notes: "Handle with care - Fragile items"
    }
  ) {
    id
    trackingNumber
    status
    shipperName
    carrierName
  }
}
```

### 2. Update Shipment

```graphql
mutation UpdateShipment {
  updateShipment(
    input: {
      id: "SHIPMENT_ID_HERE"
      status: IN_TRANSIT
      notes: "Package picked up and in transit"
    }
  ) {
    id
    status
    notes
    updatedAt
  }
}
```

### 3. Update Shipment Status to Delivered

```graphql
mutation MarkAsDelivered {
  updateShipment(
    input: {
      id: "SHIPMENT_ID_HERE"
      status: DELIVERED
      actualDelivery: "2024-02-10T14:30:00Z"
    }
  ) {
    id
    status
    actualDelivery
    updatedAt
  }
}
```

### 4. Toggle Flag on Shipment

```graphql
mutation ToggleFlag {
  toggleFlagShipment(id: "SHIPMENT_ID_HERE") {
    id
    flagged
  }
}
```

### 5. Add Tracking Data

```graphql
mutation AddTracking {
  addTrackingData(
    id: "SHIPMENT_ID_HERE"
    location: "Chicago, IL"
    status: "Package arrived at sorting facility"
    notes: "Package on schedule"
  ) {
    id
    trackingData {
      timestamp
      location
      status
      notes
    }
  }
}
```

### 6. Delete Shipment

```graphql
mutation DeleteShipment {
  deleteShipment(id: "SHIPMENT_ID_HERE")
}
```

## Testing Workflow

### Step 1: Get Initial Data
First, fetch some shipments to get valid IDs:

```graphql
query {
  shipments(pagination: { page: 1, limit: 5 }) {
    shipments {
      id
      trackingNumber
    }
  }
}
```

### Step 2: Test Filtering
Use the IDs from Step 1 to test various filters:

```graphql
query {
  shipments(
    filter: { status: PENDING }
    pagination: { page: 1, limit: 10 }
  ) {
    shipments {
      id
      status
    }
    totalCount
  }
}
```

### Step 3: Test CRUD Operations

1. **Create** a new shipment
2. **Read** the shipment details
3. **Update** the shipment status
4. **Delete** the shipment

### Step 4: Test Edge Cases

```graphql
# Test pagination boundaries
query {
  shipments(pagination: { page: 100, limit: 10 }) {
    shipments { id }
    totalCount
    currentPage
    hasNextPage
  }
}

# Test empty search
query {
  searchShipments(searchTerm: "NONEXISTENT12345") {
    id
  }
}
```

## Expected Results

### Successful Query Response
```json
{
  "data": {
    "shipments": {
      "shipments": [...],
      "totalCount": 50,
      "totalPages": 5,
      "currentPage": 1,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

### Successful Mutation Response
```json
{
  "data": {
    "createShipment": {
      "id": "uuid-here",
      "trackingNumber": "TRK...",
      "status": "PENDING"
    }
  }
}
```

### Error Response
```json
{
  "errors": [
    {
      "message": "Shipment with ID xyz not found",
      "locations": [...],
      "path": [...]
    }
  ],
  "data": null
}
```

## Testing with cURL

### Query Example
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { shipments(pagination: { page: 1, limit: 5 }) { shipments { id trackingNumber } totalCount } }"
  }'
```

### Mutation Example
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { toggleFlagShipment(id: \"YOUR_ID_HERE\") { id flagged } }"
  }'
```

## Performance Testing

### Load Test Query
```graphql
query LoadTest {
  shipments(pagination: { page: 1, limit: 100 }) {
    shipments {
      id
      trackingNumber
      status
      shipperName
      carrierName
    }
    totalCount
  }
}
```

## Debugging Tips

1. **Enable GraphQL Playground introspection** - Explore the schema
2. **Check Network Tab** - See actual requests/responses
3. **Use GraphQL Variables** - For dynamic testing
4. **Check Backend Logs** - See console output
5. **Verify Environment Variables** - Ensure correct configuration

## Common Test Scenarios

### Scenario 1: Complete Shipment Lifecycle
1. Create shipment (PENDING)
2. Add tracking (picked up)
3. Update to IN_TRANSIT
4. Add more tracking
5. Update to DELIVERED
6. Add actual delivery date

### Scenario 2: Filter and Search
1. Get all PENDING shipments
2. Search for specific carrier
3. Get flagged shipments
4. Combine multiple filters

### Scenario 3: Pagination
1. Get page 1
2. Get page 2
3. Verify no overlap
4. Check total count consistency

---

Happy Testing! 🧪
