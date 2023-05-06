import React, { useState } from 'react'

const useProductAdd = () => {
    const [add, setAdd] = useState(false)
  return {setAdd,add}
}

export default useProductAdd