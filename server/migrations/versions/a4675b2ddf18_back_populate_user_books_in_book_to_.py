"""back populate user_books in Book to equal user_books and not users

Revision ID: a4675b2ddf18
Revises: 2ac8c63f2d1c
Create Date: 2023-09-07 17:28:01.711251

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a4675b2ddf18'
down_revision = '2ac8c63f2d1c'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
