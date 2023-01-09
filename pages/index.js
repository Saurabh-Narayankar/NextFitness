import { useEffect } from "react";
import HomePage from "../components/homepage/homepage";
import { initFirebase } from "../lib/initFirebase";

export default function Home() {

  return (
    <div>
      <HomePage />
    </div>
  )
}