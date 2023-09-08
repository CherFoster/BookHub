#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from config import db
from models import User, Tag, Book, Review, genre_tag
import random

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Tag.query.delete()
        Book.query.delete()
        Review.query.delete()
        
        users = []
        usernames = []

        for i in range(20):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username
            )
            user.password_hash = user.username + 'password'
            users.append(user)

            db.session.add_all(users)
        db.session.commit()

        print("Creating Book List...")
        books = []
        read_status = [
            "Read",
            "Want to read"
        ]
        genres = [
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
        tags = []

        for _ in range(50):
            tag = Tag(genre=random.choice(genres)) 
            tags.append(tag)
            
            db.session.add_all(tags)
        db.session.commit()

        for _ in range(60):
            book = Book(
                title = fake.catch_phrase(),
                author = fake.name(),
                description = fake.paragraph(nb_sentences=10),
                status = random.choice(read_status),
            )
            book.tags = random.sample(tags, k=random.randint(1,3))

            book.user = rc(users)
            books.append(book)

            db.session.add_all(books)
        db.session.commit()

        reviews = []
        for _ in range(100):
            review = Review(
                review = fake.paragraph(nb_sentences=10),
                rating = random.randint(1,10),
                user_id = rc(users).id,
                book_id = rc(books).id
            )
            reviews.append(review)

            db.session.add_all(reviews)
        
        db.session.commit()
        print("Complete.")



       # book.tags = [Tag(genre=random.choice(genres)) for _ in range(random.randint(1, 3))]