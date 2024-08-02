import { useTimeTable } from "../hooks";

export const Text = () => {
  const { allTimeTable } = useTimeTable()
  return (
    <>
      <p className="text-4xl text-center sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        {allTimeTable.map((timetable) => (
        <div className="text-4xl text-center sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          {timetable.dayOrder}
          {timetable.session1}
          {timetable.session2}
          {timetable.session3}
          {timetable.session4}
        </div>
        ))}
      </p>
    </>
  );
};
