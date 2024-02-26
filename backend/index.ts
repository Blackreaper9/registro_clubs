import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

type TRegistros = {
    id:number;
    start_time:string;
    end_time:string;
    name:string;
    nameclub:string;
}

let Registros:TRegistros[] = [
    {
        id:1,
        start_time: "4:00",
        end_time:"6:00",
        name:"alumno",
        nameclub:"actividad",
    }

]
export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use((req, res, next) => {
    //     if (ic.caller().isAnonymous()) {
    //         res.status(401);
    //         res.send();
    //     } else {
    //         next();
    //     }
    // });

    app.post('/create',(req,res)=>{
        const Registro = Registros.find((Registros)=>Registros.id ===parseInt(req.body.id));
        if(Registros){
            res.status(800).json({msg:"Procesando... ", data:Registros});
            return;

        }
        Registros=[... Registros, req.body];
        res.status(400).json({msg:"Completado"});
    });

    app.get('/get',(req,res)=>{
        res.status(400).json({msg:"Registro exitoso...",data:Registros});
    });

    app.put('/update/:id', (req,res)=>{
        const Registro = Registros.find((Registros)=>Registros.id ===parseInt(req.params.id));
        if(!Registros){
            res.status(808).json({msg:"Error...",});
            return;
        }
        const URegistro = {...Registro, ...req.body};

        Registros = Registros.map((r) => r.id === URegistro.id ? URegistro : r);

        res.status(400).json({msg:"Registro actualizado..."});
    });

    app.delete('/delete/:id',(req, res )=>{
        Registros = Registros.filter((r) => r.id !== parseInt(req.params.id));

        res.status(400).json({msg:"Registro eliminado...",data:Registros});

    })

    app.post('/test', (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
