import React from 'react';

export const SearchIcon = ({ onClick }) => (
  <svg
    className="search--icon"
    width="66"
    height="67"
    viewBox="0 0 66 67"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    onClick={onClick}>
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

export const FilterIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="66"
    height="67"
    className="filter--icon"
    viewBox="0 0 485.008 485.008"
    onClick={onClick}>
    <title>Filter</title>
    <path d="M171.501 464.698v-237.9l-166.3-192.6c-8.9-10.9-7.9-33.3 15.1-33.3h443.6c21.6 0 26.6 19.8 15.1 33.3l-162.3 187.5v147.2c0 6-2 11.1-7.1 15.1l-103.8 95.8c-12 8.9-34.3 4.1-34.3-15.1zm-106.8-423.4l142.2 164.3c3 4 5 8.1 5 13.1v200.6l64.5-58.5v-146.1c0-5 2-9.1 5-13.1l138.1-160.3h-354.8z" />
  </svg>
);

export const CrossIcon = ({ onClick }) => (
  <div class="cross--icon" onClick={onClick}>
    <span />
    <span />
  </div>
);
