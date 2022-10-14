import "reflect-metadata";
import express, { Application, NextFunction, Request, Response } from "express";
import { DataSource } from "typeorm";
import { AppDbContext } from "./src/Context/AppDbContext";
import { IController } from "./src/Interfaces/IController";
import { BookController } from "./src/Controllers/BookController";
import cors from "cors";


class ServerInstance {
    private static Instance: ServerInstance;
    private readonly Application: Application = express();
    private readonly Port: number = parseInt(process.env.PORT as string);

    private constructor() { }

    public static GetInstance(): ServerInstance {
        if (!ServerInstance.Instance) {
            ServerInstance.Instance = new ServerInstance();
        }
        return ServerInstance.Instance;
    }

    public StartServerInstance(context_service: DataSource): void {
        this.Application.use(cors());
        this.Application.listen(this.Port, () => {
            console.log(`Server up at localhost:${this.Port}`);
        });

        this.Application.use(express.json());
        this.Application.use(express.urlencoded({ extended: true }));
        this.StartControllersRoutes([
            new BookController(context_service),
        ]);
    }

    private StartControllersRoutes(controllers: Array<IController>): void {
        controllers.forEach(({ Router, Path }) => this.Application.use(`/api/${Path}`, Router));
        this.Application.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log("Error: ", err.message);
            res.status(500).json({ info: "Your request could not be processed" });
        });
    }
}

const Context = new AppDbContext();
ServerInstance.GetInstance().StartServerInstance(Context.GetContext());