

import React, { useEffect, useState } from "react";
// import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
// import NavbarSearch from "../../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../../components/OptionsTable/OptionsTable";
// import StaticTable from "../../../components/staticTable/StaticTable";
// import {ErrorAlert} from "../../../global/alert/Alert";
// import {apiRoute} from "../../../services/apiRoute";
// import {PostDataParams} from "../../../services/Service_call";

import {useDispatch, useSelector} from "react-redux";
import {ServiceData} from "../../../redux/ServiceDefine/ServiceDefineReducer";
import Table from "../../../components/Table/Table";
import {ServiceDefineColumns} from "./view/Column";

import SearchForm from "./view/SearchForm";
import StaticTable from "../../../components/staticTable/StaticTable";



const ServiceDefinition = () => {
    const dispatch=useDispatch()
    // @ts-ignore
    const {fetchpost,errorMessage,postLists}=useSelector(state=>state.serviceDefine)
    useEffect(() => {
        // @ts-ignore
        dispatch(ServiceData())
    }, []);
    if (fetchpost) return <p>Loading...</p>
    return (
        <div>
            <SearchForm  />
            <OptionsTable />
            {/*<StaticTable column={ServiceDefineColumns}  data={postLists?.content}/>*/}
        </div>
    );
};

export default ServiceDefinition;
