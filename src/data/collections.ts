export interface CollectionData {
  id: string;
  name: string;
  count: number;
  dateCreated: string;
}

export const collectionsData: CollectionData[] = [
  {
    id: "col-001",
    name: "Evergreen lists",
    count: 12,
    dateCreated: "15/01/2025",
  },
  {
    id: "col-002",
    name: "Campaign lists",
    count: 8,
    dateCreated: "22/03/2025",
  },
  {
    id: "col-003",
    name: "Summer 2026",
    count: 5,
    dateCreated: "01/06/2025",
  },
  {
    id: "col-004",
    name: "Archived",
    count: 23,
    dateCreated: "10/09/2024",
  },
];

export const myCollectionsData: CollectionData[] = [
  {
    id: "col-003",
    name: "Summer 2026",
    count: 5,
    dateCreated: "01/06/2025",
  },
];
