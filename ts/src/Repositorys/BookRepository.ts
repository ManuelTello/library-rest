import { DataSource, Repository } from "typeorm";
import { Book } from "../Models/Book";

export class BookRepository {
    private readonly EntityRepo: Repository<Book>;

    public constructor(context: DataSource) {
        this.EntityRepo = context.getRepository(Book);
    }

    public async FetchBooks(id?: number): Promise<Array<Book> | Book | undefined | null> {
        try {
            if (id) {
                const book = await this.EntityRepo.findOne({ where: { Id: id } });
                return book;
            } else {
                const books = await this.EntityRepo.find();
                return books;
            }
        } catch (err) {
            throw (err);
        }
    }

    public async AddBook(book: Book): Promise<void> {
        try {
            await this.EntityRepo.save(book);
        } catch (err) {
            throw (err);
        }
    }

    public async DeleteBook(id: number): Promise<null | Book> {
        try {
            const book: Book | undefined | null = await this.FetchBooks(id) as Book;
            if (book) {
                this.EntityRepo.delete(id);
                return book;
            }
            return null;
        } catch (err) {
            throw (err);
        }
    }

    public async UpdateBook(id: number, book: Book): Promise<null | Book> {
        try {
            const book_search = await this.FetchBooks(id);
            if (book_search) {
                this.EntityRepo.update(id, book);
                return book;
            }
            return null
        } catch (err) {
            throw (err);
        }
    }
}