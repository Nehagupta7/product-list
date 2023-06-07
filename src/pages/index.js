import Product from '@/component/Product'
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../redux/action/actionReducer";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

export default function ProductList({ allProduct }) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(allProduct?.products);
  const dispatch = useDispatch();
  const ProducListData = useSelector((state) => state.productData);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

// search button
  const SearchButton = async () => {
    if (search !== " ") {
      await axios.get(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => {
          setProducts(res?.data?.products);
          setHasMore(false);
          setTotalPages(0)
          dispatch(getProductData(res?.data?.products));
        });
    }


  }



// fetching all the data 
  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=6&skip=${products.length}`);
      const jsonData = await response?.data
      setProducts((prevData) => [...prevData, ...jsonData?.products]);
      setTotalPages(jsonData?.skip / 6);
      setHasMore(pageNumber < jsonData?.total);
      dispatch(getProductData([...products, ...jsonData?.products]));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // handle the infite sroller
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    await fetchData(nextPage);
    setCurrentPage(nextPage);
  };

  const handleGoToPage = async (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
const handeChange =(e)=>{
  setSearch(e.target.value)
}
  // dispatch the data into the redix
  useEffect(() => {
    dispatch(getProductData(products));
  }, []);

  return (
    <>
      <div className="mb-3 md:w-1/3 mx-auto my-8">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch" id="top">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            value={search}
            onChange={(e) => handeChange(e)}
            aria-label="Search"
            aria-describedby="button-addon1" />

          <button
            className="relative z-[2] flex items-center border border-grey rounded-r bg-grey px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="button"
            id="button-addon1"
            onClick={() => SearchButton()}
            data-te-ripple-init
            data-te-ripple-color="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="relative z-[2] flex items-center border border-grey rounded-r bg-grey px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            onClick={() => {
              setProducts(allProduct?.products)
              setSearch("")
              handleLoadMore()
            }}>Reset</button>
        </div>

      </div>

      <div style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translate(-50%,50%)"
      }}>

        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <React.Fragment key={pageNumber}>
                  {pageNumber == 1 && <Link href={`#top`} className="px-3 py-2 -mt-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">
                    1
                  </Link>}
                  <Link href={`#${pageNumber + 1}`} className="px-3 py-2 -mt-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">

                    <li
                      key={pageNumber}
                      onClick={() => handleGoToPage(pageNumber)}
                      disabled={pageNumber === currentPage}

                    >
                      {pageNumber + 1}
                    </li>

                  </Link>
                  </React.Fragment >
              )
            )}

          </ul>
        </nav>


      </div>

      {products.length === 0
       ?
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center h-[100vh]">
          Sorry Not Matching Result Found
        </div> 
        :
         <InfiniteScroll
          className="flex flex-wrap -m-4"
          dataLength={products.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >

          {
            products?.map((item,index) => {

              return (
                <React.Fragment key={index}>
                  <Product products={item} />
                </React.Fragment>
              )
            })
          }
        </InfiniteScroll>}
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products?limit=6");
    const allProduct = await res.data;
    return { props: { allProduct } };
  } catch (error) {
    console.log(error)
  }
};


