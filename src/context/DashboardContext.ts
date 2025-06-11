import { createContext, useContext } from "react";

interface activeBudgetContextType{
    activeBudget: string;
    setActiveBudget: (value: string) => void;
}

export const activeBudgetContext = createContext<activeBudgetContextType | undefined>(undefined)

// custom React Hook (in case of we did not provide the provider or something that can throw and error ehile using context)
export const useActiveBudgetContext = () => {
    const context = useContext(activeBudgetContext);
    if (!context || context === undefined) {
        throw new Error("useActiveBudgetContext must be used inside ActiveBudgetProvider");
    }
    return context;
};