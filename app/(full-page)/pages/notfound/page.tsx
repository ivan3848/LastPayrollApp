import type { Page } from "@/types";
import Link from "next/link";

const NotFound: Page = () => {
    return (
        <>
            <div className="relative overflow-hidden h-30rem bg-primary flex flex-column align-items-center justify-content-center border-round p-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="absolute w-full top-0 left-0"
                >
                    <path
                        fill="var(--primary-600)"
                        fillOpacity="1"
                        d="M0,64L48,90.7C96,117,192,171,288,208C384,245,480,267,576,256C672,245,768,203,864,165.3C960,128,1056,96,1152,74.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
                <div className="font-bold mb-5 text-4xl z-1">
                    Acceso Denegado
                </div>
                <p className="z-1 text-center text-xl text-gray-200 px-4">
                    Por favor contacte su administrador
                </p>
                <Link href={"/"}>
                    <button
                        type="button"
                        className="p-button p-button-danger font-medium p-button-raised"
                    >
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </>
    );
};

export default NotFound;
