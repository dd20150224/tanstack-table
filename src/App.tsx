// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import BasicTable from './components/basicTable';
import SortingTable from './components/dataTable/sortingTable';
import { tableConfig } from './config/table';
import { DataProvider, IGetDataPayload } from './hooks/useTableData';
import { IKeyValue } from './config/types';
import dataJSON from './data/data.json';
import { SortingState } from '@tanstack/react-table';

const doSorting = async (data: IKeyValue[], sorting: SortingState): Promise<IKeyValue[]> => {
  if (sorting.length > 0) {
    const sortItem = sorting[0]
    console.log('updated: ', JSON.stringify(sorting, null, 2))
    const sortedData = data.sort((data1, data2) => {
      const key = sortItem.id as keyof typeof data1
      let swap = 0
      if (key && data1[key] && data2[key]) {
        if (data1[key] > data2[key]) {
          swap = 1
        } else if (data1[key] < data2[key]) {
          swap = -1
        }
      }
      if (sortItem.desc) swap = -swap
      return swap
    })
    return sortedData;
  }
  return data;
}

function App() {
  // const [count, setCount] = useState(0)

  const getData = async (payload?: IGetDataPayload): Promise<IKeyValue[]> => {
    console.log('getData: payload: ', payload)
    let data: IKeyValue[] = [...dataJSON];

    // filtering

    // sorting
    if (payload?.sorting && payload?.sorting.length > 0) {
      data = await doSorting(data, payload.sorting);
    }

    // pagination

    
    return data
  }

  return (
    <div className="w-screen h-screen bg-green-200 flex flex-col">
      {/* <BasicTable/> */}
      <DataProvider getData={getData}>
        <SortingTable tableConfig={tableConfig}/>
      </DataProvider>
    </div>
  )
}

export default App
