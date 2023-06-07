import ProductItem from '@/component/ProductItem';
import { getSingleProductData } from '@/redux/action/actionReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function SingleProduct({item}) {
const dispatch = useDispatch();
// const ProducListData = useSelector((state) => state?.productData?.single);
// console.log(ProducListData)
useEffect(()=>{
  dispatch( getSingleProductData(item))
},[])         
  return (
<div>
    <ProductItem item={item}/>
</div>
  )
}

export const getServerSideProps = async (context) => {
    const{id}=context.query
  console.log(id,context.query)

    try{
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const item = await res.json();
        return { props: { item} };
    }catch(error){
        console.log(error)
    }
    
  };
   
 
