export interface IItemLabel {
  id: string;
  label: string;
}
export interface IItemName {
  id: string;
  name: string;
}
export const DEFAULT_ALERT_MAPARRAY:any = [["error",""],["warn",""],["wait",""],["success",""],["neutral",""]]


export const USERS_DB = {
  "user":{name: "John Doe", grants:{unit:{add:true,delete:false}}},
  "admin":{name: "ADMIN", grants:{unit:{add:false,delete:true}}},
}

export const FAKE_UNIT_FOREIGNS = {
  sales_statuses: [
    {id:"1", label: "Available"},
    {id:"2", label: "Rented"},
    {id:"3", label: "Sold"},
    {id:"4", label: "Not Available"},
  ],
  customersArray: [],
  orgsArray: [],
  dealers: [],
}

export const INSTITUTION = {
  title: "ServicePad",
  email: "support@servicepad.com",
  titleSupport: "ServicePad Customer Support:",
  copyrights: "© 2022 ServicePad, Inc. All rights reserved.",
}