import Button from "@/components/ui/Button";
import { db } from "@/lib/db";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface PageProps {}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button className="bg-blue-400" size="lg">
        Hi
      </Button>
    </main>
  );
}

// return (
//   <div className="h-screen bg-white">
//     <div
//       className="relative z-10 h-screen"
//       aria-labelledby="modal-title"
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="fixed inset-0 bg-black/50"></div>
//       <div
//         className="absolute inset-x-0 bottom-10 flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-2/5 mx-auto mt-auto"
//         role="alert"
//       >
//         <div>
//           <strong className=" font-bold">Holy smokes!</strong>
//           <span className="block sm:inline">
//             Something seriously bad happened.
//           </span>
//         </div>
//         <span className="px-4 py-3">
//           <svg
//             className="fill-current h-6 w-6 text-red-500"
//             role="button"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//           >
//             <title>Close</title>
//             <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
//           </svg>
//         </span>
//       </div>
//       <div className="relative inset-x-0 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//         <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//           <div className="sm:flex sm:items-start">
//             <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//               <svg
//                 className="h-6 w-6 text-red-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//                 />
//               </svg>
//             </div>
//             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//               <h3
//                 className="text-base font-semibold leading-6 text-gray-900"
//                 id="modal-title"
//               >
//                 Deactivate account
//               </h3>
//               <div className="mt-2">
//                 <p className="text-sm text-gray-500">
//                   Are you sure you want to deactivate your account? All of
//                   your data will be permanently removed. This action cannot be
//                   undone.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//           <button
//             type="button"
//             className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//           >
//             Deactivate
//           </button>
//           <button
//             type="button"
//             className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
