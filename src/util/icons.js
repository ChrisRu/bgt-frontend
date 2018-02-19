import React from 'react';

export const SearchIcon = () => (
  <svg
    className="search--icon"
    width="66"
    height="67"
    viewBox="0 0 66 67"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Search</title>
    <g transform="translate(236 57)">
      <mask id="b">
        <use
          xlinkHref="#a"
          fill="#fff"
          transform="rotate(45 -80.198 -226.682)"
        />
      </mask>
      <g mask="url(#b)">
        <use xlinkHref="#c" transform="rotate(45 -80.198 -226.682)" />
      </g>
    </g>
    <g transform="translate(236 57)">
      <mask id="e">
        <use xlinkHref="#d" fill="#fff" transform="translate(-236 -56.25)" />
      </mask>
      <g mask="url(#e)">
        <use xlinkHref="#f" transform="translate(-236 -56.25)" />
      </g>
    </g>
    <defs>
      <path
        id="a"
        d="M0 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"
      />
      <path
        id="c"
        d="M2 8h16V-8H2V8zm10-6v4h16V2H12zm6-2H2v16h16V0zM8 6V2H-8v4H8zM2-8C-3.523-8-8-3.523-8 2H8a6 6 0 0 1-6 6V-8zM18 8a6 6 0 0 1-6-6h16c0-5.523-4.477-10-10-10V8zm-6-2a6 6 0 0 1 6-6v16c5.523 0 10-4.477 10-10H12zM2 0a6 6 0 0 1 6 6H-8c0 5.523 4.477 10 10 10V0z"
      />
      <path
        id="d"
        d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30z"
      />
      <path
        id="f"
        d="M52 30c0 12.15-9.85 22-22 22v16c20.987 0 38-17.013 38-38H52zM30 52C17.85 52 8 42.15 8 30H-8c0 20.987 17.013 38 38 38V52zM8 30C8 17.85 17.85 8 30 8V-8C9.013-8-8 9.013-8 30H8zM30 8c12.15 0 22 9.85 22 22h16C68 9.013 50.987-8 30-8V8z"
      />
    </defs>
  </svg>
);

export const FilterIcon = () => (
  <svg
    className="filter--icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 247.46 247.46">
    <title>Filter</title>
    <path
      d="M246.744 13.984a7.5 7.5 0 0 0-6.784-4.301H7.5a7.501 7.501 0 0 0-5.787 12.271l89.361 108.384v99.94a7.5 7.5 0 0 0 10.83 6.72l50.208-24.885a7.499 7.499 0 0 0 4.169-6.71l.098-75.062 89.366-108.388a7.497 7.497 0 0 0 .999-7.969zM143.097 122.873a7.498 7.498 0 0 0-1.713 4.761l-.096 73.103-35.213 17.453v-90.546a7.496 7.496 0 0 0-1.713-4.771L23.404 24.682h200.651l-80.958 98.191z"/>
  </svg>
)