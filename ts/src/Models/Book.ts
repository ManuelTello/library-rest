import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

Entity("books")
export class Book {
    @PrimaryGeneratedColumn("increment")
    public Id?: number;

    @Column("varchar")
    public Title: string;

    @Column("varchar")
    public Author: string;

    @Column("date")
    public DatePublished: Date

    public constructor(title: string, author: string, datepublished: Date) {
        this.Title = title;
        this.Author = author;
        this.DatePublished = datepublished;
    }
}