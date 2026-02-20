import { useContext, useState, createContext } from "react";
import uuid from "react-native-uuid";

export const LawnContext = createContext();

const fetchApiData = async () => {
    try {
        const response = await fetch("https://empllo.com/api/v1")
        const data = await response.json();

        const dataWithUuid = data.map(item => ({
            ...item,
            id: uuid.v4();
        }))
    }
}