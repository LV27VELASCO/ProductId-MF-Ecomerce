import React, { useEffect, useState } from 'react'

const useAddCartProduct = () => {
    const [productCard, setProductCard] = useState(0);

    const plusProduct=()=>{
        if(productCard>=0){
          setProductCard(productCard + 1)
        }
      }
    
      const minProduct=()=>{
        if(productCard>0){
          setProductCard(productCard - 1)
        }
      }
    
      

    useEffect(() => {
      
    }, [])
    


  return {productCard,plusProduct,minProduct,setProductCard}
}

export default useAddCartProduct