"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaInfo } from "react-icons/fa";
import { GiPlantSeed } from "react-icons/gi";
import { LiaUsersSolid } from "react-icons/lia";
import CameraCapture from "@/components/CameraCapture";

export default function IdentifyTemplatePage() {
    const [isOpen, setIsOpen] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [background, setBackground] = useState<string>("/sunflower.png");
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
            // Set uploaded image as background
            setBackground(preview);

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

            // Keep data as is for now
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
        <div
            className="flex flex-col justify-end bg-cover bg-center bg-no-repeat h-screen overflow-hidden transition-all duration-500"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="bg-white/55 backdrop-blur p-6 max-w-sm mx-auto mb-4 rounded-lg">
                {/*
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
                */}
                <form onSubmit={handleSubmit} className="space-y-4">
    <CameraCapture onCapture={(imageDataUrl) => setPreview(imageDataUrl)} />

    {preview && (
        <div className="mt-4">
            <img src={preview} alt="Preview" className="w-full rounded-lg border border-gray-300" />
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

            <div
                className={`inner-content relative flex flex-col bg-white rounded-t-2xl p-6 py-6 w-full shadow transition-all duration-500 ${
                    isOpen ? "h-1/2" : "h-24"
                }`}
            >
                {/* Toggle Arrow */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-3 right-3 text-neutral-700 hover:text-neutral-900 transition"
                >
                    {isOpen ? <FiChevronDown size={22} /> : <FiChevronUp size={22} />}
                </button>

                {/* Scrollable content */}
                <div
                    className={`overflow-y-auto transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <h3 className="text-xl font-bold mb-2 text-slate-800">
                        Sunflower{" "}
                        <span className="font-light text-sm text-neutral-600">
                            | Helianthus annuus
                        </span>
                    </h3>
                    <p className="text-sm mb-5 text-neutral-700">
                        Sunflowers are bright, towering blooms known for their large,
                        golden-yellow petals and round centers that follow the sun across
                        the sky—a phenomenon called heliotropism.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <div className="flex icon bg-green-100 h-10 w-10 justify-center items-center rounded mr-3">
                                <FaInfo size={22} color="green-300" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Information</div>
                                <div className="text-xs text-neutral-600">
                                    Find out more
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex icon bg-green-100 h-10 w-10 justify-center items-center rounded mr-3">
                                <GiPlantSeed size={24} color="green-300" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Growing Guide</div>
                                <div className="text-xs text-neutral-600">
                                    Find out more
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex icon bg-green-100 h-10 w-10 justify-center items-center rounded mr-3">
                                <LiaUsersSolid size={28} color="green-300" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Marketplace</div>
                                <div className="text-xs text-neutral-600">
                                    Find out more
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex icon bg-green-100 h-10 w-10 justify-center items-center rounded mr-3">
                                <FaInfo size={16} color="green-300" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Information</div>
                                <div className="text-xs text-neutral-600">
                                    Find out more
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
