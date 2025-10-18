"use client";

import { useState } from "react";

export default function IdentifyPage() {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [results, setResults] = useState<Record<string, string> | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = e.target.files?.[0] || null;
		setFile(uploadedFile);

		if (uploadedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(uploadedFile);
		} else {
			setPreview(null);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!preview) return;

		setLoading(true);
		setResults(null);
		setError(null);

		try {
			const res = await fetch("/api/identify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ imageUrl: preview }),
			});

			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error || "Failed to analyze image");
			}

			const data = await res.json();

			// Store entire object dynamically
			setResults(data);
			console.log("AI response:", data);
		} catch (err: any) {
			console.error(err);
			setError(err.message || "Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
			<div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
				<h1 className="text-2xl font-semibold mb-4 text-gray-800">
					Plant Identifier
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					/>

					{preview && (
						<div className="mt-4">
							<img
								src={preview}
								alt="Preview"
								className="w-full rounded-lg border border-gray-300"
							/>
						</div>
					)}

					<button
						type="submit"
						disabled={!preview || loading}
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
					>
						{loading ? "Analyzing..." : "Identify Image"}
					</button>
				</form>

				{error && (
					<div className="mt-6 border-t pt-4 text-red-600">
						<strong>Error:</strong> {error}
					</div>
				)}
			</div>
			{results && (
					<div className="mt-6 border-t pt-4 space-y-6 mb-18">
						{Object.entries(results).map(([key, value]) => (
							<div key={key}>
								<h3 className="font-semibold text-gray-800">
									{key
										.replace(/([A-Z])/g, " $1") // split camelCase/PascalCase
										.replace(/^./, (s) => s.toUpperCase())} {/* Capitalize first letter */}
								</h3>
								<p className="text-gray-700 mt-1">
									{value && value !== "N/A" ? value : "No data available."}
								</p>
							</div>
						))}
					</div>
				)}
		</main>
	);
}
