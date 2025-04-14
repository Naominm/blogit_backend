-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "blog_title" TEXT NOT NULL,
    "blog_excerpt" TEXT NOT NULL,
    "blog_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
