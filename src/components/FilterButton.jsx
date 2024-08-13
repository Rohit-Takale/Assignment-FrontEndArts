import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function FilterButton({title, onClick}) {
  return (
    <>
    <button onClick={onClick} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
    {/* Font Awesome Filter Icon */}
    <FontAwesomeIcon icon={faFilter} className="mr-2" />
    {title}
  </button>
  </>
  )
}
