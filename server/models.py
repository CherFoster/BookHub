from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

genre_tag = db.Table('genre_tag',
    db.Column('book_id', db.Integer, db.ForeignKey('books.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-books.user', '-_password_hash', '-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    books = db.relationship('Book', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')
  
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
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Tag(db.Model, SerializerMixin):
    __tablename__ ='tags'

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String)

    books = db.relationship('Book', secondary=genre_tag, back_populates='tags')

    def __repr__(self):
        return f'<Tag {self.genre}>'
    
class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    serialize_rules = ('-user', '-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)
    image = db.Column(db.String)
    description =db.Column(db.String)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    reviews = db.relationship('Review', back_populates='book', cascade='all, delete-orphan')
    user = db.relationship('User', back_populates='books')
    
    tags = db.relationship('Tag', secondary=genre_tag, back_populates='books')

    def __repr__(self):
        return (
            f'Title: {self.title}, ' \
            + f'Author: {self.author}, ' \
            + f'Image: {self.image}', \
            + f'Author: {self.author}, ' \
            + f'Description: {self.description}, ' \
            + f'Status: {self.status} ' \
        )
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-book.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
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
        return f'<Review of book {self.book_id} by user {self.user_id}>'

