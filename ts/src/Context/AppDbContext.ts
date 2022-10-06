import { DataSource } from "typeorm";
import { join } from "path";
import { Book } from "../Models/Book";

export class AppDbContext {
    private readonly Context = new DataSource({
        database: join(process.cwd(), "Database", "Database.sqlite3"),
        type: "better-sqlite3",
        entities: [Book]
    });

    public constructor() {
        try {
            this.Context.initialize();
            console.log("Connection to database established, timestamp: ", new Date());
        } catch (err) {
            console.log("Could not establish conneciton to database", err);
        }
    }

    public GetContext(): DataSource {
        return this.Context;
    }
}