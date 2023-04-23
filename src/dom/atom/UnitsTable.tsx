"use client";

import { useMemo, useContext, useEffect, useState } from "react";
import FlexTable from "../molecule/FlexTable"
import useTicker from "../../../script/util/hook/useTicker";
import { fetchUnitForeigns, parsedFetchedUnit } from "../../../script/util/helper/fetchHelper";
import { sortIDDesc } from "../../../script/util/helper/helpers";
import { AppContext } from "../../../script/state/context/AppContext";
import Dropdown from "../organism/ims/items/atoms/common/Dropdown";
import Link from "next/link";
import ScreenContainer from "../organism/ims/items/atoms/common/ScreenContainer";


function Component ({ initialArray, q_foreigns }:any) {
    const [q__f, s__q__f] = useState<any>()
    // const q__foreigns = await fetchUnitForeigns()
    // const queryArray:any = useTicker("EURUSDT", 10000);
    // const activeArray = useMemo(()=>{
    //     console.log("queryArray", queryArray)
    //     return []
    // },[queryArray]) 
    
    const app:any = useContext(AppContext);
    
    const triggerAlert = () => {
        // app.alert("wait","Loading unit, please wait")
    }

    useEffect(() => {
        async function getForeigns() {
            const q__foreigns = await fetchUnitForeigns()
            console.log("q__foreigns", q__foreigns)     
            s__q__f(q__foreigns)
        }
        getForeigns()
    }, []);

    const pq__units = useMemo(()=>{
        if (initialArray.length == 0) return []
        if ((!q__f || !q__f.orgsArray) || (!q__f || !q__f.customersArray)) {
            return initialArray.map((anUnit:any) => {
                return { ...anUnit,
                    urlToGo: "/unit/"+anUnit.uid,
                    location: "loading...",
                    dealer: "loading...",
                    manuf: "",
                    label_uid: "#"+anUnit.uid,
                }
            })
        }
        // console.log("q_foreigns", Object.keys(q_foreigns))
        // const q__foreigns = await fetchUnitForeigns()
        // console.log("q__foreigns", q__foreigns)

        // return initialArray
        let newUnitsArray= initialArray.map((aUnit:any, index:number)=> (
            parsedFetchedUnit(aUnit, q__f.orgsArray, q__f.customersArray) 
        ))
        let filteredUnitsArray = newUnitsArray.filter((theUnit:any, index:any) => {
            if (app.filters.sales_status && theUnit.sales_status != app.filters.sales_status.id)
            { return false }
            if (app.filters.dealer && theUnit.dealer != app.filters.dealer.label) { return false }
            return true
        })
        return filteredUnitsArray // .sort(sortIDDesc)
    },[initialArray, q_foreigns, app.filters, q__f])

    const theArray = useMemo(() => {
        // initialArray
        console.log("pq__units", pq__units)
        return pq__units.map((anUnit:any) => {
            return { ...anUnit,
                urlToGo: "/unit/"+anUnit.uid,
                // location: "asd",
                // dealer: "asdq",
                manuf: anUnit.manufacturer,
                label_uid: "#"+anUnit.uid,
            }
        })
    },[pq__units])
    const buttonActionText = "..."
    const buttonActionClass = "tx-lg pb-3 pt-1 px-2 tx-gray opaci-chov--25"
    const actionCard = (id:any) => {
        return (<>
            <Dropdown buttonTitle={buttonActionText} buttonClass={buttonActionClass}>
                <div className="flex-col flex-align-stretch gap-1 bg-white pa-2 bord-r-8">
                    <Link  href={`unit/${id}`} className="ims-button-primary clickble nowrap"
                        onClick={()=>{triggerAlert()}}
                    >
                        View Details
                    </Link>
                    {/* <button className="ims-button-primary clickble nowrap opaci-75 mt-2"
                        // onClick={()=>{s__isQuickAdd(!isQuickAdd)}}
                    >
                        New Quick Unit: {id}
                    </button>*/}
                    {/* <button className="ims-button-faded clickble nowrap   "
                        onClick={()=>{triggerAlert()}}
                    >
                        Config
                    </button>  */}
                </div>
            </Dropdown>
        </>)
    }

    return (<>
        

        
        <FlexTable theArray={theArray} bools={["isActionable"]} actionCard={actionCard} 
            actionHeader={<div className={buttonActionClass}>{buttonActionText}</div>}
            config={{idKey:"uid",mainKey:"label_uid",
                headerClass:"tx-sm tx-gray tx-bold-3",
                linkAlt:"urlToGo",idKeyTitle:"UID",
                mainAltText:"No Link",
                detailsArray: [
                // { key: "created_at",},
                // { key: "vin",},
                // { key: "updated_at",},
                // { key: "pushed_at",},
                ],
                childrenArray: [
                { key: "vin", title: "VIN"},
                { key: "inventory_status", title: "Status"},
                { key: "location", title: "Location"},
                { key: "dealer", title: "Dealer"},
                // { key: "name", class: "tx-mdl tx-bold-6"   },
                // { key: "0", class: "" }, // unix
                // { key: "7", class: "" }, // volume
                // { key: "8", class: "" }, // trades
                ],
            }}
        />


    </>)
}

export default Component

function useEfffect(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}
