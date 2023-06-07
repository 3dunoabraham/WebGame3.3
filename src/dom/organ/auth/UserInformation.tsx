export default function Page({ data }:any) {
    return (
    <div className="flex gap-2 ">
        {/* eslint-disable @next/next/no-img-element */}
        <div><img className="bord-r-100" width="40" src={data.image} alt="" /></div>
        <div className="flex-col flex-align-start Q_lg_x">
            <div className="">{data.name}</div>
        </div>
    </div>
    )
}
