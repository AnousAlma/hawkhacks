import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {Navbar} from "./Navbar";
import {useEffect} from "react";


export const Dashboard = (props) =>  {
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/"){
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            {<Navbar></Navbar>}
        </>
    )
}
