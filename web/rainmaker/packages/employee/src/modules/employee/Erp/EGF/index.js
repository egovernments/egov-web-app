import React, { Component } from "react";

class EGFFinance extends Component{


    render(){ 
    
            let auth_token = localStorage.getItem('token'),
                menuUrl = this.props.location.pathname,
                loc = window.location,
                subdomainurl,
                hostname = loc.hostname;

            if(hostname.search('dev')!=-1){
                subdomainurl = hostname.substring(hostname.search('dev'),hostname.length);
            }else if(hostname.search('qa')!=-1){
                subdomainurl = hostname.substring(hostname.search('qa'),hostname.length);
            }else if(hostname.search('uat')!=-1){
                subdomainurl = hostname.substring(hostname.search('uat'),hostname.length);
            }else
                subdomainurl = hostname;

            let erp_url= loc.protocol+"//"+localStorage.getItem('tenant-id').split('.')[1]+"-"+subdomainurl+menuUrl;
            // let erp_url='http://jalandhar.test.egov.com:8080'+menuUrl;
            console.log("ERP URL : "+erp_url);

            return (
                    <div>
                    <iframe name="erp_iframe" height="800" width="1100"></iframe>
                     <form action={erp_url} id="erp_form" method="post" target="erp_iframe">
                      
                        <input readOnly hidden="true" name="auth_token" value={auth_token}  />
                    
                  </form>

                    </div>
                );
    }
    componentDidMount(){
        console.log('EGFFinance component mounted');
        // console.log('event registration completed');
        document.forms['erp_form'].submit();
       /*
        window.addEventListener('message',function(event){
            console.log('event recieved from iframe client')
            document.getElementById('expenseBill').style.display='none';
            console.log(this);
        },false);
       */
    }

}

export default EGFFinance;
