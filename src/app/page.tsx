import UserGreeting from "@/components/user/UserGreeting";

import { FaCameraRetro } from "react-icons/fa";
import { PiPottedPlantDuotone } from "react-icons/pi";

export default function Home() {
	return (
		<div className="">
			<UserGreeting />
			<div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
				<div className="flex flex-col p-6 rounded-lg shadow-sm justify-center items-center">
					<div className="py-3">
						<FaCameraRetro size={48} />
					</div>
					<div className="text-slate-400">Identifier</div>
				</div>
				<div className="flex flex-col  p-6 rounded-lg shadow-sm justify-center items-center opacity-30">
					<div className="py-3">
						<PiPottedPlantDuotone size={48} />
					</div>
					<div className="text-slate-400">Marketplace</div>
				</div>
				<div className="flex flex-col  p-6 rounded-lg shadow-sm justify-center items-center opacity-30">
					<div className="py-3">
						<FaCameraRetro size={48} />
					</div>
					<div className="text-slate-400">Growing Guide</div>
				</div>
				<div className="flex flex-col  p-6 rounded-lg shadow-sm justify-center items-center opacity-30">
					<div className="py-3">
						<FaCameraRetro size={48} />
					</div>
					<div className="text-slate-400">TBD</div>
				</div>
			</div>
		</div>
	);
}
