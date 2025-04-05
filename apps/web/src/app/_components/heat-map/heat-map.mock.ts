import { Transaction } from "@prisma/client";

export const faultyTransactions: Transaction[] = [
  {
    id: "tx1",
    createdAt: new Date(),
    userId: "user1",
    clientId: "client1",
    amount: 1500,
    status: "denied",
    metadata: { location: { lat: 37.7749, lng: -122.4194 } }, // San Francisco
  },
  {
    id: "tx2",
    createdAt: new Date(),
    userId: "user2",
    clientId: "client2",
    amount: 2000,
    status: "alerted",
    metadata: { location: { lat: 34.0522, lng: -118.2437 } }, // Los Angeles
  },
  {
    id: "tx3",
    createdAt: new Date(),
    userId: "user3",
    clientId: "client3",
    amount: 1800,
    status: "denied",
    metadata: { location: { lat: 40.7128, lng: -74.006 } }, // New York
  },
  {
    id: "tx4",
    createdAt: new Date(),
    userId: "user4",
    clientId: "client4",
    amount: 1750,
    status: "alerted",
    metadata: { location: { lat: 41.8781, lng: -87.6298 } }, // Chicago
  },
  {
    id: "tx5",
    createdAt: new Date(),
    userId: "user5",
    clientId: "client5",
    amount: 2200,
    status: "denied",
    metadata: { location: { lat: 29.7604, lng: -95.3698 } }, // Houston
  },
  {
    id: "tx6",
    createdAt: new Date(),
    userId: "user6",
    clientId: "client6",
    amount: 1450,
    status: "alerted",
    metadata: { location: { lat: 33.4484, lng: -112.074 } }, // Phoenix
  },
  {
    id: "tx7",
    createdAt: new Date(),
    userId: "user7",
    clientId: "client7",
    amount: 1950,
    status: "denied",
    metadata: { location: { lat: 39.7392, lng: -104.9903 } }, // Denver
  },
  {
    id: "tx8",
    createdAt: new Date(),
    userId: "user8",
    clientId: "client8",
    amount: 1600,
    status: "alerted",
    metadata: { location: { lat: 47.6062, lng: -122.3321 } }, // Seattle
  },
  {
    id: "tx9",
    createdAt: new Date(),
    userId: "user9",
    clientId: "client9",
    amount: 2100,
    status: "denied",
    metadata: { location: { lat: 25.7617, lng: -80.1918 } }, // Miami
  },
  {
    id: "tx10",
    createdAt: new Date(),
    userId: "user10",
    clientId: "client10",
    amount: 1700,
    status: "alerted",
    metadata: { location: { lat: 32.7157, lng: -117.1611 } }, // San Diego
  },
  {
    id: "tx11",
    createdAt: new Date(),
    userId: "user11",
    clientId: "client11",
    amount: 1850,
    status: "denied",
    metadata: { location: { lat: 38.9072, lng: -77.0369 } }, // Washington, D.C.
  },
  {
    id: "tx12",
    createdAt: new Date(),
    userId: "user12",
    clientId: "client12",
    amount: 1900,
    status: "alerted",
    metadata: { location: { lat: 42.3601, lng: -71.0589 } }, // Boston
  },
  {
    id: "tx13",
    createdAt: new Date(),
    userId: "user13",
    clientId: "client13",
    amount: 1550,
    status: "denied",
    metadata: { location: { lat: 36.1627, lng: -86.7816 } }, // Nashville
  },
  {
    id: "tx14",
    createdAt: new Date(),
    userId: "user14",
    clientId: "client14",
    amount: 2400,
    status: "alerted",
    metadata: { location: { lat: 39.9612, lng: -82.9988 } }, // Columbus
  },
  {
    id: "tx15",
    createdAt: new Date(),
    userId: "user15",
    clientId: "client15",
    amount: 1300,
    status: "denied",
    metadata: { location: { lat: 35.2271, lng: -80.8431 } }, // Charlotte
  },
  {
    id: "tx16",
    createdAt: new Date(),
    userId: "user16",
    clientId: "client16",
    amount: 2050,
    status: "alerted",
    metadata: { location: { lat: 39.7684, lng: -86.1581 } }, // Indianapolis
  },
  {
    id: "tx17",
    createdAt: new Date(),
    userId: "user17",
    clientId: "client17",
    amount: 2500,
    status: "denied",
    metadata: { location: { lat: 29.9511, lng: -90.0715 } }, // New Orleans
  },
  {
    id: "tx18",
    createdAt: new Date(),
    userId: "user18",
    clientId: "client18",
    amount: 1750,
    status: "alerted",
    metadata: { location: { lat: 44.9778, lng: -93.265 } }, // Minneapolis
  },
  {
    id: "tx19",
    createdAt: new Date(),
    userId: "user19",
    clientId: "client19",
    amount: 1600,
    status: "denied",
    metadata: { location: { lat: 43.0389, lng: -87.9065 } }, // Milwaukee
  },
  {
    id: "tx20",
    createdAt: new Date(),
    userId: "user20",
    clientId: "client20",
    amount: 2300,
    status: "alerted",
    metadata: { location: { lat: 45.5051, lng: -122.675 } }, // Portland
  },
  {
    id: "tx21",
    createdAt: new Date(),
    userId: "user21",
    clientId: "client21",
    amount: 1900,
    status: "denied",
    metadata: { location: { lat: 33.749, lng: -84.388 } }, // Atlanta
  },
];
