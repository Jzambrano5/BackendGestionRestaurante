// controllers/menuController.js
import { categoryModel } from "../models/categoryModel.js";
import { menuModel } from "../models/menuModel.js";

// Crear un nuevo item en el menú
export const createMenuItem = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen, categoriaId } = req.body;

        // Validaciones de campos requeridos
        if (!nombre || !precio || !categoriaId) {
            return res.status(400).json({ message: "Nombre, precio y categoría son requeridos" });
        }

        // Verificar si la categoría existe
        const categoriaExistente = await categoryModel.findOne({ where: { id: categoriaId } });
        if (!categoriaExistente) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        // Crear el item del menú
        const menuItem = await menuModel.create({
            nombre,
            descripcion,
            precio,
            imagen,
            categoriaId,
        });

        // Enviar respuesta de éxito
        res.status(201).json({ message: "Item creado con éxito", menuItem });
    } catch (error) {
        console.error("Error en createMenuItem:", error.message);
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

// Obtener todos los items del menú
export const getMenuItems = async (req, res) => {
    try {
        const menuItems = await menuModel.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', 'estado', 'categoriaId'],
            include: [{
                model: categoryModel,
                attributes: ['id', 'nombre'],
            }],
        });

        res.status(200).json({ menuItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener items del menú por categoría
export const getMenuItemsByCategory = async (req, res) => {
    try {
        const { categoriaId } = req.params;

        // Verificar si la categoría existe
        const categoriaExistente = await categoryModel.findOne({ where: { id: categoriaId } });
        if (!categoriaExistente) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const menuItems = await menuModel.findAll({
            where: { categoriaId },
            attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', 'estado', 'categoriaId'],
            include: [{
                model: categoryModel,
                attributes: ['id', 'nombre'],
            }],
        });

        if (menuItems.length > 0) {
            res.status(200).json({ menuItems });
        } else {
            res.status(404).json({ message: "No se encontraron items para esta categoría" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un item del menú
export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, imagen, categoriaId } = req.body;

        // Validaciones de campos requeridos
        if (!nombre || !precio || !categoriaId) {
            return res.status(400).json({ message: "Nombre, precio y categoría son requeridos" });
        }

        // Verificar si la categoría existe
        const categoriaExistente = await categoryModel.findOne({ where: { id: categoriaId } });
        if (!categoriaExistente) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const menuItem = await menuModel.findOne({ where: { id } });

        if (menuItem) {
            menuItem.set({ nombre, descripcion, precio, imagen, categoriaId });
            await menuItem.save();
            res.status(200).json({ message: "Item actualizado con éxito", menuItem });
        } else {
            res.status(404).json({ message: "Item no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un item del menú
export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await menuModel.findOne({ where: { id } });

        if (menuItem) {
            await menuItem.destroy();
            res.status(200).json({ message: "Item eliminado con éxito" });
        } else {
            res.status(404).json({ message: "Item no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};