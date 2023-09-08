"""changed user relationship in Book to user_books

Revision ID: 5e512fe141bb
Revises: 8bd61cb27b33
Create Date: 2023-09-07 17:05:57.955132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e512fe141bb'
down_revision = '8bd61cb27b33'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
