import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn("increment")
    public Id?: number;

    @Column({ type: "varchar", nullable: false })
    public Title: string;

    @Column({ type: "varchar", nullable: false })
    public Author: string;

    @Column({ type: "varchar", nullable: false })
    public Genre: string;

    @Column({ type: "varchar", nullable: false })
    public DatePublished: Date

    public constructor(title: string, author: string, genre: string, datepublished: Date) {
        this.Title = title;
        this.Author = author;
        this.Genre = genre;
        this.DatePublished = datepublished;
    }
}