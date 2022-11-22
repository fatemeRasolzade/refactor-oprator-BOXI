import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../../../components/OptionsTable/OptionsTable";
import StaticTable from "../../../../components/staticTable/StaticTable";
import {ErrorAlert} from "../../../../global/alert/Alert";
import {apiRoute} from "../../../../services/apiRoute";
import {PostDataParams} from "../../../../services/Service_call";
import SearchForm from "./views/SearchForm";


const Vendor = () => {
    const [dataTable, seDatatable] = useState([]);

    useEffect(() => {
        const params = `/filter?pageNumber=1&pageSize=20`;
        PostDataParams(apiRoute().post.vendor, params, {}).then((res) => {
            if (res.status === "OK") {
                seDatatable(res.payload.content);
            } else {
                ErrorAlert("خطای ارتباط با سرور");
            }
        });
    }, []);



    // const data=dataTable.map(hubItem=>{
    //     return{
    //         code:hubItem.code ? hubItem.code : "",
    //         name:hubItem.name ? hubItem.name : "",
    //         hubType:hubItem.selectHubType !== null ? hubItem.selectHubType.text : "",
    //
    //     }
    // })
    return (
        <div>
             <SearchForm  secondTextInput={'کد شرکت'}/>
            {/*<NavbarSearch  firstTextInput="کد شرکت"/>*/}
            <OptionsTable />
            {/*<StaticTable data={data} column={HubColumn}/>*/}
        </div>
    );
};

export default Vendor;
