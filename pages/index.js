import { useEffect } from "react";
import HomePage from "../components/homepage/homepage";

export default function Home() {

  useEffect(() => {
    const connectionCreate = async () => {
      let mongoConnectForFirstTime = await fetch(`http://localhost:3000/api/`)
      mongoConnectForFirstTime = await mongoConnectForFirstTime.json()
    }
    connectionCreate()
      
  }, [])

  return (
    <div>
      <HomePage />
    </div>
  )
}