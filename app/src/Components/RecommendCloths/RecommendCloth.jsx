import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";

import { filters, singleFilter, sortOptions } from "../Product/Product/FilterData.jsx";
import ProductCard from "../Product/ProductCard/ProductCard.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import { deepPurple } from "@mui/material/colors";
import { mens_kurta } from "../Data/Men/men_kurta.js";
// import { mensShoesPage1 } from '../../Data/shoes';
import { sareePage1 } from '../Data/Saree/page1';
import { dressPage1 } from '../Data/dress/page1';
import { gounsPage1 } from '../Data/Gouns/gouns.js';
import { kurtaPage1 } from '../Data/Kurta/kurta';
// import { Backdrop, CircularProgress } from "@mui/material";
import BackdropComponent from "../BackDrop/Backdrop.jsx";
import womensTop from "../Data/Women/women_top.json"
// import womenJeans from "../../Data/Women/women_jeans.json"
import womenDress from "../Data/Women/women_dress.json"
import mensShirt from "../Data/Men/men_shirt.json"
import mensJeans from "../Data/Men/men_jeans.json"
// import mensJeans from "../../Data/Men/men_jeans.json"
import {lehngacholiPage2} from "../Data/Saree/lenghaCholiPage2.js"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const RecommendCloth = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [data,setData] = useState([])
  const [recommandData,setRecommandData] = useState([])
 const {gender,age} = useParams();
 console.log(gender,age)
 
  const handleLoderClose = () => {
    setIsLoaderOpen(false);
  };



  const getData = () => {
    if(gender == "male"){
      let maleData = [...mens_kurta, ...mensShirt];
      let filterData = maleData.filter(item => {
        if ((item.gender == gender) && (item.ageFrom > age && item.ageTo > age)) {
          return item;
        }
      });
      for (let i = filterData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filterData[i], filterData[j]] = [filterData[j], filterData[i]];
    }
      setData(filterData)
      console.log("filterData : ", filterData);
    }
    else{
        let femaleData1 = [...kurtaPage1,...dressPage1, ...gounsPage1,...womenDress,...sareePage1,...womensTop];
        console.log(femaleData1)
      let filterData = femaleData1.filter(item => {
        if ((item.ageFrom < age && item.ageTo > age)) {
          return item;
        }
      });
      for (let i = filterData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filterData[i], filterData[j]] = [filterData[j], filterData[i]];
    }
      setData(filterData)
      console.log("Female Data : ", filterData)
    }
}

useEffect(() => {
    getData();
}, []);


    return (
        <div className="bg-white -z-20 ">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
    
                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
    
                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                            // open={false}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map((option, optionIdx) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          defaultChecked={option.checked}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          onChange={() =>
                                            handleFilter(option.value, section.id)
                                          }
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-gray-500"
                                          // onClick={()=>handleFilter(option.value,section.id)}
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
    
            <main className="mx-auto px-4 lg:px-14 ">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Product
                </h1>
    
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={() => handleSortChange(option.name)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
    
                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
    
              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
    
                <div>
                  {/* <h2 className="py-5 font-semibold opacity-60 text-lg">Filters</h2> */}
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    {/* Filters */}
                    {/* <form className="hidden lg:block border rounded-md p-5">
                      {filters.map((section) => (
                        <Disclosure
                          // defaultOpen={false}
                          as="div"
                          key={section.id}
                          className="border-b border-gray-200 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() =>
                                          handleFilter(option.value, section.id)
                                        }
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      {singleFilter.map((section) => (
                        <Disclosure
                          // defaultOpen={true}
                          as="div"
                          key={section.id}
                          className="border-b border-gray-200 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <FormControl>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                  >
                                    {section.options.map((option, optionIdx) => (
                                      <FormControlLabel
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                        onChange={(e) =>
                                          handleRadioFilterChange(e, section.id)
                                        }
                                      />
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form> */}
    
                    {/* Product grid */}
                    <div className="lg:col-span-6" style={{width:"100%"}}>
                      <div className="flex flex-wrap justify-center bg-white border py-5 rounded-md ">
                        {data?.length > 0 
                        ?
                        data?.map((item) => (
                          <ProductCard product={item} />
                        ))
                      :
                      <div>
                        <h1>No Data Found</h1>
                        <button style={{ backgroundColor: "#ff5733",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize:"16px",
  textTransform: 'uppercase',
  transition: "background-color 0.3s ease",}} onClick={() => navigate("/imagerecog")}>try Again</button>
                      </div>
                      }
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
    
            {/* pagination section */}
            {/* <section className="w-full px-[3.6rem]">
              <div className="mx-auto px-4 py-5 flex justify-center shadow-lg border rounded-md">
                <Pagination
                  count={mens_kurta.totalPages}
                  color="primary"
                  className=""
                  onChange={handlePaginationChange}
                />
              </div>
            </section>
     */}
            {/* {backdrop} */}
            <section>
             <BackdropComponent open={isLoaderOpen}/>
            </section>
          </div>
        </div>
      );
}

export default RecommendCloth