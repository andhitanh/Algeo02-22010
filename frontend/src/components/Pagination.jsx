import { useState } from "react"

const Pagination = ({ currentPage, setCurrentPage }) =>
{
    /* initialize two state variables using the 'useState' hook : 'num' represents the current
        starting page number, and 'cur' represent the currently selected page.*/
   let [num, setNum] = useState(1)
   let [cur, setCur] = useState(1)

    /* an array 'pages' is created, which contains object with a 'page' property.
        These represent the page numbers to be displayed in the pagination component. */
   const pages = [
      { page: num },
      { page: num + 1 },
      { page: num + 2 },
      { page: num + 3 },
   ]

   /* 'Next' and 'Back' are defined to handle the next and previous buttons' click events.
        They update the 'num' state variable accordingly*/
   function Next ()
   {
      setNum(++num)
   }

   
   function back ()
   {
      num > 1 && setNum(--num)
   }

   /* 'return' contains the JSX code for rendering the pagination component. It includes buttons for previous, page numbers,
        and next. The 'onClick' handlers are set to call the 'back' and 'Next' functions, and the page buttons update the 'cur'
        state variable */
//    return (
//       <div className="flex bg-white rounded-lg font-[Poppins]">
//          <button onClick={back} className="h-12 border-2 border-r-0 border-indigo-600
//                px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white">
//             <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
//             </svg>
//          </button>
//          {
//             pages.map((pg, i) => (
//                <button key={i} onClick={() => setCur(pg.page)} className={`h-12 border-2 border-r-0 border-indigo-600
//                w-12 ${cur === pg.page && 'bg-indigo-600 text-white'}`}>{pg.page}</button>
//             ))
//          }
//          <button onClick={Next} className="h-12 border-2  border-indigo-600
//                px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white">
//             <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
//          </button>
//       </div>
//    )

    return (
        <div className="flex bg-[#fffffe] font-[Poppins] justify-center py-10">
        <button onClick={back} className="h-12 border-2 border-r-0 border-[#ff8ba7]
            px-4 rounded-l-lg hover:bg-[#ff8ba7] hover:text-white">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
        </button>
        {pages.map((pg, i) => (
            <button
            key={i}
            onClick={() => setCurrentPage(pg.page)}
            className={`h-12 border-2 border-r-0 border-[#ff8ba7]
            w-12 ${currentPage === pg.page && 'bg-[#ff8ba7] text-white'}`}
            >
            {pg.page}
            </button>
        ))}
        <button onClick={Next} className="h-12 border-2  border-[#ff8ba7]
            px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
        </button>
        </div>
    )
}

export default Pagination