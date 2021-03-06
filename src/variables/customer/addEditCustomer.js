import {
  // required,
  maxLength,
  onlyAlphabets,
  phoneNumber,
  email,
} from "utils/validation";

// Options to render in select dropdown
export const otherServicePostOptions = [
  { label: "Not Available", value: "NA" },
  { label: "Other", value: "other" },
  { label: "Postman", value: "postman" },
  { label: "Sarpanch", value: "sarpanch" },
  { label: "Grampachayat Sadsya", value: "grampachayatSadsya" },
  { label: "Grampachayat Karmchari", value: "grampachayatKarmchari" },
  { label: "Gramrojgar Sevak", value: "gramrojgarSevak" },
  { label: "Gram Sevak", value: "gramsevak" },
  { label: "Talathi", value: "talathi" },
  { label: "Circle", value: "circle" },
  { label: "Society Shopkeeper", value: "societyShopkeeper" },
  { label: "Anganwadi Parveshika", value: "anganwadiParveshika" },
  { label: "Anganwadi Sevika", value: "anganwadiSevika" },
  { label: "Anganwadi Madatnis", value: "anganwadiMadatnis" },
  { label: "Ashatai", value: "ashatai" },
  { label: "ZP Teacher", value: "zpteacher" },
  { label: "Bachatgat", value: "Bachatgat" },
];
export const buisinessOptions = [
  { label: "Not Available", value: "NA" },
  { label: "Other", value: "other" },
  { label: "Kirana", value: "kirana" },
  { label: "Kapad", value: "kapad" },
  { label: "Saraf", value: "saraf" },
  { label: "Furniture", value: "furniture" },
  { label: "Saloon", value: "saloon" },
  { label: "Footwear", value: "footwear" },
  { label: "Hospital", value: "hospital" },
  { label: "Pithachigirani", value: "pithachigirani" },
  { label: "Mobile Shop", value: "mobileshop" },
  { label: "Hardware", value: "hardware" },
  { label: "Online Service", value: "onlineservice" },
  { label: "Photographer", value: "photographer" },
  { label: "Printing Press", value: "printingpress" },
  { label: "Milk Dairy", value: "milkdairy" },
  { label: "Krushi Seva", value: "krushiseva" },
  { label: "Medical Store", value: "medicalstore" },
  { label: "General Store", value: "generalstore" },
  { label: "Xerox", value: "xerox" },
  { label: "Marble", value: "marble" },
  { label: "Welding Workshop", value: "weldingworkshop" },
  { label: "Pathsanstha Sanchalak", value: "pathsansthasanchalak" },
  { label: "Patansanstha Karmchari", value: "patansansthakarmchari" },
  { label: "Pantapari", value: "pantapari" },
  { label: "Falwikrate", value: "falwikrate" },
  { label: "Tailoring", value: "tailoring" },
  { label: "Bakery", value: "bakery" },
  { label: "Beerbar", value: "beerbar" },
  { label: "Hotel", value: "hotel" },
  { label: "Tea Stall", value: "teastall" },
  { label: "Fourwheeler Guarage", value: "fourwheelerguarage" },
  { label: "Twowheeler Guarage", value: "twowheelerguarage" },
];
export const bankNameOptions = [
  { label: "Not Available", value: "NA" },
  { label: "Other", value: "other" },
  { label: "AXIS Bank", value: "axisbank" },
  { label: "ADCC", value: "adcc" },
  { label: "Indian Overseas Bank", value: "indianoverseasbank" },
  { label: "SBI - State Bank of India", value: "sbibank" },
  { label: "Bank of Maharashtra", value: "bankofmaharashtra" },
  { label: "Bank of baroda", value: "bankofbaroda" },
  { label: "Central bank of india", value: "centralbankofindia" },
  { label: "HDFC Bank", value: "hdfcbank" },
  { label: "Indian post bank", value: "indianpostbank" },
  { label: "Yes bank", value: "yesbank" },
];
export const supporterOptions = [
  { label: "Not Available", value: "NA" },
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
export const politicalPartyOptions = [
  { label: "Not Available", value: "NA" },
  { label: "Not Interested", value: "NA" },
  { label: "Bharatiya Janata Party (BJP)", value: "bjp" },
  { label: "Shiv Sena", value: "shivsena" },
  { label: "Republican Party of India (Athavale) - (RPI (A))", value: "rpia" },
  { label: "Nationalist Congress Party (NCP)", value: "ncp" },
  { label: "Indian National Congress (Congress)", value: "inc" },
  { label: "Maharashtra Navnirman Sena (MNS)", value: "mns" },
  { label: "All India Majlis-e-Ittehadul Muslimeen (AIMIM)", value: "aimim" },
];
export const talukaOptions = [{ label: "Parner", value: "parner" }];
export const districtOptions = [{ label: "Ahmednagar", value: "ahmednagar" }];
export const stateOptions = [{ label: "Maharashtra", value: "MH" }];

// Fields to render in AddEditCustomer Form
// key : unique identifier
// label : to show label on screen
// required : true/false
// component : textfield/select
// defaultValue :
// * Select Component : Copy/paste option's value which want to be the default value
// * TextField Component : String value which want to be the default value
export const addEditCustomerFields = [
  {
    key: "firstName",
    label: "First Name",
    required: false,
    validate: [onlyAlphabets],
    component: "textField",
  },
  {
    key: "middleName",
    label: "Middle Name",
    required: false,
    validate: [onlyAlphabets],
    component: "textField",
  },
  {
    key: "lastName",
    label: "Last Name",
    required: false,
    validate: [onlyAlphabets],
    component: "textField",
  },
  {
    key: "mobileNo",
    label: "Mobile Number",
    required: false,
    validate: [phoneNumber],
    component: "textField",
  },
  {
    key: "birthdate",
    label: "Birthdate",
    required: false,
    component: "textField",
    defaultValue: "01-01-1000",
  },
  {
    key: "emailId",
    label: "EmailID",
    required: false,
    validate: [email],
    component: "textField",
  },
  {
    key: "address",
    label: "Address",
    required: false,
    component: "textField",
  },
  {
    key: "village",
    label: "Village",
    required: false,
    component: "textField",
  },
  {
    key: "post",
    label: "Post",
    required: false,
    validate: [onlyAlphabets],
    component: "textField",
  },
  {
    key: "taluka",
    label: "Taluka",
    required: false,
    component: "select",
    options: talukaOptions,
    defaultValue: "parner",
  },
  {
    key: "district",
    label: "District",
    required: false,
    component: "select",
    options: districtOptions,
    defaultValue: "ahmednagar",
  },
  {
    key: "state",
    label: "State",
    required: false,
    component: "select",
    options: stateOptions,
    defaultValue: "MH",
  },
  {
    key: "pincode",
    label: "Pincode",
    required: false,
    component: "textField",
  },
  {
    key: "otherServicePost",
    label: "Other Service Post",
    required: false,
    component: "select",
    options: otherServicePostOptions,
    // defaultValue: "NA",
  },
  {
    key: "buisiness",
    label: "buisiness",
    required: false,
    component: "select",
    options: buisinessOptions,
    // defaultValue: "NA",
  },
  {
    key: "adharcard",
    label: "Aadhar Card",
    required: false,
    validate: [maxLength(12)],
    component: "textField",
  },
  {
    key: "pancard",
    label: "Pancard",
    required: false,
    validate: [maxLength(12)],
    component: "textField",
  },
  {
    key: "bankName",
    label: "Bank Name",
    required: false,
    component: "select",
    options: bankNameOptions,
    // defaultValue: "NA",
  },
  {
    key: "accountNo",
    label: "Account Number",
    required: false,
    component: "textField",
  },
  {
    key: "votingNo",
    label: "Voting Number",
    required: false,
    validate: [maxLength(12)],
    component: "textField",
  },
  {
    key: "wardNo",
    label: "Ward Number",
    required: false,
    component: "textField",
  },
  {
    key: "booth",
    label: "Booth",
    required: false,
    component: "textField",
  },
  {
    key: "supporter",
    label: "Supporter",
    required: false,
    component: "select",
    options: supporterOptions,
    // defaultValue: "NA",
  },
  {
    key: "politicalParty",
    label: "Political Party",
    required: false,
    component: "select",
    options: politicalPartyOptions,
    // defaultValue: "NA",
  },
  {
    key: "sanghtana",
    label: "Sanghtana",
    required: false,
    component: "textField",
  },
];
