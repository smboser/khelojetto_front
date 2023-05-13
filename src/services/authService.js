import Settings from '../config/config';
import jwtDecode from 'jwt-decode';

const saveToken = (tokenPayload) => {
  if (tokenPayload !== '') {
    localStorage.setItem(Settings.tokenName, tokenPayload);
  }
};

const getToken = () => {
  let tokenPayload = null;
  tokenPayload = localStorage.getItem(Settings.tokenName);
  return tokenPayload;
};

const logout = () => {
  localStorage.removeItem(Settings.tokenName);
};

const isLoggedIn = () => {
  let tokenPayload = getToken();
  let decodedTokenPayload = jwtDecode(tokenPayload);
  console.log(decodedTokenPayload.exp + '--' + Date.now());
  if (decodedTokenPayload?.exp && decodedTokenPayload.exp * 1000 > Date.now()) {
    return true;
  } else {
    return false;
  }
};

const authServices = {
  saveToken,
  getToken,
  isLoggedIn,
  logout
};

export default authServices;
