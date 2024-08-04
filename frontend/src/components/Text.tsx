import { useTimeTableNow } from "../hooks";

export const Text = () => {
  
  const { loading, periodsNow, dayOrder, isHoliday} = useTimeTableNow()

  if(loading) {
    return(
        <p className=" text-center text-xl md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">Loading....</p>
    )
  }

  if(isHoliday) {
    return <p className=" text-center text-xl md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">Today is Holiday</p>
  }
  const periodsNowArray = periodsNow.split(' ')
  const classNow = periodsNowArray[0].replace(/-/g," ");
  const classNoNow = periodsNowArray[1]
  return (
    <>
    <p>
      {  (
          <p className=" text-center text-xl md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">{classNow === "No Periods" ? "No class Currently" : classNow+" Class" }<br/>
          {classNoNow === "" ? "" : "Class No. "+classNoNow }<br/>
          Day Order {dayOrder}</p>
      )}
    </p>  
    </>
  );
};
