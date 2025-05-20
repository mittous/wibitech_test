'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'

export default function TasksPage() {

  const { user, token } = useAuth()
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get('https://recruter-backend.vercel.app/api/tasks', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         })

//         setTasks(res.data)
//         setLoading(false)
//       } catch (err) {
//         setError(err as string)
//         setLoading(false)
//       }
//     }

//     fetchTasks()
//   }, [token])
//   console.log(tasks);
  console.log(user);
  console.log(token);
  return (
    <div>
      
    </div>
  )
}
