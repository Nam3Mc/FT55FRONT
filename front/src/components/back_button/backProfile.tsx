// react
import React from "react";

// next
import Link from "next/link";

export const BackProfile: React.FC = () => {
  return (
    <div className="mb-4">
      <Link href="/profile">
        <button className="text-velvet flex items-center">
          <i className="fi fi-rr-arrow-small-left"> Volver al perfil</i>
        </button>
      </Link>
    </div>
  );
};

export default BackProfile;