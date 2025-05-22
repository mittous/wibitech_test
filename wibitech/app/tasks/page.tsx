'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'


function TasksPage() {
  const { user } = useAuth();





  
  console.table(user);
  return (
    <div className="">
        <h1>Tasks</h1>
        <h1>{user?.username}</h1>
        <h1>{user?.role}</h1>
    </div>
  )
}

export default TasksPage
