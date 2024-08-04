import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';


export interface timetable {
  "dayOrder": string,
  "periods": {
    "session1": string,
    "session2": string,
    "session5": string,
    "session3": string,
    "session4": string,
  }
}

interface Periods {
  "session1": string,
  "session2": string,
  "session3": string,
  "session4": string,
}

export interface periodsToday {
  "isHoliday": boolean,
  "date": string,
  "dayOrder": string,
  "periods": Periods
}

export const useTimeTable = () => {
  const [loading,setLoading] = useState(true);
  const [allTimeTable, setAllTimeTable] = useState<timetable[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/alltimetable`,)
        .then(response => {
            setAllTimeTable(response.data)
            setLoading(false)
        })
  },[])

  return{
    loading,
    allTimeTable,
  }
}

// export const usePeriodsToday = ()  => {
//   const [loading, setLoading] = useState(true);
//   const [periodsToday, setPeriodsToday] = useState<periodsToday>();
//   const dateOptions: Intl.DateTimeFormatOptions = {
//     timeZone: 'Asia/Kolkata',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   }
//   const date = new Date().toLocaleString('en-IN', dateOptions ).split('/').reverse().join('-');


//   useEffect(() => {
//     axios.post(`${BACKEND_URL}/api/v1/timetable`,{
//         date: date
//     },{
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         setPeriodsToday(response.data);
//         setLoading(false);
//       })
//   },[date])

//   return{
//     loading,
//     periodsToday,
//   }
// }


export const useTimeTableNow = () => {
  const [loading, setLoading] = useState(true);
  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [periodsNow, setPeriodsNow] = useState<string>("");
  const [dayOrder, setDayOrder] = useState<string>("");
  const [periodsToday, setPeriodsToday] = useState<periodsToday>();

  const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
      const date = new Date().toLocaleString('en-IN', dateOptions ).split('/').reverse().join('-');
    

  useEffect(() => {
    axios.post(`${BACKEND_URL}/api/v1/timetable`,{
        date: date
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setPeriodsToday(response.data);
      })
  },[date])

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit'
  }
  const time = new Date().toLocaleString('en-IN', timeOptions ).split(':').join('').slice(0,5);
  
  const newDate = Number(time)

  useEffect(() => {

  if(!periodsToday) {
    return;
  }

  if(periodsToday.isHoliday) {
    setLoading(false);
    setIsHoliday(true)
    return;
  }
  
    if (periodsToday && newDate >= 815 && newDate <= 924) {
      setPeriodsNow(periodsToday.periods.session1)
    } else if (newDate >= 925 && newDate <= 1034) {
      setPeriodsNow(periodsToday.periods.session2)
    } else if (newDate >= 1035 && newDate <= 1099) {
      setPeriodsNow("Break")
    } else if (newDate >= 1100 && newDate <= 1209) {
      setPeriodsNow(periodsToday.periods.session3)
    } else if (newDate >= 1210 && newDate <= 1320) {
      setPeriodsNow(periodsToday.periods.session4)
    } else {
      setPeriodsNow("No-Periods None")
    }

    setDayOrder(periodsToday.dayOrder)
    setLoading(false)

  },[{newDate,periodsToday}])

   return {
    loading,
    periodsNow,
    dayOrder,
    isHoliday
   }
}
