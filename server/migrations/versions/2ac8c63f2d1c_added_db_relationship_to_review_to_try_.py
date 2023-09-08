"""added db relationship to Review to try to fix error

Revision ID: 2ac8c63f2d1c
Revises: 31534a842697
Create Date: 2023-09-07 17:19:09.397457

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ac8c63f2d1c'
down_revision = '31534a842697'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
