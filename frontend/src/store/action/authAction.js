import request from '../../helpers/communication';

const register = (e, history) => (dispatch) => {
  request.sendPost('auth/register', e.target).then(() => {
    dispatch({ type: 'REGISTER' });
    history.push('/login');
  }, () => {
    dispatch({ type: 'REGISTER_ERROR' });
  });
};

const login = (e, history) => (dispatch) => {
  request.sendPost('auth/login', e.target).then((resp) => {
    if (resp.data.isAdmin) dispatch({ type: 'ISADMIN' });
    dispatch({ type: 'LOGIN' });
    if (resp.data.isAdmin) {
      history.push('/adminHome');
    } else {
      history.push('/userHome');
    }
  }, () => {
    dispatch({ type: 'LOGIN_ERROR' });
  });
};

const logout = (isAdmin) => (dispatch) => {
  request.get('auth/logout').then(() => {
    if (isAdmin) dispatch({ type: 'ISADMIN' });
    dispatch({ type: 'LOGOUT' });
  });
};

const isioggedin = () => (dispatch) => {
  request.get('auth/logged_in').then((req) => {
    if (req.data.logged_in) dispatch({ type: 'LOGIN' });
  });
};

const isadmin = () => (dispatch) => {
  dispatch({ type: 'ISADMIN' });
};

export default {
  register, login, logout, isadmin, isioggedin,
};
