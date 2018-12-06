import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import AdminHomeComp from './admin-home-component';


let AdminHome = withRouter(AdminHomeComp);

export default AdminHome;