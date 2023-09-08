#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from config import db
from models import User, Book, Review, assoc_table
from werkzeug.security import generate_password_hash
import random

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Book.query.delete()
        Review.query.delete()
        
        users = []

        for _ in range(20):
            password = fake.password()
            hashed_password = generate_password_hash(password)
            user = User(
                email = fake.email(),
                username = fake.user_name(),
                _password_hash=hashed_password
            )
            db.session.add(user)
            users.append(user)

        books = []

        book_genres = [
            "Fiction",
            "Non-Fiction",
            "Mystery",
            "Fantasy",
            "Drama",
            "Adventure",
            "Cooking",
            "Crime",
            "Classic",
            "Self-Help",
            "Travel",
            "Thriller",
            "Poetry",
            "Horror",
            "Science Fiction",
            "Biography",
            "Romance",
            "Young Adult (YA)"
        ]

        read_status = [
            "Read",
            "Want to read"
        ]

        for _ in range(60):
            book = Book(
                title = fake.catch_phrase(),
                author = fake.name(),
                genre = random.choice(book_genres),
                description = fake.paragraph(nb_sentences=10),
                status = random.choice(read_status),
                user_id = rc(users).id
            )
            db.session.add(book)
            books.append(book)

        reviews = []

        for _ in range(15):
            review = Review(
                review = fake.paragraph(nb_sentences=10),
                rating = random.randint(1,10),
                user_id = rc(users).id,
                book_id = rc(books).id
            )
            db.session.add(review)
            reviews.append(review)
        
        db.session.commit()
