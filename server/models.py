from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

assoc_table = db.Table('assoc_table',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews', '-books', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='user')
    books = db.relationship('Book', secondary=assoc_table, back_populates='users')
  
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

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)
    genre = db.Column(db.String)
    description =db.Column(db.String)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    reviews = db.relationship('Review', back_populates='book')
    users = db.relationship('User', secondary=assoc_table, back_populates='books')

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
    user = db.relationship("User", back_populates="reviews")
    book = db.relationship("Book", back_populates="reviews")

    @validates('rating')
    def validate_rating(self, key, rating):
        if not isinstance(rating, int):
            raise AssertionError('Rating must be an integer')
        
        if rating < 1 or rating > 10:
            raise AssertionError('Rating must be between 1 and 10')
        
        return rating

    def __repr__(self):
        return (
            f'Review: {self.review},' \
            + f'Rating: {self.rating}'
        )
