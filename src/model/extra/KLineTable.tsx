"use client";

import FlexTable from "@/dom/cell/form/FlexTable";



function Component ({ initialArray }:any) {
    // const queryArray:any = useTicker("EURUSDT", 10000);
    // const activeArray = useMemo(()=>{
    //     console.log("queryArray", queryArray)
    //     return []
    // },[queryArray]) 

    return (
        <FlexTable theArray={initialArray} bools={[]}
            config={{idKey:"0",mainKey:"4",linkKey:"0",linkAlt:"0",
                mainAltText:"No Link",
                detailsArray: [
                // { key: "created_at",},
                // { key: "updated_at",},
                // { key: "pushed_at",},
                ],
                childrenArray: [
                // { key: "name", class: "tx-mdl tx-bold-6"   },
                { key: "0", class: "" }, // unix
                { key: "7", class: "" }, // volume
                { key: "8", class: "" }, // trades
                ],
            }}
        />
    )
}

export default Component