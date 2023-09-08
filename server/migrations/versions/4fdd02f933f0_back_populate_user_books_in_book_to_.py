"""back populate user_books in Book to equal user_books and not users

Revision ID: 4fdd02f933f0
Revises: a4675b2ddf18
Create Date: 2023-09-07 17:33:27.090490

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4fdd02f933f0'
down_revision = 'a4675b2ddf18'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
