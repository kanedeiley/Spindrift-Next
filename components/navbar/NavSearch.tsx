"use client"
import { useRouter } from "next/navigation";
import { Input} from "../ui/input";
import { useState } from "react";


function NavSearch({ className }) {
  const [searchQ, setSearchQ] = useState("")
const router = useRouter()
const onSearch = (event: React.FormEvent) => {
event.preventDefault();
const encodedSearchQ = encodeURI(searchQ || "");
if(searchQ != "" ) {
  router.push("/search?q=" + encodedSearchQ) 
}

}


  return (
    <form onSubmit={onSearch} className="flex justify-center min-w-1/4" >
    <Input type='text' placeholder='find a wave.' className="w-full dark:bg-muted" onChange={e => setSearchQ(e.target.value)}></Input>
    </form>
  )
}

export default NavSearch