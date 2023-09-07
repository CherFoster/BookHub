#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from config import db
from models import User, Book, Review
from werkzeug.security import generate_password_hash

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
                password_hash=hashed_password
            )
            db.session.add(user)
            users.append(user)
        db.session.commit()

