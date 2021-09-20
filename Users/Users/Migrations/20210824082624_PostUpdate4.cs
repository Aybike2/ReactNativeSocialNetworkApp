using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Users.Migrations
{
    public partial class PostUpdate4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(name: "CreatedAt",
            table: "Posts",
            schema: "dbo",
            defaultValueSql: "GETDATE()", nullable: false);

            migrationBuilder.DropIndex(
                name: "IX_Posts_userID",
                table: "Posts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Posts_userID",
                table: "Posts",
                column: "userID");
        }
    }
}
