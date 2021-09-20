using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Users.Migrations
{
    public partial class PostUpdate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(name: "CreatedAt",
            table: "Posts",
            schema: "dbo",
            defaultValueSql: "GETDATE()", nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
