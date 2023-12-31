#!/usr/bin/env python3
from flask import request, make_response, session, jsonify, abort
from flask_restful import Resource
from config import app, db, api
from models import User, Tag, Book, Review
from flask_restful import Resource
from werkzeug.exceptions import NotFound, Unauthorized
from sqlalchemy.exc import IntegrityError

@app.route('/')
def index():
    return '<h1>Welcome to BookHub</h1>'

class Signup(Resource):
    def post(self):
        json_data = request.get_json()

        username = json_data.get('username')
        password = json_data.get('password')

        if username and password:
            new_user = User(
                username=username,
            )
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
        
            response = make_response(new_user.to_dict(), 201)
            return response
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get('username')
        password = json_data.get('password')
        user = User.query.filter(User.username == username).first()
        
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                response = make_response(user.to_dict(), 200)
                return response
            print(f"Username: {username}, Password: {password}")
        return {'Incorrect username or password'}, 401
api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(user.to_dict(), 200)
            return response
        except:
            abort(401, "Please log in")
api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response
api.add_resource(Logout, '/logout')

class Books(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter_by(id=session['user_id']).first()
            status = request.args.get('q')

            # Check if the status is provided in the URL
            if status:
                book_status = [book for book in user.books if book.status == status]
                book_list = [book.to_dict() for book in book_status]
            else:
                # if status not provided, return all books
                book_list = [book.to_dict() for book in user.books]
            
            response = make_response(book_list, 200)
            return response
        else:
            return {"error": "Unauthorized, please log in"}, 401

    def post(self):
        if session.get('user_id'):
            json_data = request.get_json()
            title = json_data.get('title')
            author = json_data.get('author')
            image = json_data.get('image')
            description = json_data.get('description')
            status = json_data.get('status')
            genre = json_data.get('genre')
            
            try:
                new_book = Book(
                    title=title,
                    author=author,
                    image=image,
                    description=description,
                    status=status,
                    user_id=session['user_id']
                )
                tag = Tag.query.filter_by(genre=genre).first()
                if not tag:
                    tag = Tag(genre=genre)
                    db.session.add(tag)

                # Associate the book with the tag
                tag.books.append(new_book)

            except ValueError as e:
                abort(422, e.args[0])

            db.session.add(new_book)
            db.session.commit()
            response = make_response(new_book.to_dict(), 201)
            return response
api.add_resource(Books, '/books', '/books/<string:status>')

class BookId(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            raise NotFound
        response = make_response(book.to_dict(), 200)
        return response
    
    def patch(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            raise NotFound
        
        json_data = request.get_json()

        if 'status' in json_data:
            book.status = json_data['status']
        
        db.session.add(book)
        db.session.commit()
        response = make_response(book.to_dict(), 200)
        return response
    
    def delete(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            raise NotFound
        
        # delete reviews associated with the book id
        reviews = Review.query.filter_by(book_id=id).all()
        for review in reviews:
            db.session.delete(review)

        db.session.delete(book)
        db.session.commit()
        response = make_response("Deleted", 204)
        return response
api.add_resource(BookId,'/books/<int:id>')

class Reviews(Resource):
    def get(self, book_id):
        book = Book.query.filter_by(id=book_id).first()
        if not book:
            raise NotFound
        
        reviews = Review.query.filter_by(book_id=book_id).all()
        review_list = [review.to_dict() for review in reviews]
        response = make_response(review_list, 200)
        return response
    
    def post(self, book_id):
        if not session.get('user_id'):
            return {'error': 'Unauthorized, please log in'}, 401

        json_data = request.get_json()
        user_id = session['user_id']

        book = Book.query.filter_by(id=book_id).first()
        if not book:
            raise NotFound

        review_text = json_data.get('review')
        rating = json_data.get('rating')
        new_review = Review(
            review=review_text,
            rating=rating,
            user_id=user_id,
            book_id=book_id
        )
        db.session.add(new_review)
        db.session.commit()

        response = make_response(new_review.to_dict(), 201)
        return response
api.add_resource(Reviews, '/books/<int:book_id>/reviews')

class BookTags(Resource):
    def get(self, tag=None):
        if tag:
            if not session.get('user_id'):
                return {"error": "Unauthorized, please log in"}, 401

            user_id = session['user_id']

            # Filter books by tag and the user who uploaded them
            books = (
                Book.query.join(Book.tags).filter(Tag.genre == tag, Book.user_id == user_id).all())

            book_list = [book.to_dict() for book in books]
            response = make_response(book_list, 200)
            return response
        else:
            # Handle request to get all genres 
            genres = [tag.genre for tag in Tag.query.all()]
            return make_response(genres, 200)
api.add_resource(BookTags, '/tag', '/tag/<string:tag>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

