from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

user_books = db.Table('user_books',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-books.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    reviews = db.relatonship('Review', backref='user')
    books = db.relationship('Book', secondary= user_books, backref='users')
  
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    # Takes password, hashes it, and stores the hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    # compares hashed password to the stored hash  
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'{self.username}'

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)
    genre = db.Column(db.String)
    description =db.Column(db.String)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reviews = db.relatonship('Review', backref='book')
    user = db.relationship('User', secondary=user_books, backref='books')

    def __repr__(self):
        return (
            f'Title: {self.title}, ' \
            + f'Author: {self.author}, ' \
            + f'Genre: {self.genre}, ' \
            + f'Author: {self.author}, ' \
            + f'Description: {self.description}, ' \
            + f'Status: {self.status}, ' \
        )
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    def __repr__(self):
        return (
            f'Review: {self.review},' \
            + f'Rating: {self.rating}'
        )
