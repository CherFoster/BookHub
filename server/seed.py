#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from config import db
from models import User, Tag, Book, Review, genre_tag
from werkzeug.security import generate_password_hash
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

    for _ in range(60):
        book = Book(
            title = fake.book(),
            author = fake.name(),
            description = fake.paragraph(nb_sentences=10),
            status = random.choice(read_status),
            # user_id = rc(users).id
        )
        book.tags = [Tag(genre=random.choice(genres)) for _ in range(random.randint(1, 3))]
        book.user = rc(users)
        books.append(book)

    db.session.add_all(books)

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

    # tags = []
    
    # for _ in range(60):
    #     tag = Tag(
    #         genre = random.choice(genres)
    #     )

    # tag1 = Tag(genre='Fiction')
    # tag2 = Tag(genre='Non-Fiction')
    # tag3 = Tag(genre='Mystery')
    # tag4 = Tag(genre='Self Help')
    
    db.session.commit()
    print("Complete.")

    