import { useTimeTableNow } from "../hooks";

export const Text = () => {
  
  const { loading, periodsNow, dayOrder, isHoliday} = useTimeTableNow()

  if(loading) {
    return(
        <p className="  animate-pulse flex flex-col items-center justify-center text-center text-xl md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <div className="h-10 ms-2   bg-gray-600 rounded-full  w-80"></div>
        </p>
    )
  }

  if(isHoliday) {
    return <p className=" text-center text-2xl md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">Today is Holiday</p>
  }
  const periodsNowArray = periodsNow.split(' ')
  const classNow = periodsNowArray[0].replace(/-/g," ");
  const classNoNow = periodsNowArray[1]
  return (
    <>
    <p>
      {  (
          <p className=" text-center text-2xl leading-9 md:text-5xl md:leading-tight pb-20 md:pb-5 pt-0 font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">{classNow === "No Periods" ? "No Class Right Now" : classNow+" Class" }<br/>
          {classNoNow === "None" ? "" : (
            <>
              {"Class No. "+classNoNow}
            <br/>
            </>
          )}
          Day Order {dayOrder}</p>
      )}
    </p>  
    </>
  );
};
