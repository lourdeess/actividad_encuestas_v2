import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./Components/Inicio";
import CrearEncuesta from "./Components/Crearencuestas"; // Cambiado a PascalCase
import Encuesta from "./Components/Encuesta";
import Menu from './Components/Menu';
import NotFound from './Components/NotFound';
import encuestas from './data/encuestas.json';

function App() {
  const [listaEncuestas, setListaEncuestas] = useState(encuestas);

  const agregarEncuesta = (nuevaEncuesta) => {
    nuevaEncuesta.id = listaEncuestas.length + 1;
    setListaEncuestas([...listaEncuestas, nuevaEncuesta]);
  };

  const responderEncuesta = (id, respuestas) => {
    setListaEncuestas(prevEncuestas => {
      return prevEncuestas.map(encuesta => {
        if (encuesta.id === parseInt(id)) {
          encuesta.respuestas = [respuestas];
        }
        return encuesta;
      });
    });
  };

  return (
    <BrowserRouter>
      <Menu /> {/* Cambiado a componente en PascalCase */}
      <Routes>
        <Route path="/" element={<Inicio listaEncuestas={listaEncuestas} />} />
        <Route path="/encuesta/crear" element={<CrearEncuesta agregarEncuesta={agregarEncuesta} />} />
        <Route path="/encuesta/:id" element={<Encuesta listaEncuestas={listaEncuestas} responderEncuesta={responderEncuesta} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;