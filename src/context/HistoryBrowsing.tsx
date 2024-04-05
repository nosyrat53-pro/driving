// ** React Imports
import { useRouter } from 'next/router'
import { createContext, useState, ReactNode, useEffect } from 'react'




const HistoryBrowsingContext = createContext()

type Props = {
  children: ReactNode
}

const HistoryBrowsingProvider = ({ children }: Props) => {

  // ** States
  const [routes, setRoutes] = useState([]);

  const router = useRouter();

  useEffect(() => {

    // check if the route is exisist inside our history routes to add it
    if (!routes.find(route => route == router.asPath) && router.asPath != '/login/' && router.asPath != '/') {
      setRoutes([...routes, router.asPath]);
    }

  }, [router.asPath])



  return <HistoryBrowsingContext.Provider value={{ routes,setRoutes }}>{children}</HistoryBrowsingContext.Provider>
}

export { HistoryBrowsingContext, HistoryBrowsingProvider }
