"""took genre out of Book and added it to Tag

Revision ID: 01bbd713dd61
Revises: 5ac7babf0a64
Create Date: 2023-09-08 10:00:28.835371

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01bbd713dd61'
down_revision = '5ac7babf0a64'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
