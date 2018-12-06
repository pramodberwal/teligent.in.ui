import React from 'react';
import {connect} from 'react-redux';

import AppFooterComp from './app-footer-component';

let mapStateToProps = (state)=>{

    return state;
};

let mapDispatchToProps = (dispatch) =>{

    return {};
};


let AppFooter = connect(mapStateToProps,mapDispatchToProps)(AppFooterComp);

export default AppFooter;
