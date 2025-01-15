const Unauthorized: React.FC = () => {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Acceso Denegado</h1>
        <p className="mt-4 text-gray-600">
          No tienes permiso para acceder a esta página.
        </p>
      </div>
    );
  };
  
  export default Unauthorized;
  