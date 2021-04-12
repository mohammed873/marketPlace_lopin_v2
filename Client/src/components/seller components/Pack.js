import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import BuyPack from "./BuyPack";

export default function Pack() {
  const sellerToken = localStorage.getItem("token");
  const _idSeller = jwt(sellerToken)._id;

  const [showPaypalButton1, setShowPayPalButton1] = useState(false);
  const [showPaypalButton2, setShowPayPalButton2] = useState(false);
  const [turnOver, setTurnOver] = useState(0);
  const [id, setId] = useState(undefined);
  const [type, setType] = useState("");

  const pay1 = (e) => {
    e.preventDefault();
    setShowPayPalButton1(true);
    setShowPayPalButton2(false);
    setTurnOver(499);
    setType("Expert");
  };
  const pay2 = (e) => {
    e.preventDefault();
    setShowPayPalButton2(true);
    setShowPayPalButton1(false);
    setTurnOver(299);
    setType("Pro");
  };

  console.log(turnOver);
  console.log(type);
  useEffect(() => {
    setId(_idSeller);
  }, [_idSeller]);
  return (
    <div>
      <section className="ml-5">
        <div className="container max-w-full mx-auto py-24 px-6">
          <div className="max-w-full md:max-w-6xl mx-auto my-3 md:px-8">
            <div className="relative block flex flex-col md:flex-row items-center">
              <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
                <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                  <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                    <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                      STARTER
                    </h1>
                    <h2 className="text-sm text-gray-500 text-center pb-6">
                      FREE
                    </h2>
                    This is the starter pack that you get just by signing in as
                    a seller. Make you benefits of a standard Delivery and 10
                    products limit
                  </div>
                  <div className="flex flex-wrap mt-3 px-6">
                    <ul>
                      <li className="flex items-center">
                        <div className=" rounded-full p-2 fill-current text-green-700">
                          <svg
                            className="w-6 h-6 align-middle"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          Standard Delivery
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className=" rounded-full p-2 fill-current text-green-700">
                          <svg
                            className="w-6 h-6 align-middle"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          10 Products limit
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="block flex items-center p-8  uppercase">
                    <button
                      className="mt-3 text-lg font-semibold 
                bg-black w-full text-white rounded-lg 
                px-6 py-3 block shadow-xl hover:bg-gray-700"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-md sm:w-2/3 lg:w-1/3 sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg">
                <div className="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide">
                  Most Popular
                </div>
                <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                  <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                    Expert
                  </h1>
                  <h2 className="text-sm text-gray-500 text-center pb-6">
                    <span className="text-3xl">499$</span>
                  </h2>
                  The most popular Pack. You can buy it as a new seller or you
                  can get it buy making more than 2000$ from sales.
                </div>
                <div className="flex pl-12 justify-start sm:justify-start mt-3">
                  <ul>
                    <li className="flex items-center">
                      <div className="rounded-full p-2 fill-current text-green-700">
                        <svg
                          className="w-6 h-6 align-middle"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg ml-3">
                        Express Delivery
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className=" rounded-full p-2 fill-current text-green-700">
                        <svg
                          className="w-6 h-6 align-middle"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg ml-3">
                        Illimited products
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="block flex items-center p-8  uppercase">
                  <button
                    className="mt-3 text-lg font-semibold 
                bg-black w-full text-white rounded-lg 
                px-6 py-3 block shadow-xl hover:bg-gray-700"
                    onClick={pay1}
                  >
                    Select
                  </button>
                </div>
                {showPaypalButton1 && (
                  <BuyPack type={type} turnOver={turnOver} id={id} />
                )}
              </div>
              <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-ml-4">
                <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                  <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6">
                    <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                      Pro
                    </h1>
                    <h2 className="text-sm text-gray-500 text-center pb-6">
                      299$
                    </h2>
                    The Pro Pack. You can buy it as a new seller or you can get
                    it buy making more than 500$ from sales.
                  </div>
                  <div className="flex flex-wrap mt-3 px-6">
                    <ul>
                      <li className="flex items-center">
                        <div className=" rounded-full p-2 fill-current text-green-700">
                          <svg
                            className="w-6 h-6 align-middle"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          Standard Delivery
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className=" rounded-full p-2 fill-current text-green-700">
                          <svg
                            className="w-6 h-6 align-middle"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          50 Products limit
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="block flex items-center p-8  uppercase">
                    <button
                      className="mt-3 text-lg font-semibold 
                bg-black w-full text-white rounded-lg 
                px-6 py-3 block shadow-xl hover:bg-gray-700"
                      onClick={pay2}
                    >
                      Select
                    </button>
                  </div>
                  {showPaypalButton2 && (
                    <BuyPack type={type} turnOver={turnOver} id={id} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
