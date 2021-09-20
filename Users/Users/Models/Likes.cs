using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models
{
    public class Likes : BaseEntity
    {
        [Key]
        public int ID { get; set; }

        public int userID { get; set; }
        public int postID { get; set; }
        public User User { get; set; }
    }
}
