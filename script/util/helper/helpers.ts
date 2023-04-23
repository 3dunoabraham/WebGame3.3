import { DEFAULT_UNIT } from "@/../script/constant/unit"


export const unit2Form = (unit:any)=> {
    const {retail_price,min_retail_price, agreement_price, min_agreement_price} = (
        unit.price || DEFAULT_UNIT.price
    )
    let {axles, color, gvwr, hitch_type, shipping_weight} = (
        unit.characteristics || DEFAULT_UNIT.characteristics
    )
    let {mso, title_number, title_state, title_status} = (
        unit.registration_title || DEFAULT_UNIT.registration_title
    )
    let {manufacturer, serial} = (
        unit.gps || DEFAULT_UNIT.gps
    )
    let {previous_investor, current_investor} = (
        unit.investors || DEFAULT_UNIT.investors
    )
    let {location, physical_as_of, location_related} = (
        unit.locations || DEFAULT_UNIT.locations
    )

    return ({
        price: { retail_price, min_retail_price, agreement_price, min_agreement_price},
        characteristics: {axles, color, gvwr, hitch_type, shipping_weight},
        registration_title: {mso, title_number, title_state, title_status},
        gps: {manufacturer, serial},
        investors: {previous_investor, current_investor},
        locations: {location, physical_as_of, location_related},
    })
}
export const isValidImgExt = (theType:any, theExt:any)=>{
    return (
        ["JPG","JPEG","PNG","GIF"].indexOf(theType.toUpperCase()) != -1 &&
        [".JPG",".JPEG",".PNG",".GIF"].indexOf(theExt.toUpperCase()) != -1
    )
}
export const filename2Type = (theString:any)=>{
    return theString.replace(/(.*)\//g, '')
}
export const filename2Extension = (theString:any)=>{
    return theString.match(/\.[0-9a-z]+$/i)[0]
}
export const isValidDocExt = (theExt:any)=>{
    return (
        [
            ".DOC",".DOCX",".DOCM",".TXT",".PDF",".PPT",".PPTX",".PPTM",
            ".XLS",".XLSM",".XLSX",".CSV",
            ".ODT",".ODF",".ODS",".ODG",
            ".MD",".PS",".OXPS",".XPS",
            ".TXT",".ZIP",".7Z",".TAR",".GZ",
        ].indexOf(theExt.toUpperCase()) != -1
    )
}
// export const incInLowerCase = (subString,theString)=>{
//     return (`${subString}`.toLowerCase() === theString.toLowerCase())
// }
export const isIncInLowerCase = (subString:any,theString:any)=>{
    return (`${subString}`.toLowerCase().includes(`${theString}`.toLowerCase()))
}
export const isEqInLowerCase = (subString:any,theString:any)=>{
    return (`${subString}`.toLowerCase() === `${theString}`.toLowerCase())
}
export const isStrInteger = (value:any)=>{
  return /^\d+$/.test(value);
}
export const firstUpperCase = (theString:any) =>{
    return theString.charAt(0).toUpperCase() + theString.slice(1)
}

export const jstr2FullName = (fullNameJson:string)=>{
	if (fullNameJson == "None") return fullNameJson
	const theObj = JSON.parse(fullNameJson.replace(/'/g, '"'))
	return fullNameJson == "None" ? fullNameJson : `${theObj.first_name} ${theObj.last_name}`
}
// inspired by clsx built by gugaguichard
export type JSS = (...a: Array<undefined | null | string | boolean>) => string
export const jss: JSS = (...args) =>
  args
    .flat()
    .filter(x => 
        x !== null && x !== undefined && typeof x !== 'boolean'
    ).join(' ')


export const jssWSwitch = (ref:any, sequence:any, widths:any) =>{
    let arrayOfArgs: string[] = []
    const length = sequence.length
    const widthsLength = widths.length
    for (var i = 0; i < length; ++i)
    {
        if (ref == sequence[i]) arrayOfArgs.push(` w-max-${widths[i]}px `)
    }
    return jss(...arrayOfArgs)
}

export const getOcurrences = (temp:any,match:any) =>{
    var regex = new RegExp( match, 'g' );
    return (temp.match(regex) || []).length
}



// export const parseStrSingleQt = (theObj) =>
// {
//     return JSON.stringify(theObj).replace(/"([^"]+)":/g, '$1:').replaceAll("\"", "'")
// }
// export const parseJsonSingleQt = (fullNameJson:string)=>{
//     return JSON.parse(fullNameJson.replace(/'/g, '"'))
// }
// export const parseJsonSingleQtFixNone = (fullNameJson:string)=>{
//     let theReplacedString = fullNameJson.replace(/'/g, '"').replace('None','"None"')
//     return JSON.parse(theReplacedString)
// }
import { MapOrEntries } from "usehooks-ts"


export const obj2MapArray = (theObj:any): MapOrEntries<string, any> =>{
    return Object.keys(theObj).map((theObjKey, index)=>{
        return [theObjKey, theObj[theObjKey]]
    })
}

export const parseReadableSize = (fileSize:any)=>{
    if(fileSize.length < 7) return `${Math.round(+fileSize/1024).toFixed(2)} KB`
    return `${(Math.round(+fileSize/1024)/1000).toFixed(2)} MB`
}
export const zeroPad = (value:any, length:any)=>{
    return `${value}`.padStart(length, '0');
}
const THE_DATE_NOW = new Date()
export const tenYearsAgoDateString = (
    `${THE_DATE_NOW.getUTCFullYear()-10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)
export const tenYearsFutureDateString = (
    `${THE_DATE_NOW.getUTCFullYear()+10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)

export const parseUTCString = (_theDate:any)=>{
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`+
        `T`+
        `${zeroPad(theDate.getUTCHours(),2)}:${zeroPad(theDate.getUTCMinutes(),2)}`
    )
}
export const parseUTCDateString = (_theDate:any)=>{
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`
    )
}

export const sortUIDAsc = (a:any, b:any)=>{
    let parseIntUIDItemA = parseInt(a.uid.replace("-",""))
    let parseIntUIDItemB = parseInt(b.uid.replace("-",""))
    return  parseIntUIDItemA - parseIntUIDItemB;
}
export const sortUIDDesc = (a:any, b:any)=>{
    let parseIntUIDItemA = parseInt(a.uid.replace("-",""))
    let parseIntUIDItemB = parseInt(b.uid.replace("-",""))
    return  parseIntUIDItemB - parseIntUIDItemA;
}
export const sortIDDesc = (a:any, b:any)=>{
    let parseIntUIDItemA = parseInt(a.id)
    let parseIntUIDItemB = parseInt(b.id)
    return  parseIntUIDItemB - parseIntUIDItemA;
}