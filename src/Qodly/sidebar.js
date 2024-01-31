import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Mixtral from "./mixtral";
import ChatBot from "./chatbots";
import Llama2 from "./models/llama2";
import GPTFT from "./models/gptft";
import Compare from "./compare";

const navigation = [
  { name: "ChatGPT 4", href: "#", icon: HomeIcon, current: true },
  { name: "ChatGPT 3.5 Fine Tuned", href: "#", icon: HomeIcon, current: false },
  { name: "Mixtral", href: "#", icon: UsersIcon, current: false },
  { name: "Mixtral Fine Tuned", href: "#", icon: UsersIcon, current: false },
  { name: "Llama 2 13b", href: "#", icon: FolderIcon, current: false },
  {
    name: "Llama 2 13b Fine Tuned",
    href: "#",
    icon: FolderIcon,
    current: false,
  },
];

// model, big logo, small logo
const models = [
  [
    "GPT4",
    "https://cdn.siasat.com/wp-content/uploads/2023/07/GPT-4.jpg",
    "https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png",
  ],
  [
    "GPTFT",
    "https://www.hst.ie/wp-content/uploads/2023/08/gpt-3_5.png",
    "https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png",
  ],
  [
    "Mixtral",
    "https://docs.mistral.ai/img/logo.svg",
    "https://mistral.ai/images/icons/mistral-glorious-bird-cropped.jpg",
  ],
  [
    "Mixtral-FT",
    "https://docs.mistral.ai/img/logo.svg",
    "https://mistral.ai/images/icons/mistral-glorious-bird-cropped.jpg",
  ],
  [
    "Llama2",
    "https://ollama.ai/public/ollama.png",
    "https://ollama.ai/public/ollama.png",
  ],
  [
    "Llama2-FT",
    "https://ollama.ai/public/ollama.png",
    "https://ollama.ai/public/ollama.png",
  ],
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("ChatGPT 4");

  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
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
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                      <div className="flex h-16 shrink-0 items-center">
                        <button type="button" onClick={() => navigate("/")}>
                          <img
                            className="h-8 w-auto"
                            src="https://res.cloudinary.com/dl2adjye7/image/upload/v1695632928/sami8694_Minimal_logo_tech_students_network_green_logo_white_ba_e6513ada-90f3-453c-aea9-fbd2672f25a9_a0nnlk.png  "
                            alt="Your Company"
                          />
                        </button>
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <div className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                          Chatbots
                        </div>
                        <ul
                          role="list"
                          className="flex flex-1 flex-col gap-y-7"
                        >
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <button
                                    onClick={() => {
                                      setActiveContent(item.name);
                                      setSidebarOpen(false); // Close the sidebar
                                    }}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-50 text-green-800"
                                        : "text-gray-700 hover:text-green-700 hover:bg-gray-50",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current
                                          ? "text-green-700"
                                          : "text-gray-400 group-hover:text-green-600",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
              <div className="flex h-16 shrink-0 items-center">
                <button type="button" onClick={() => navigate("/")}>
                  <img
                    className="h-8 w-auto"
                    src="https://res.cloudinary.com/dl2adjye7/image/upload/v1695632928/sami8694_Minimal_logo_tech_students_network_green_logo_white_ba_e6513ada-90f3-453c-aea9-fbd2672f25a9_a0nnlk.png"
                    alt="Your Company"
                  />
                </button>
              </div>
              <nav className="flex flex-1 flex-col">
                <div className="text-lg font-semibold leading-6 text-gray-900 mb-4 text-left">
                  Chatbots
                </div>
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => setActiveContent(item.name)}
                            className={classNames(
                              activeContent === item.name
                                ? "bg-gray-50 text-green-600"
                                : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                activeContent === item.name
                                  ? "text-green-600"
                                  : "text-gray-400 group-hover:text-green-600",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
              Chatbots
            </div>
          </div>

          <div className="flex ml-auto lg:ml-72 h-full justify-center items-center">
            {activeContent === "ChatGPT 4" && (
              <ChatBot
                model={models[0][0]}
                big_logo={models[0][1]}
                small_logo={models[0][2]}
              />
            )}
            {activeContent === "ChatGPT 3.5 Fine Tuned" && (
              <ChatBot
                model={models[1][0]}
                big_logo={models[1][1]}
                small_logo={models[1][2]}
              />
            )}
            {activeContent === "Mixtral" && (
              <ChatBot
                model={models[2][0]}
                big_logo={models[2][1]}
                small_logo={models[2][2]}
              />
            )}
            {activeContent === "Mixtral Fine Tuned" && (
              <ChatBot
                model={models[3][0]}
                big_logo={models[3][1]}
                small_logo={models[3][2]}
              />
            )}
            {activeContent === "Llama 2 13b" && (
              <ChatBot
                model={models[4][0]}
                big_logo={models[4][1]}
                small_logo={models[4][2]}
              />
            )}
            {activeContent === "Llama 2 13b Fine Tuned" && (
              <ChatBot
                model={models[5][0]}
                big_logo={models[5][1]}
                small_logo={models[5][2]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
