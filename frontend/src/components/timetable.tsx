import { useTimeTable, useTimeTableNow } from "../hooks";{}


export const Timetable = () => {
  const { allTimeTable, loading} = useTimeTable()
  const { dayOrder, periodsNow} = useTimeTableNow()

  if(loading) {
    return(
      <>
        <div>
        <p className=" text-center text-xl md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">Loading....</p>
      </div>
      </>
    )
  }

  return (
    <>

    <div className=" mb-20 mt-3 flex flex-col items-center justify-center w-full rounded-xl">
      <table className={`border-collapse text-xs md:text-base text-center scale-y-90 rotate-90 transform-gpu md:rotate-0 bg-slate-900 border-blue-900  text-white`}>
        <thead>
          <tr>
            <th className="border border-gray-600  font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b  from-pink-500 to-pink-300 px-3  ">Day Order</th>
            <th className="border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-purple-200  ">Session - 1<br/>8:15 to 9:25</th>
            <th className="border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b  from-purple-500 to-purple-200   ">Session - 2<br/>9:25 to 10:35</th>
            <th className="border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b   from-purple-500 to-purple-200  ">Break</th>
            <th className="border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b  from-purple-500 to-purple-200  ">Session - 3<br/>11:00 to 12:10</th>
            <th className="border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b  from-purple-500 to-purple-200    ">Session - 4<br/>12:10to 1:20</th>
          </tr>
        </thead>
        <tbody>
          {allTimeTable.map((timetable) => <tr>
            <td className="border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-pink-300 ">Day {timetable.dayOrder}</td>
            {Object.entries(timetable.periods).map(([sessionKey,sessionValue]) => {
              const transformedValue = sessionValue.replace(/-/g," ");
              return (<td className={`border border-gray-600 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b  ${timetable.dayOrder === dayOrder ? 
      (periodsNow === sessionValue ? "from-green-500 to-green-200" : "from-orange-500 to-orange-200") 
      : "from-neutral-200 to-neutral-500"} py-1 px-2 `}>{transformedValue}</td>)
            } )}
          </tr> )
           }
        </tbody>
      </table>
      </div>
    </>
  );
};
