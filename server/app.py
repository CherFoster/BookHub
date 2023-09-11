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

        new_user = User(username=json_data['username'])
        new_user.password_hash = json_data['password']
        db.session.add(new_user)
        db.session.commit()
        
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
            book_list = [book.to_dict() for book in user.books]
            response = make_response(book_list, 200)
            return response
        else:
            return {"error": "Please log in"}, 401
    
    def post(self):
        if session.get('user_id'):
            json_data = request.get_json()
            title = json_data.get('title')
            author = json_data.get('author')
            image = json_data.get('image')
            description = json_data.get('description')
            status = json_data.get('status')
            try:
                new_book = Book(
                    title = title,
                    author = author,
                    image = image,
                    description = description,
                    status = status,
                    user_id=session['user_id']               
                )
            except ValueError as e:
                abort(422,e.args[0])

            db.session.add(new_book)
            db.session.commit()
            response = make_response(new_book.to_dict(), 201)
            return response
api.add_resource(Books, '/books')
















if __name__ == '__main__':
    app.run(port=5555, debug=True)

