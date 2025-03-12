const domain = window.location.origin;
const apiEndPoint = domain.replace(':4200', ':8000')

export const userDataUrl = apiEndPoint + '/api/userdata/';
export const codetovideoUrl = apiEndPoint + '/api/codetovideo/';
export const ordersUrl = apiEndPoint + '/api/orders/';
export const cpuusage = apiEndPoint + '/api/cpuusage/';
export const domainstable = apiEndPoint + '/api/domainstable/';
