import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

interface timetable {
  "dayOrder": string,
  "session1": string,
  "session2": string,
  "session3": string,
  "session4": string,
}

export const useTimeTable = () => {
  const [loading,setLoading] = useState(true);
  const [allTimeTable, setAllTimeTable] = useState<timetable[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/alltimetable`,)
        .then(response => {
            setAllTimeTable(response.data.timetable)
            setLoading(false)
        })
  })

  return{
    loading,
    allTimeTable
  }
}