import { Request, Response, Router } from "express";
import { DataSource } from "typeorm";
import { IController } from "../Interfaces/IController";
import { Book } from "../Models/Book";
import { BookRepository } from "../Repositorys/BookRepository";

export class BookController implements IController {
    public Router: Router = Router();
    public Path: string = "books";
    private readonly Repository: BookRepository;

    public constructor(context: DataSource) {
        this.Repository = new BookRepository(context);
        this.InitializeRoutes();
    }

    private InitializeRoutes(): void {
        this.Router.get("/:id?", this.FetchBooks.bind(this));
        this.Router.post("/add", this.AddBook.bind(this));
        this.Router.delete("/delete/:id", this.DeleteBook.bind(this));
        this.Router.put("/update/:id", this.UpdateBook.bind(this));
    }

    public async FetchBooks(req: Request, res: Response): Promise<void> {
        try {
            if (req.params.id) {
                const id = parseInt(req.params.id as string);
                const book = await this.Repository.FetchBooks(id);
                if (book) {
                    res.status(200).json(book);
                } else {
                    res.status(404).json({ info: "Book not found or does not exists" });
                }
            } else {
                const books = await this.Repository.FetchBooks();
                res.status(200).json(books);
            }
        } catch (err) {
            throw (err);
        }
    }

    public async AddBook(req: Request, res: Response): Promise<void> {
        try {
            const book: Book = req.body;
            await this.Repository.AddBook(book);
            res.status(200).json(book);
        } catch (err) {
            throw (err);
        }
    }

    public async DeleteBook(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);
            const result = await this.Repository.DeleteBook(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.send(404).json({ info: "Book not found or does not exist" });
            }
            res.status(200).json()
        } catch (err) {
            throw (err);
        }
    }

    public async UpdateBook(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);
            const result = await this.Repository.UpdateBook(id, req.body);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ info: "Book not found or does not exist" })
            }
        } catch (err) {
            throw (err);
        }
    }
}