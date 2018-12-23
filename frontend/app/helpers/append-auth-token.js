export function appendAuthToken(type) {
  let token = localStorage.getItem('jwt');
  const headerObj = {};
  if (type === 'json') {
    headerObj['Content-Type'] = 'application/json';
  } else {
    headerObj['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (token) {
    headerObj['Authorization'] = `Bearer ${token}`;
  }

  return headerObj;
}
