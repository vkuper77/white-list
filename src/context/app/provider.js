import { AppContext } from './context'
import useLoadProvider from "@/src/hooks/use-load-provider";
import useInit from "@/src/hooks/use-init";

export default function AppProvider({children}) {
  const {web3, provider, contract, coldBoot} = useLoadProvider()
  useInit(web3, provider, contract, coldBoot)
  return <AppContext.Provider value={{web3, provider, contract}}>{children}</AppContext.Provider>
}