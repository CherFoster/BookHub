"""changed genre_tags table to book_tags

Revision ID: 63dd683495e5
Revises: e3cc7e40a54f
Create Date: 2023-09-25 09:33:07.778677

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63dd683495e5'
down_revision = 'e3cc7e40a54f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookk_tags',
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('tag_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_bookk_tags_book_id_books')),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], name=op.f('fk_bookk_tags_tag_id_tags'))
    )
    op.drop_table('genre_tag')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genre_tag',
    sa.Column('book_id', sa.INTEGER(), nullable=True),
    sa.Column('tag_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name='fk_genre_tag_book_id_books'),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], name='fk_genre_tag_tag_id_tags')
    )
    op.drop_table('bookk_tags')
    # ### end Alembic commands ###