"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiBell, FiUser, FiHome } from "react-icons/fi";
import { BsCamera } from "react-icons/bs";

export default function BottomNav() {
	const pathname = usePathname();

	return (
		<footer className="fixed flex justify-center bottom-0 w-full">
			<div className="flex flex-row relative items-center justify-between rounded-t-3xl bg-slate-800 text-slate-700 px-4 py-2 w-full backdrop-blur-[2px] h-12">
				<div className="flex h-9 w-9 bg-white/10 rounded-full items-center justify-center text-slate-100">
					<Link
						href="/"
					>
						<FiHome size={18} />
					</Link>
				</div>
				<div className="flex h-9 w-9 bg-white/10 rounded-full items-center justify-center text-slate-100">
					<FiSearch size={18} />
				</div>
				<div className="flex h-14 w-14 bg-white border-2 border-slate-700 rounded-full items-center justify-center mt-[-20px] shadow-lg">
					<Link
						href="/identify"
					>
						<BsCamera size={22} />
					</Link>
				</div>
				<div className="flex h-9 w-9 bg-white/10 rounded-full items-center justify-center text-slate-100">
					<FiUser size={18} color="text-white" />
				</div>
				<div className="flex h-9 w-9 bg-white/10 rounded-full items-center justify-center text-slate-100">
					<FiSearch size={18} />
				</div>
			</div>
		</footer>
	);
}
