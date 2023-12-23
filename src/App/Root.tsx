import { Outlet } from "react-router-dom";

export function Root () {
  
  return (
    <div>
      <p>Root</p>
      <Outlet/>
    </div>
  )
}