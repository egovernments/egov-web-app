import React, { Component } from "react";
// import { faceOne } from 'egov-ui-kit/assets/images/faceOne.jpg';

class ErpExpenseBill extends Component{


    render(){ 
    
            let auth_token = 'ed0be069-1f05-461c-bff4-645c3a55f659';
            let menuUrl = "EGF/expensebill/newform";
            let loc = window.location;
            // let erp_url= 'http://longowal.coexit-dev.org/EGF/expensebill/newform';
            let erp_url= loc.protocol+"//"+localStorage.getItem('tenant-id').split('.')[1]+"."+loc.hostname+"/"+menuUrl;
            console.log("logged user token "+localStorage.getItem('token'));
            console.log("tenat-info :"+ localStorage.getItem('tenant-id'));
            console.log("ERP URL : "+erp_url);

            return (
                    <div>
                    <iframe name="erp_iframe" height="800" width="1100"></iframe>
                     <form action={erp_url} id="erp_form" method="post" target="erp_iframe">
                      
                    <input hidden="true" name="access_token" value={auth_token}></input>
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
