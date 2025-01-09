import "@/app/globals.css";
import { CartModalProvider } from "@/context/cart-modal";
import { ErrorBoundary } from "@/ui/error-boundary";
import { Footer } from "@/ui/footer/footer";
import { Nav } from "@/ui/nav/nav";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { CartModalPage } from "./cart/cart-modal";

export default function StoreLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CartModalProvider>
			<div className="relative flex min-h-screen flex-col">
				<Nav />
				<TooltipProvider>
					<main className="flex-1">
						<ErrorBoundary fallback={<div>Something went wrong</div>}>
							<main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
								{children}
								<CartModalPage />
							</main>
						</ErrorBoundary>
					</main>
					<Footer />
				</TooltipProvider>
			</div>
		</CartModalProvider>
	);
}
