"use client";

import { useEffect } from 'react';
import { useTranslations } from "@/i18n/client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("Global.globalError");

	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Global error:', error);
	}, [error]);

	const errorMessage = error?.message || t("criticalError");

	return (
		<html>
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center">
					<div className="rounded-lg bg-white p-8 shadow-lg">
						<h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
						<p className="mb-4 text-gray-600">{errorMessage}</p>
						{(error.digest || error.stack) && (
							<details>
								<summary>{t("moreDetails")}</summary>
								{error.digest && <p>{error.digest}</p>}
								{error.stack && <pre>{error.stack}</pre>}
							</details>
						)}
						<button
							onClick={reset}
							className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							{t("tryAgainButton")}
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
