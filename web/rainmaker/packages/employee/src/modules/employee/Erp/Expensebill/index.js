import React, { Component } from "react";
// import { faceOne } from 'egov-ui-kit/assets/images/faceOne.jpg';

class ErpExpenseBill extends Component{


    render(){ 
    
            // let auth_token = '7d030b3d-a094-4c49-a223-b59afdea0f75';
            let auth_token = localStorage.getItem('token');
            let menuUrl = this.props.location.pathname;
            let loc = window.location;
            // let erp_url= 'http://longowal.coexit-dev.org/EGF/expensebill/newform';
            let erp_url= loc.protocol+"//"+localStorage.getItem('tenant-id').split('.')[1]+"."+loc.hostname+menuUrl;
            console.log("logged user token "+localStorage.getItem('token'));
            console.log("tenat-info :"+ localStorage.getItem('tenant-id'));
            console.log("ERP URL : "+erp_url);
            let userInfo = JSON.parse(localStorage.getItem('user-info'));
            let tenantId = localStorage.getItem('tenant-id');

            return (
                    <div>
                    <iframe name="erp_iframe" height="800" width="1100"></iframe>
                     <form action={erp_url} id="erp_form" method="post" target="erp_iframe">
                      
                        <input hidden="true" name="auth_token" value={auth_token}></input>
                    
                  </form>

                    </div>
                );
    }
    componentDidMount(){
        console.log('component mounted');
        // console.log('event registration completed');
         console.log("***************************************************************")
        console.log('document value ::'+document.forms['erp_form']);
        document.forms['erp_form'].submit();
        console.log('event registration completed');
        console.log("***************************************************************")
       /*
        window.addEventListener('message',function(event){
            console.log('event recieved from iframe client')
            document.getElementById('expenseBill').style.display='none';
            console.log(this);
        },false);
       */
    }

}

export default ErpExpenseBill;
