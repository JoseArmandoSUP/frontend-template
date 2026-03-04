import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ShoppingBag, Loader, AlertCircle } from 'lucide-react';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  {/* Agregar Producto */}
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [err, setErr] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  // api abstracta, solo cambia el endpoint
  const cargarProductos = async () => {
    try {
      const data = await api.get('/productoss'); 
      setProductos(data);
    } catch (err) {
      setError("No se pudo conectar con el servidor. ¿Está encendido?");
    } finally {
      setLoading(false);
    }
  };

  {/* Agregar producto */}
  const agregarProducto = async (e) => {
    e.preventDefault();
    setErr(null);
    setCargando(true);

    try {
      await api.post('/productoss', {nombre, precio: Number(precio), stock: Number(stock), descripcion, imagenUrl, categoria_id: Number(categoria_id)});

      setNombre('');
      setPrecio('');
      setStock('');
      setDescripcion('');
      setImagenUrl('');
      setCategoriaId('');

      cargarProductos();

    } catch (error) {
      setErr("Error al agregar producto");
    } finally {
      setCargando(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin text-blue-600" size={48} />
    </div>
  );

  if (error) return (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center gap-2">
      <AlertCircle /> {error}
    </div>
  );

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" /> Inventario
        </h1>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {productos.length} items
        </span>
      </header>

      {/* Agregar producto */}
      <form 
        onSubmit={agregarProducto}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
            Agregar Producto
        </h2>

          {error && (
              <p className="text-red-500 text-sm mb-4">
                  {error}
              </p>
          )}

        <input
            placeholder="nombre"
            className="w-full p-2 border rounded mb-4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
        />

        <input
            placeholder="precio"
            className="w-full p-2 border rounded mb-4"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
        />

        <input
            placeholder="stock"
            className="w-full p-2 border rounded mb-4"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
        />

        <input
            placeholder="descripcion"
            className="w-full p-2 border rounded mb-4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
        />

        <input
            placeholder="Imagen Url"
            className="w-full p-2 border rounded mb-4"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            required
        />

        <input
            placeholder="categoria ID"
            className="w-full p-2 border rounded mb-4"
            value={categoria_id}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
        />

        <button
            type='submit'
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={cargando}
        >
            {cargando ? "Agregando... " : "Agregado"}
        </button>
      </form>

      {/* Grid Responsivo: 1 col móvil, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden flex flex-col">
            
            {/* Imagen del producto */}
            <div className="h-48 p-4 bg-white flex items-center justify-center border-b border-slate-50">
              <img 
                src={prod.imagenUrl || "https://via.placeholder.com/150"} 
                alt={prod.nombre} 
                className="max-h-full object-contain"
              />
            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-800 line-clamp-1" title={prod.nombre}>
                  {prod.nombre}
                </h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">
                  ${prod.precio}
                </span>
              </div>
              
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                {prod.descripcion || "Sin descripción disponible."}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-xs font-medium text-slate-400">
                  Stock: <span className={prod.stock < 10 ? "text-red-500 font-bold" : "text-slate-600"}>{prod.stock}</span>
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;