// Options to render in select dropdown
export const serviceTypeOptions = [
  { label: "Adharcard", value: "adharcard" },
  { label: "Adharcard-PVC", value: "adharcardPVC" },
  { label: "Pancard", value: "pancard" },
  { label: "PM-Kisan", value: "PMKisan" },
  { label: "Satbara Utara) ", value: "satbarautara) " },
  { label: "SanjayGandhi-Vidhava", value: "sanjayGandhiVidhava" },
  { label: "SanjayGandhi-ShravanBal", value: "sanjayGandhiShravanBal" },
  { label: "JobCard", value: "jobCard" },
  { label: "KisanCreditCard", value: "kisanCreditCard" },
  { label: "Photo", value: "photo" },
  { label: "Other", value: "other" },
];
export const statusOptions = [
  { label: "In-Progress", value: "inprogress" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

// Fields to render in AddEditService Form
// key : unique identifier
// label : to show label on screen
// required : true/false
// component : textfield/select
// defaultValue :
// * Select Component : Copy/paste option's value which want to be the default value
// * TextField Component : String value which want to be the default value
export const addEditServiceFields = [
  {
    key: "serviceType",
    label: "Service Type",
    required: false,
    component: "select",
    options: serviceTypeOptions,
    defaultValue: "select",
  },
  {
    key: "requestDate",
    label: "Request Date",
    required: false,
    component: "textField",
    // type: "date",
  },
  {
    key: "deliveryDate",
    label: "Delivery Date",
    required: false,
    component: "textField",
    // type: "date",
  },
  {
    key: "payment",
    label: "Payment",
    required: false,
    component: "textField",
    type: "number",
  },
  {
    key: "maintainance",
    label: "Maintainance",
    required: false,
    component: "textField",
    type: "number",
  },
  {
    key: "recieptNo",
    label: "Reciept No.",
    required: false,
    component: "textField",
  },
  {
    key: "postTrackNo",
    label: "Post Track No.",
    required: false,
    component: "textField",
  },
  {
    key: "status",
    label: "Status",
    required: false,
    component: "select",
    options: statusOptions,
    defaultValue: "inprogress",
  },
  {
    key: "statusInfo",
    label: "Status Information",
    required: false,
    component: "textField",
  },
  {
    key: "registerNo",
    label: "Register No",
    required: false,
    component: "textField",
  },
];
