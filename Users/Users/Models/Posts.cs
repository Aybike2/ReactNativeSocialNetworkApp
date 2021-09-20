using System;
using System.ComponentModel.DataAnnotations;
namespace Users.Models
{
    public class Posts : BaseEntity
    {
        [Key]
        public int ID { get; set; }

        public int userID { get; set; }
        public string Description { get; set; }
        //public Likes Likes { get; set; }
        public DateTime? CreatedAt { get; set; }

        //public User User { get; set; }

    }
}
