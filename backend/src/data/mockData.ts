import { Shipment, ShipmentStatus } from '../types/shipment';
import { v4 as uuidv4 } from 'uuid';

export const generateMockShipments = (): Shipment[] => {
  const carriers = ['FedEx', 'UPS', 'DHL', 'USPS', 'Amazon Logistics'];
  const shippers = ['Acme Corp', 'TechStart Inc', 'Global Imports', 'FastShip LLC', 'MegaStore'];
  const cities = [
    { city: 'New York', state: 'NY', country: 'USA' },
    { city: 'Los Angeles', state: 'CA', country: 'USA' },
    { city: 'Chicago', state: 'IL', country: 'USA' },
    { city: 'Houston', state: 'TX', country: 'USA' },
    { city: 'Phoenix', state: 'AZ', country: 'USA' },
    { city: 'Miami', state: 'FL', country: 'USA' },
    { city: 'Seattle', state: 'WA', country: 'USA' },
    { city: 'Boston', state: 'MA', country: 'USA' }
  ];

  const shipments: Shipment[] = [];

  for (let i = 0; i < 50; i++) {
    const pickup = cities[Math.floor(Math.random() * cities.length)];
    let delivery = cities[Math.floor(Math.random() * cities.length)];
    
    // Ensure pickup and delivery are different
    while (delivery.city === pickup.city) {
      delivery = cities[Math.floor(Math.random() * cities.length)];
    }

    const createdDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const estimatedDelivery = new Date(createdDate.getTime() + (3 + Math.random() * 10) * 24 * 60 * 60 * 1000);
    
    const statuses = Object.values(ShipmentStatus);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const trackingData = [
      {
        timestamp: createdDate.toISOString(),
        location: `${pickup.city}, ${pickup.state}`,
        status: 'Package picked up',
        notes: 'Package received at origin facility'
      }
    ];

    if (status === ShipmentStatus.IN_TRANSIT || status === ShipmentStatus.DELIVERED) {
      const transitDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
      trackingData.push({
        timestamp: transitDate.toISOString(),
        location: 'Distribution Center',
        status: 'In transit',
        notes: 'Package in transit to destination'
      });
    }

    if (status === ShipmentStatus.DELIVERED) {
      const deliveryDate = new Date(createdDate.getTime() + (2 + Math.random() * 5) * 24 * 60 * 60 * 1000);
      trackingData.push({
        timestamp: deliveryDate.toISOString(),
        location: `${delivery.city}, ${delivery.state}`,
        status: 'Delivered',
        notes: 'Package delivered successfully'
      });
    }

    shipments.push({
      id: uuidv4(),
      shipperName: shippers[Math.floor(Math.random() * shippers.length)],
      carrierName: carriers[Math.floor(Math.random() * carriers.length)],
      pickupLocation: {
        address: `${Math.floor(Math.random() * 9999) + 100} ${['Main', 'Oak', 'Maple', 'Cedar'][Math.floor(Math.random() * 4)]} St`,
        city: pickup.city,
        state: pickup.state,
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: pickup.country
      },
      deliveryLocation: {
        address: `${Math.floor(Math.random() * 9999) + 100} ${['Park', 'Hill', 'Lake', 'River'][Math.floor(Math.random() * 4)]} Ave`,
        city: delivery.city,
        state: delivery.state,
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: delivery.country
      },
      trackingNumber: `TRK${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
      status,
      weight: Math.round((Math.random() * 100 + 1) * 10) / 10,
      dimensions: {
        length: Math.round((Math.random() * 50 + 10) * 10) / 10,
        width: Math.round((Math.random() * 40 + 10) * 10) / 10,
        height: Math.round((Math.random() * 30 + 5) * 10) / 10
      },
      rate: Math.round((Math.random() * 500 + 50) * 100) / 100,
      currency: 'USD',
      estimatedDelivery: estimatedDelivery.toISOString(),
      actualDelivery: status === ShipmentStatus.DELIVERED 
        ? new Date(createdDate.getTime() + (2 + Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      trackingData,
      flagged: Math.random() > 0.85,
      notes: Math.random() > 0.7 ? 'Fragile - Handle with care' : undefined,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  return shipments;
};
