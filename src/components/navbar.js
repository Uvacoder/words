import { Link } from "wouter";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent mx-auto justify-content-center">
      <Link
        className="nav-item nav-link text-center m-2"
        href="/home"
        id="home-link"
        style={{ fontSize: "16px", color:"darkblue" }}
      >
        Home
      </Link>
      <Link
        className="nav-item nav-link text-center m-2"
        href="/wordlist"
        id="wordlist-link"
        style={{ fontSize: "16px", color:"darkblue"  }}
      >
        Word List
      </Link>
    </nav>
  );
}
