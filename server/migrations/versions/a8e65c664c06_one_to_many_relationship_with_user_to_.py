"""one to many relationship with user to review, and books to review created

Revision ID: a8e65c664c06
Revises: 66fb29d29986
Create Date: 2023-09-06 17:26:41.975740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a8e65c664c06'
down_revision = '66fb29d29986'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
