"use client";

import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
} from "react";

// type user = {
//     name: string;
// };

interface ContextProps {
    user: any;
    setUser: Dispatch<SetStateAction<string>>;
    kriteria: any;
    setKriteria: Dispatch<SetStateAction<any>>;
    supplier: any;
    setSupplier: Dispatch<SetStateAction<any>>;
}

const globalContext = createContext<ContextProps>({
    user: {},
    setUser: (): string => "",
    kriteria: [],
    setKriteria: (): any => [],
    supplier: [],
    setSupplier: (): any => [],
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState({});
    const [kriteria, setKriteria] = useState([]);
    const [supplier, setSupplier] = useState([]);

    return (
        <globalContext.Provider
            value={{
                user,
                setUser,
                kriteria,
                setKriteria,
                supplier,
                setSupplier,
            }}
        >
            {children}
        </globalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(globalContext);
