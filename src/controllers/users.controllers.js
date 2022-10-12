const ctrlUser = {}
const UserSchema = require("../models/USERS")
const bcrypt = require("bcrypt");
const generarJWT = require("../helpers/generarJWT");



ctrlUser.postUser = async (req, res)=>{
    
    try {
        const {username,password,email} = req.body;

        const newPassword = bcrypt.hashSync(password,10)

        const newUser = new UserSchema({
            username, password:newPassword,email
        })

        const saveUser = await newUser.save()

        if (!saveUser){
            res.status(400).json({
                msg:"Error al crear el usuario"
            })
        }

        res.json({
            msg:"Usuario creado"
        })



    } catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error. Inténtelo más tarde :("
        })
    }
}

ctrlUser.getUser = async (req,res)=>{
    try {
        //desestructurar
        const {username,password} = req.body

        //buscar el user en la base de datos
        const user = await UserSchema.findOne({username})

        //validar si existe
        if(!user){
            res.status(404).json({
                msg:"Usuario no encontrado"
            })
        }

        //validar si esta activo
        if(!user.isActive){
            res.status(400).json({
                msg:"Usuario inactivo"
            })
        }

        //decifrar contraseña
        const validPassword = bcrypt.compareSync(password,user.password)

        //validar contraseña
        if(!validPassword){
            res.status(400).json({
                msg:"Contraseña incorrecta"
            })
        }

        const token = await generarJWT({uid: user._id})

        res.status(200).json({
            msg:"Sesión iniciada :)",
            token
        })


    } catch (error) {
        res.status(400).json({
            msg:"Ha ocurrido un error. Inténtelo nuevamente :("
        })
    }
} 




module.exports = ctrlUser; 