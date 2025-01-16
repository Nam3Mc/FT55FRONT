// react
import React from "react";

// next
import Link from "next/link";

export const BackHome: React.FC = () => {
  return (
    <div className="mb-4">
      <Link href="/">
        <button className="text-velvet flex items-center">
          <i className="fi fi-rr-arrow-small-left"> Volver al inicio</i>
        </button>
      </Link>
    </div>
  );
};

export default BackHome;