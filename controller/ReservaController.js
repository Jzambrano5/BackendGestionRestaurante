import { ReservaModel } from "../models/ReservaModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../config/config.js";
import { PersonsModel } from "../models/PersonsModel.js";

export const createReserva = async (req, res) => {
  try {
    // Obtener los datos de la reserva desde el cuerpo de la solicitud
    const { fecha, numeroMesa, Cantidad, Hora, reserva_id } = req.body;

    // Validar que los campos requeridos no estén vacíos
    if (!fecha || !numeroMesa || !Cantidad || !Hora || !reserva_id) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Crear la reserva en la base de datos
    const reserva = await ReservaModel.create({
      fecha,
      numeroMesa,
      Cantidad,
      Hora,
      reserva_id, // Este es el ID de la persona que hace la reserva
    });

    // Responder con el resultado
    res.status(201).json({ message: "Reserva creada", reserva });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};

export const getReserva = async (req, res) => {
    try {
      // Obtener el ID de la reserva desde los parámetros de la solicitud
      const { id } = req.params;
  
      // Buscar la reserva en la base de datos
      const reserva = await ReservaModel.findOne({
        where: { id }, // Filtrar por el ID de la reserva
        include: [
          {
            model: PersonsModel, // Incluir los datos de la persona que hizo la reserva
            attributes: ['id', 'name', 'lastName'], // Especificar qué columnas incluir de PersonsModel
          },
        ],
      });
  
      // Verificar si se encontró la reserva
      if (!reserva) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
  
      // Responder con la reserva encontrada
      res.status(200).json({ reserva });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: error.message });
    }
  };

export const updateReserva = async (req, res) => {
    try {
      // Obtener el ID de la reserva desde los parámetros de la solicitud
      const { id } = req.params;
  
      // Obtener los datos para actualizar desde el cuerpo de la solicitud
      const { fecha, numeroMesa, Cantidad, Hora, reserva_id } = req.body;
  
      // Validar que al menos un campo esté presente
      if (!fecha && !numeroMesa && !Cantidad && !Hora && !reserva_id) {
        return res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar" });
      }
  
      // Buscar la reserva en la base de datos
      const reserva = await ReservaModel.findOne({ where: { id } });
  
      // Verificar si la reserva existe
      if (!reserva) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
  
      // Actualizar los datos de la reserva
      await reserva.update({
        fecha: fecha || reserva.fecha,
        numeroMesa: numeroMesa || reserva.numeroMesa,
        Cantidad: Cantidad || reserva.Cantidad,
        Hora: Hora || reserva.Hora,
        reserva_id: reserva_id || reserva.reserva_id,
      });
  
      // Responder con la reserva actualizada
      res.status(200).json({ message: "Reserva actualizada exitosamente", reserva });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: error.message });
    }
};

export const deleteReserva = async (req, res) => {
    try {
      // Obtener el ID de la reserva desde los parámetros de la solicitud
      const { id } = req.params;
  
      // Buscar la reserva en la base de datos
      const reserva = await ReservaModel.findOne({ where: { id } });
  
      // Verificar si la reserva existe
      if (!reserva) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
  
      // Eliminar la reserva
      await reserva.destroy();
  
      // Responder con un mensaje de éxito
      res.status(200).json({ message: "Reserva eliminada exitosamente" });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
