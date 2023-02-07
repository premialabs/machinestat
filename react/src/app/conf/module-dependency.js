export const deps = {
  Enterprise: [],
  Inventory: ["PartCatalog"],
  PartCatalog: [""],
  CustomerOrder: ["Enterprise", "Inventory"],
  PurchaseOrder: ["Enterprise", "Inventory"]
}