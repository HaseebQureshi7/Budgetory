import { useEffect, useState } from "react";

export default function useLocalStorage (key, defaultValues) {
    const [value, setValue] =useState(()=> {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if(typeof defaultValues === "function") {
            return defaultValues()
        } else {
            return defaultValues
        }
    })

    useEffect (()=> {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}