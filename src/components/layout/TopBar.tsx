"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Topbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="absolute top-0 left-0 right-0 z-50 bg-transparent px-6 py-4 flex items-center justify-between">
			{/* Placeholder Avatar */}
			<div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 text-neutral-600 font-semibold shadow">
				U
			</div>

			{/* Burger Icon */}
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className="text-neutral-100 hover:text-white focus:outline-none"
			>
				{menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
			</button>

			{/* Dropdown Menu */}
			{menuOpen && (
				<div className="absolute top-full right-6 mt-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col space-y-3 text-neutral-900">
					<a href="#" className="hover:text-neutral-700 transition">Home</a>
					<a href="#" className="hover:text-neutral-700 transition">About</a>
					<a href="#" className="hover:text-neutral-700 transition">Contact</a>
				</div>
			)}
		</header>
	);
}
