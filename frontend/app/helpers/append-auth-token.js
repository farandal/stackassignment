export function appendAuthToken() {
  let token = localStorage.getItem('jwt');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  } else {
    return {};
  }
}
