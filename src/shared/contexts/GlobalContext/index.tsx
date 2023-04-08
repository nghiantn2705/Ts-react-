import { createContext, ReactNode, useState } from 'react';

export interface IContextStore {
    [key: string]: any;//eslint-disable-line
}

export interface IContextEntity {
    [key: string]: any; //eslint-disable-line
}

type GlobalContextType = {
    store: IContextStore;
    updateStore: <T>(key: string, value: T) => void;
};

const initialValues: GlobalContextType = {
    store: {} as IContextStore,
    updateStore: (key, value) => {
    }, //eslint-disable-line
};

const GlobalContext = createContext<GlobalContextType>(initialValues);

type IProps = {
    children: ReactNode;
    store?: IContextStore;
};

export function GlobalContextProvider(props: IProps): JSX.Element | null {
    const { children, store: initialStore } = props;

    const [store, setStore] = useState({
        ...initialStore,
    });

    const value: GlobalContextType = {
        store,
        updateStore: (key, value) => {
            setStore((prevState) => {
                return {
                    ...prevState,
                    [key]: value,
                };
            });
        },
    };

    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
}

export default GlobalContext;
