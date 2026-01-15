'use client'
import { getGreetings } from "./lib/serverfunctions"
import { useEffect, useState } from "react"

type Greeting = {
  _id: string;
  greeting: string;
}

export default function Both() {
  const [greetings, setGreetings] = useState([] as Greeting[])
  
  useEffect(() => {
    async function fetchGreetings() {
      const data = await getGreetings() as unknown as Greeting[]
      setGreetings(data)
    }
    fetchGreetings()
  }, [])

  console.log("hello both")
  return (
    <>
    <h1>
      List of greetings:
    </h1>
    {greetings.map(greetingObj=> <h1 key={greetingObj._id.toString()}>{greetingObj.greeting}</h1>)}
  </>
)
}
