"use client";

import { useState, useRef, useEffect } from "react";

interface CameraCaptureProps {
	onCapture: (imageDataUrl: string) => void; // same as preview from upload form
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [streaming, setStreaming] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Start camera on mount
	useEffect(() => {
		startCamera();
		return () => stopCamera();
	}, []);

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "environment" }, // back camera on mobile
			});
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
				setStreaming(true);
			}
		} catch (err) {
			console.error(err);
			setError("Unable to access the camera. Please allow camera permissions.");
		}
	};

	const stopCamera = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((track) => track.stop());
			setStreaming(false);
		}
	};

	const handleCapture = () => {
		if (!videoRef.current || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const video = videoRef.current;
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		const ctx = canvas.getContext("2d");
		if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		const imageDataUrl = canvas.toDataURL("image/jpeg");
		setCapturedImage(imageDataUrl);
		onCapture(imageDataUrl);
		stopCamera();
	};

	const handleRetake = () => {
		setCapturedImage(null);
		startCamera();
	};

	return (
		<div className="flex flex-col items-center space-y-4">
			{/* Error */}
			{error && (
				<p className="text-sm text-red-600 text-center max-w-xs">{error}</p>
			)}

			{/* Camera preview */}
			<div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-lg overflow-hidden">
				{!capturedImage ? (
					<video
						ref={videoRef}
						className="w-full h-full object-cover"
						autoPlay
						playsInline
						muted
					/>
				) : (
					<img
						src={capturedImage}
						alt="Captured plant"
						className="w-full h-full object-cover"
					/>
				)}
				<canvas ref={canvasRef} className="hidden" />
			</div>

			{/* Controls */}
			{!capturedImage ? (
				<button
					onClick={handleCapture}
					disabled={!streaming}
					className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
				>
					Capture
				</button>
			) : (
				<button
					onClick={handleRetake}
					className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
				>
					Retake
				</button>
			)}
		</div>
	);
}
