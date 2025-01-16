import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col-reverse content-center items-center justify-center gap-5 bg-slate-300 lg:flex-row lg:p-5">
      {/* Contenedor de texto */}
      <div className="flex w-full flex-col items-center justify-center lg:w-[50%] lg:p-2">
        <p className="mb-4 text-center text-xl font-bold lg:mb-8 lg:text-3xl">
          Lo sentimos, no hemos podido encontrar la página que buscas.
        </p>
        <Link
          href="/"
          className="text-lg underline lg:text-xl hover:text-cyan-700"
        >
          Volver a la página principal
        </Link>
      </div>

      {/* Contenedor de imagen */}
      <div className="flex w-full items-center justify-center p-5 lg:w-[40%] lg:p-10">
        <img
          src="/png2.png"
          alt="notfound"
          className="h-auto w-full lg:h-[100%]"
        />
      </div>
    </div>
  );
}
