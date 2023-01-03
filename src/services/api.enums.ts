export enum filterUrls {
  rulePermissions = "resource-api/permission/fetchPermissions",
  rule = "resource-api/role/filter",
  customerSegment = "core-api/customersegment/filter",
}
export enum addEditUrls {
  rule = "resource-api/role",
  serviceProvision = "core-api/servicedeliveryservice",
  customerSegment = "core-api/customersegment/",
}
export enum deleteUrls {
  rule = "resource-api/role",
  servicedeliveryservice = "core-api/servicedeliveryservice",
  customersegment = "core-api/customersegment",
}
export enum selectUrls {
  rulesFilter = "resource-api/permission/select",
  customers = "resource-api/customer/select?filter=",
}
export enum getUrls {
  customerSegment = "core-api/customersegment/",
}
