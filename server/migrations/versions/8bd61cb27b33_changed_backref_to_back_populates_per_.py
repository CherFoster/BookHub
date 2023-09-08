"""changed backref to back_populates per error

Revision ID: 8bd61cb27b33
Revises: 952127b27da1
Create Date: 2023-09-07 17:02:38.096490

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8bd61cb27b33'
down_revision = '952127b27da1'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
